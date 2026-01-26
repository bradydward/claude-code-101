// Phase 6: Aggregate Computation Edge Function
// Computes weekly insights from categorized questions
// Called after categorize-questions or on-demand

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    const weekStart = getWeekStart();

    // Get questions from this week
    const { data: questions, error: fetchError } = await supabase
      .from('questions')
      .select('*')
      .gte('asked_at', weekStart.toISOString())

    if (fetchError) throw fetchError;
    if (!questions || questions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No questions this week', aggregated: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Compute top 10 questions (by similarity grouping)
    const questionCounts = new Map<string, number>();
    for (const q of questions) {
      const normalized = q.question.toLowerCase().trim();
      questionCounts.set(normalized, (questionCounts.get(normalized) || 0) + 1);
    }
    const top10 = Array.from(questionCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([question, count]) => ({ question, count }));

    // Compute module confusion (questions per module)
    const moduleConfusion: Record<string, number> = {};
    for (const q of questions) {
      const module = q.context?.module;
      if (module) {
        const key = `module_${module}`;
        moduleConfusion[key] = (moduleConfusion[key] || 0) + 1;
      }
    }

    // Compute technology trends (extract tech mentions from questions)
    const techKeywords = ['react', 'nextjs', 'next.js', 'vue', 'angular', 'svelte',
      'typescript', 'javascript', 'python', 'node', 'express', 'prisma',
      'tailwind', 'css', 'html', 'git', 'github', 'vercel', 'supabase'];
    const techTrends: Record<string, number> = {};
    for (const q of questions) {
      const text = q.question.toLowerCase();
      for (const tech of techKeywords) {
        if (text.includes(tech)) {
          techTrends[tech] = (techTrends[tech] || 0) + 1;
        }
      }
    }

    // Compute severity breakdown
    const severityBreakdown: Record<string, number> = {
      minor_confusion: 0,
      moderate_gap: 0,
      critical_blocker: 0,
      uncategorized: 0
    };
    for (const q of questions) {
      const severity = q.severity || 'uncategorized';
      severityBreakdown[severity] = (severityBreakdown[severity] || 0) + 1;
    }

    // Count unique users and graduate questions
    const uniqueUsers = new Set(questions.map(q => q.user_id)).size;
    const graduateQuestions = questions.filter(q => q.is_graduate).length;

    // Upsert aggregate
    const { error: upsertError } = await supabase
      .from('question_aggregates')
      .upsert({
        week_starting: weekStart.toISOString().split('T')[0],
        top_10_questions: top10,
        module_confusion: moduleConfusion,
        technology_trends: techTrends,
        severity_breakdown: severityBreakdown,
        total_questions: questions.length,
        total_students: uniqueUsers,
        graduate_questions: graduateQuestions,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'week_starting'
      })

    if (upsertError) throw upsertError;

    return new Response(
      JSON.stringify({
        message: 'Aggregates updated',
        week: weekStart.toISOString().split('T')[0],
        questions: questions.length,
        students: uniqueUsers
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Aggregate error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function getWeekStart(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}
