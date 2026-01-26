// Phase 6: Analytics Dashboard
// Source: 06-RESEARCH.md Example 4

class AnalyticsDashboard {
  constructor() {
    this.supabase = null;
    this.channel = null;
    this.init();
  }

  async init() {
    // Initialize Supabase
    const config = this.getConfig();
    if (!config.url || !config.anonKey) {
      this.showError('Supabase not configured');
      return;
    }

    this.supabase = supabase.createClient(config.url, config.anonKey);

    // Load initial data
    await this.loadData();

    // Subscribe to real-time updates
    this.subscribeToUpdates();
  }

  getConfig() {
    if (window.SUPABASE_CONFIG) return window.SUPABASE_CONFIG;
    return {
      url: localStorage.getItem('supabase_url'),
      anonKey: localStorage.getItem('supabase_anon_key')
    };
  }

  async loadData() {
    try {
      // Get current week's aggregate
      const weekStart = this.getWeekStart();
      const { data, error } = await this.supabase
        .from('question_aggregates')
        .select('*')
        .eq('week_starting', weekStart)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
        throw error;
      }

      if (data) {
        this.updateDashboard(data);
      } else {
        this.showNoData();
      }

    } catch (err) {
      console.error('Load error:', err);
      this.showError(err.message);
    }
  }

  subscribeToUpdates() {
    this.channel = this.supabase
      .channel('dashboard-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'question_aggregates'
      }, (payload) => {
        console.log('Real-time update:', payload);
        if (payload.new) {
          this.updateDashboard(payload.new);
        }
      })
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });
  }

  updateDashboard(data) {
    // Update timestamp
    document.getElementById('last-updated').textContent =
      new Date(data.updated_at).toLocaleString();

    // Update top questions
    this.renderTopQuestions(data.top_10_questions || []);

    // Update module confusion
    this.renderModuleConfusion(data.module_confusion || {});

    // Update tech trends
    this.renderTechTrends(data.technology_trends || {});

    // Update stats
    document.getElementById('total-questions').textContent = data.total_questions || 0;
    document.getElementById('total-students').textContent = data.total_students || 0;
    document.getElementById('graduate-questions').textContent = data.graduate_questions || 0;

    // Update severity
    this.renderSeverity(data.severity_breakdown || {});
  }

  renderTopQuestions(questions) {
    const container = document.getElementById('top-questions');
    if (!questions.length) {
      container.innerHTML = '<li class="no-data">No questions this week</li>';
      return;
    }

    container.innerHTML = questions.map((q, i) => `
      <li>
        <span class="question-text">"${this.escapeHtml(q.question)}"</span>
        <span class="question-count">${q.count} student${q.count > 1 ? 's' : ''}</span>
      </li>
    `).join('');
  }

  renderModuleConfusion(confusion) {
    const container = document.getElementById('module-confusion');
    const entries = Object.entries(confusion).sort((a, b) => b[1] - a[1]);

    if (!entries.length) {
      container.innerHTML = '<div class="no-data">No data yet</div>';
      return;
    }

    const max = Math.max(...entries.map(e => e[1]));
    container.innerHTML = entries.map(([module, count]) => {
      const pct = (count / max) * 100;
      const moduleNum = module.replace('module_', '');
      return `
        <div class="heatmap-row">
          <span class="module-label">Module ${moduleNum}</span>
          <div class="heatmap-bar" style="width: ${pct}%"></div>
          <span class="heatmap-count">${count}</span>
        </div>
      `;
    }).join('');
  }

  renderTechTrends(trends) {
    const container = document.getElementById('tech-trends');
    const entries = Object.entries(trends).sort((a, b) => b[1] - a[1]).slice(0, 8);

    if (!entries.length) {
      container.innerHTML = '<div class="no-data">No tech mentions yet</div>';
      return;
    }

    container.innerHTML = entries.map(([tech, count]) => `
      <div class="trend-tag">
        <span class="tech-name">${tech}</span>
        <span class="tech-count">${count}</span>
      </div>
    `).join('');
  }

  renderSeverity(severity) {
    const container = document.getElementById('severity-breakdown');
    const total = Object.values(severity).reduce((a, b) => a + b, 0) || 1;

    const levels = [
      { key: 'minor_confusion', label: 'Minor', color: '#4ade80' },
      { key: 'moderate_gap', label: 'Moderate', color: '#fbbf24' },
      { key: 'critical_blocker', label: 'Critical', color: '#f87171' },
    ];

    container.innerHTML = levels.map(({ key, label, color }) => {
      const count = severity[key] || 0;
      const pct = (count / total) * 100;
      return `
        <div class="severity-row">
          <span class="severity-label">${label}</span>
          <div class="severity-bar-container">
            <div class="severity-bar" style="width: ${pct}%; background: ${color}"></div>
          </div>
          <span class="severity-count">${count}</span>
        </div>
      `;
    }).join('');
  }

  showNoData() {
    document.getElementById('top-questions').innerHTML =
      '<li class="no-data">No questions logged yet</li>';
  }

  showError(message) {
    document.querySelector('.dashboard-grid').innerHTML = `
      <div class="error-card">
        <h2>Configuration Required</h2>
        <p>${message}</p>
        <p>Set SUPABASE_URL and SUPABASE_ANON_KEY to enable dashboard.</p>
      </div>
    `;
  }

  getWeekStart() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(now.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);
    return weekStart.toISOString().split('T')[0];
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize on load
window.dashboard = new AnalyticsDashboard();
