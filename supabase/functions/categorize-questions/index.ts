// Phase 6: Nightly Question Categorization Edge Function
// Source: 06-RESEARCH.md Example 2
// Cost: ~$0.001 per 100 questions with Haiku + prompt caching

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.32.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize clients with service role (bypass RLS)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY')!
    })

    // Fetch uncategorized questions (max 100 per run)
    const { data: questions, error: fetchError } = await supabase
      .from('questions')
      .select('id, question, context')
      .is('category', null)
      .limit(100)

    if (fetchError) {
      throw new Error(`Fetch error: ${fetchError.message}`)
    }

    if (!questions || questions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No questions to categorize', categorized: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Batch categorize with Claude Haiku (cheapest model)
    // System prompt is cacheable (90% discount on repeated calls)
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4.5',
      max_tokens: 2048,
      system: `You are a curriculum analyst for Claude Code 101, a coding tutorial. Categorize each student question by:

1. topic: One of [paths, git, npm, terminal, prompting, models, files, json, permissions, errors, other]
2. severity: One of [minor_confusion, moderate_gap, critical_blocker]
   - minor_confusion: Quick clarification needed (syntax, naming)
   - moderate_gap: Concept not fully understood (needs explanation)
   - critical_blocker: Student stuck, can't proceed (fundamental misunderstanding)
3. type: One of [conceptual, procedural, troubleshooting]
   - conceptual: "What is X?" or "Why does X?"
   - procedural: "How do I X?" or "What's the command for X?"
   - troubleshooting: "X isn't working" or "I got error Y"
4. technologies: Array of technology/framework/tool keywords mentioned in the question.
   Common technologies to detect: react, nextjs, vue, angular, svelte, typescript, javascript,
   python, node, express, prisma, tailwind, css, html, git, github, vercel, supabase, mongodb,
   postgresql, docker, aws, firebase
   Return empty array [] if no technologies mentioned.

Return a JSON array with same length and order as input.
Each item: { "topic": "...", "severity": "...", "type": "...", "technologies": [...] }
ONLY return the JSON array, no other text.`,
      messages: [{
        role: 'user',
        content: JSON.stringify(questions.map(q => ({
          question: q.question,
          context: q.context
        })))
      }]
    })

    // Parse Claude's response
    const responseText = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    let categories: Array<{ topic: string; severity: string; type: string; technologies: string[] }>
    try {
      categories = JSON.parse(responseText)
    } catch (parseError) {
      throw new Error(`Failed to parse Claude response: ${responseText.substring(0, 200)}`)
    }

    // Validate response length matches input
    if (categories.length !== questions.length) {
      throw new Error(`Response length mismatch: got ${categories.length}, expected ${questions.length}`)
    }

    // Update database with categories
    let successCount = 0
    for (let i = 0; i < questions.length; i++) {
      const { error: updateError } = await supabase
        .from('questions')
        .update({
          category: categories[i].topic,
          severity: categories[i].severity,
          type: categories[i].type,
          technologies: categories[i].technologies || []
        })
        .eq('id', questions[i].id)

      if (!updateError) successCount++
    }

    // Trigger weekly aggregation
    await supabase.rpc('aggregate_weekly_questions')

    return new Response(
      JSON.stringify({
        message: 'Categorization complete',
        categorized: successCount,
        total: questions.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Categorization error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

// Schedule this function with pg_cron (run after deployment):
// SELECT cron.schedule(
//   'categorize-questions-nightly',
//   '0 2 * * *',  -- 2 AM UTC daily
//   $$SELECT net.http_post(
//     url := 'https://YOUR_PROJECT.supabase.co/functions/v1/categorize-questions',
//     headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
//   )$$
// );
