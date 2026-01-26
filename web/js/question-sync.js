// Phase 6: Question Sync Manager
// Source: 06-RESEARCH.md Example 3 (Privacy-First Question Sync)

class QuestionSyncManager {
  constructor() {
    this.supabase = null;
    this.syncQueue = [];
    this.isSyncing = false;
  }

  // Initialize Supabase client (lazy load)
  async initSupabase() {
    if (this.supabase) return this.supabase;

    // Load Supabase from CDN if not already loaded
    if (!window.supabase) {
      await this.loadSupabaseScript();
    }

    const config = this.getConfig();
    if (!config.url || !config.anonKey) {
      console.warn('Supabase not configured - sync disabled');
      return null;
    }

    this.supabase = window.supabase.createClient(config.url, config.anonKey);
    return this.supabase;
  }

  // Load Supabase JS from CDN
  loadSupabaseScript() {
    return new Promise((resolve, reject) => {
      if (window.supabase) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Get configuration from environment or localStorage
  getConfig() {
    // Check for config in window (set by server-side rendering)
    if (window.SUPABASE_CONFIG) {
      return window.SUPABASE_CONFIG;
    }
    // Fallback to localStorage (set during setup)
    return {
      url: localStorage.getItem('supabase_url'),
      anonKey: localStorage.getItem('supabase_anon_key')
    };
  }

  // Ensure anonymous auth session exists
  async ensureSession() {
    const supabase = await this.initSupabase();
    if (!supabase) return null;

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Sign in anonymously (research Pattern 2)
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.warn('Anonymous auth failed:', error.message);
        return null;
      }
      return data.session;
    }

    return session;
  }

  // Sync a question to Supabase (privacy-first)
  async syncQuestion(questionLog) {
    // Check consent FIRST (GDPR requirement)
    if (!window.privacyConsent?.hasConsent()) {
      // Log locally only, no cloud sync
      this.saveToLocalLog(questionLog);
      return { synced: false, reason: 'no_consent' };
    }

    try {
      const supabase = await this.initSupabase();
      if (!supabase) {
        this.saveToLocalLog(questionLog);
        return { synced: false, reason: 'supabase_not_configured' };
      }

      const session = await this.ensureSession();
      if (!session) {
        this.saveToLocalLog(questionLog);
        return { synced: false, reason: 'auth_failed' };
      }

      // Anonymize data (research Pattern 3)
      const anonymized = this.anonymize(questionLog);

      // Insert to Supabase (async, non-blocking)
      const { error } = await supabase
        .from('questions')
        .insert({
          question: anonymized.question,
          asked_at: anonymized.asked_at,
          context: anonymized.context,
          user_id: session.user.id,
          is_graduate: anonymized.is_graduate || false
        });

      if (error) {
        console.warn('Question sync failed (non-critical):', error.message);
        this.saveToLocalLog(questionLog);
        return { synced: false, reason: error.message };
      }

      // Mark as synced in local log
      this.markSynced(questionLog);
      return { synced: true };

    } catch (err) {
      // Fail silently - never disrupt teaching flow
      console.warn('Sync error (non-critical):', err);
      this.saveToLocalLog(questionLog);
      return { synced: false, reason: err.message };
    }
  }

  // Anonymize question data (GDPR compliance)
  anonymize(log) {
    // Round timestamp to hour (research Pitfall 2)
    const askedAt = new Date(log.asked_at);
    askedAt.setMinutes(0, 0, 0);

    // Strip potentially identifying info from context
    const anonymizedContext = {
      module: log.context?.module,
      lesson: log.context?.lesson,
      task: log.context?.task,
      topic_tags: log.context?.topic_tags || []
      // EXCLUDED: working_directory, student_level, previous_command, error_occurred
    };

    return {
      question: log.question,
      asked_at: askedAt.toISOString(),
      context: anonymizedContext,
      is_graduate: log.context?.is_graduate || false
    };
  }

  // Save to local log (fallback when sync fails or no consent)
  saveToLocalLog(log) {
    try {
      const existing = JSON.parse(localStorage.getItem('questions_log') || '{"questions":[]}');
      existing.questions.push({
        ...log,
        synced_to_cloud: false,
        saved_at: new Date().toISOString()
      });
      localStorage.setItem('questions_log', JSON.stringify(existing));
    } catch (err) {
      console.warn('Local log save failed:', err);
    }
  }

  // Mark question as synced in local log
  markSynced(log) {
    try {
      const existing = JSON.parse(localStorage.getItem('questions_log') || '{"questions":[]}');
      const found = existing.questions.find(q =>
        q.question === log.question &&
        q.asked_at === log.asked_at
      );
      if (found) {
        found.synced_to_cloud = true;
      }
      localStorage.setItem('questions_log', JSON.stringify(existing));
    } catch (err) {
      console.warn('Mark synced failed:', err);
    }
  }

  // GDPR: Delete all user's data from cloud
  async deleteMyData() {
    try {
      const supabase = await this.initSupabase();
      if (!supabase) return { deleted: false, reason: 'supabase_not_configured' };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { deleted: false, reason: 'not_authenticated' };

      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        return { deleted: false, reason: error.message };
      }

      // Clear local log too
      localStorage.removeItem('questions_log');

      return { deleted: true, count: 'all' };

    } catch (err) {
      return { deleted: false, reason: err.message };
    }
  }

  // Get sync statistics for /privacy command
  async getSyncStats() {
    try {
      const localLog = JSON.parse(localStorage.getItem('questions_log') || '{"questions":[]}');
      const localCount = localLog.questions.length;
      const syncedCount = localLog.questions.filter(q => q.synced_to_cloud).length;

      return {
        local: localCount,
        synced: syncedCount,
        pending: localCount - syncedCount,
        lastSync: localLog.questions
          .filter(q => q.synced_to_cloud)
          .map(q => q.saved_at)
          .sort()
          .pop() || null
      };
    } catch {
      return { local: 0, synced: 0, pending: 0, lastSync: null };
    }
  }
}

// Export for use in other modules
window.QuestionSyncManager = QuestionSyncManager;
window.questionSync = new QuestionSyncManager();
