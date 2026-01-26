// Phase 6: Graduate Insights Edge Function
// Analyzes questions from students who completed the tutorial
// Fulfills INTEL-08

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.32.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

    const weekStart = getWeekStart();

    // Get graduate questions from this week
    const { data: graduateQuestions, error: fetchError } = await supabase
      .from('questions')
      .select('question, category, context')
      .eq('is_graduate', true)
      .gte('asked_at', weekStart.toISOString())

    if (fetchError) throw fetchError;

    // Get total graduate count
    const { count: totalGraduates } = await supabase
      .from('graduate_status')
      .select('*', { count: 'exact', head: true })
      .not('completed_at', 'is', null)

    if (!graduateQuestions || graduateQuestions.length === 0) {
      // Still update with graduate count even if no questions
      await supabase
        .from('graduate_insights')
        .upsert({
          week_starting: weekStart.toISOString().split('T')[0],
          total_graduates: totalGraduates || 0,
          graduate_questions: 0,
          updated_at: new Date().toISOString()
        }, { onConflict: 'week_starting' })

      return new Response(
        JSON.stringify({
          message: 'No graduate questions this week',
          total_graduates: totalGraduates
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Compute top topics from graduate questions
    const topicCounts = new Map<string, number>();
    for (const q of graduateQuestions) {
      const cat = q.category || 'other';
      topicCounts.set(cat, (topicCounts.get(cat) || 0) + 1);
    }
    const topGraduateTopics = Object.fromEntries(
      Array.from(topicCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    );

    // Get common struggles (questions that appear multiple times)
    const questionCounts = new Map<string, number>();
    for (const q of graduateQuestions) {
      const normalized = q.question.toLowerCase().substring(0, 100);
      questionCounts.set(normalized, (questionCounts.get(normalized) || 0) + 1);
    }
    const commonStruggles = Array.from(questionCounts.entries())
      .filter(([_, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([question, count]) => ({ question, count }));

    // Use Claude to identify skill gaps (topics not covered by tutorial)
    let skillGaps = {};
    if (graduateQuestions.length >= 10) {
      const response = await anthropic.messages.create({
        model: 'claude-haiku-4.5',
        max_tokens: 500,
        system: `You are analyzing questions from Claude Code 101 graduates - students who completed the tutorial and are now working on real projects.

The tutorial covers: terminal basics, npm, Claude Code installation, models, prompting, plan mode, JSON, file management.

Identify topics that graduates are asking about that the tutorial DOESN'T cover. These are skill gaps.

Return JSON: { "skill_gaps": [ { "topic": "...", "evidence": "...", "priority": "high/medium/low" } ] }`,
        messages: [{
          role: 'user',
          content: `Graduate questions (${graduateQuestions.length} total):
${graduateQuestions.slice(0, 20).map(q => `- "${q.question}"`).join('\n')}

What skill gaps do these reveal?`
        }]
      });

      try {
        const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
        const parsed = JSON.parse(responseText);
        skillGaps = parsed.skill_gaps || [];
      } catch (parseError) {
        console.warn('Failed to parse skill gaps:', parseError);
      }
    }

    // Upsert insights
    const { error: upsertError } = await supabase
      .from('graduate_insights')
      .upsert({
        week_starting: weekStart.toISOString().split('T')[0],
        total_graduates: totalGraduates || 0,
        graduate_questions: graduateQuestions.length,
        top_graduate_topics: topGraduateTopics,
        common_struggles: commonStruggles,
        skill_gaps: skillGaps,
        updated_at: new Date().toISOString()
      }, { onConflict: 'week_starting' })

    if (upsertError) throw upsertError;

    return new Response(
      JSON.stringify({
        message: 'Graduate insights updated',
        total_graduates: totalGraduates,
        graduate_questions: graduateQuestions.length,
        top_topics: topGraduateTopics,
        skill_gaps: skillGaps
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Graduate insights error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function getWeekStart(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

// Run weekly via pg_cron:
// SELECT cron.schedule(
//   'graduate-insights-weekly',
//   '0 4 * * 1',  -- Monday 4 AM UTC
//   $$SELECT net.http_post(
//     url := 'https://YOUR_PROJECT.supabase.co/functions/v1/graduate-insights',
//     headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
//   )$$
// );
