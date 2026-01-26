// Phase 6: Auto Lesson Suggestion Edge Function
// Detects when 50+ students ask similar questions and suggests new lessons
// Fulfills INTEL-06

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.32.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Threshold for lesson suggestion
const SUGGESTION_THRESHOLD = 50;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY')!
    })

    // Get recent questions grouped by topic
    const { data: questions, error: fetchError } = await supabase
      .from('questions')
      .select('question, category, context')
      .not('category', 'is', null)
      .gte('asked_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days

    if (fetchError) throw fetchError;
    if (!questions || questions.length < SUGGESTION_THRESHOLD) {
      return new Response(
        JSON.stringify({ message: 'Not enough data for suggestions', suggestions: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Group by category and count
    const categoryCounts = new Map<string, { count: number; questions: string[] }>();
    for (const q of questions) {
      const cat = q.category || 'other';
      if (!categoryCounts.has(cat)) {
        categoryCounts.set(cat, { count: 0, questions: [] });
      }
      const entry = categoryCounts.get(cat)!;
      entry.count++;
      if (entry.questions.length < 10) { // Keep sample of 10
        entry.questions.push(q.question);
      }
    }

    // Find categories exceeding threshold
    const hotCategories = Array.from(categoryCounts.entries())
      .filter(([_, data]) => data.count >= SUGGESTION_THRESHOLD)
      .map(([category, data]) => ({ category, ...data }));

    if (hotCategories.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No categories exceed threshold', suggestions: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Use Claude to generate lesson suggestions
    const suggestions = [];
    for (const cat of hotCategories) {
      const response = await anthropic.messages.create({
        model: 'claude-haiku-4.5',
        max_tokens: 500,
        system: `You are a curriculum designer for Claude Code 101, a coding tutorial for beginners.
Given a category of frequently asked questions, suggest a new lesson that would address the common confusion.

Format your response as JSON:
{
  "lesson_title": "Short descriptive title",
  "lesson_summary": "1-2 sentence description of what the lesson covers",
  "target_module": "Which existing module this fits in (1-7) or 'new'",
  "priority": "high/medium/low based on urgency",
  "addresses": "Brief explanation of what confusion this addresses"
}`,
        messages: [{
          role: 'user',
          content: `Category: ${cat.category}
Question count: ${cat.count}

Sample questions:
${cat.questions.map(q => `- "${q}"`).join('\n')}

Suggest a lesson to address these questions.`
        }]
      });

      try {
        const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
        const suggestion = JSON.parse(responseText);
        suggestions.push({
          category: cat.category,
          question_count: cat.count,
          ...suggestion
        });
      } catch (parseError) {
        console.warn('Failed to parse suggestion:', parseError);
      }
    }

    // Store suggestions for review
    if (suggestions.length > 0) {
      const { error: insertError } = await supabase
        .from('lesson_suggestions')
        .insert(suggestions.map(s => ({
          category: s.category,
          question_count: s.question_count,
          lesson_title: s.lesson_title,
          lesson_summary: s.lesson_summary,
          target_module: s.target_module,
          priority: s.priority,
          addresses: s.addresses,
          status: 'pending',
          created_at: new Date().toISOString()
        })));

      if (insertError) {
        console.warn('Failed to store suggestions:', insertError);
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Lesson suggestions generated',
        suggestions: suggestions
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Suggestion error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Run weekly via pg_cron:
// SELECT cron.schedule(
//   'suggest-lessons-weekly',
//   '0 3 * * 1',  -- Monday 3 AM UTC
//   $$SELECT net.http_post(
//     url := 'https://YOUR_PROJECT.supabase.co/functions/v1/suggest-lessons',
//     headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
//   )$$
// );
