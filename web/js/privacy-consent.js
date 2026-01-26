/**
 * Privacy Consent Manager
 *
 * Handles GDPR/CCPA-compliant consent flow for cloud question sync.
 *
 * Features:
 * - Explicit opt-in before any data leaves device
 * - Consent state persistence in localStorage
 * - Right to be forgotten (data deletion)
 * - Consent revocation
 *
 * Usage:
 *   const consent = new PrivacyConsentManager();
 *   const hasConsent = await consent.requestConsentIfNeeded();
 *   if (hasConsent) {
 *     // Safe to sync questions to cloud
 *   }
 */

class PrivacyConsentManager {
  constructor() {
    this.consentGiven = this.loadConsent();
  }

  /**
   * Load consent state from localStorage
   * @returns {boolean} - true if consent previously given
   */
  loadConsent() {
    return localStorage.getItem('question_sync_consent') === 'true';
  }

  /**
   * Save consent state to localStorage
   * @param {boolean} value - consent state to save
   */
  saveConsent(value) {
    localStorage.setItem('question_sync_consent', String(value));
  }

  /**
   * Show consent dialog and wait for user decision
   * @returns {Promise<boolean>} - resolves to true if accepted, false if declined
   */
  async showConsentDialog() {
    return new Promise((resolve) => {
      // Create modal dialog
      const dialog = document.createElement('div');
      dialog.className = 'consent-dialog-overlay';
      dialog.innerHTML = `
        <div class="consent-dialog">
          <h2>Help Improve the Curriculum?</h2>
          <p>Share anonymous learning questions to help improve Claude Code 101 for future students.</p>
          <ul>
            <li>100% anonymous (no names, emails, or code)</li>
            <li>Questions only (not your answers or files)</li>
            <li>Opt-out anytime with one click</li>
            <li>Delete all your data anytime</li>
          </ul>
          <div class="consent-buttons">
            <button class="consent-accept">Yes, share anonymously</button>
            <button class="consent-decline">No thanks</button>
          </div>
        </div>
      `;

      // Accept button handler
      dialog.querySelector('.consent-accept').onclick = () => {
        this.saveConsent(true);
        this.consentGiven = true;
        dialog.remove();
        resolve(true);
      };

      // Decline button handler
      dialog.querySelector('.consent-decline').onclick = () => {
        this.saveConsent(false);
        this.consentGiven = false;
        dialog.remove();
        resolve(false);
      };

      document.body.appendChild(dialog);
    });
  }

  /**
   * Request consent if not already given
   * @returns {Promise<boolean>} - true if consent given (existing or new), false otherwise
   */
  async requestConsentIfNeeded() {
    if (this.consentGiven) return true;
    return await this.showConsentDialog();
  }

  /**
   * GDPR: Right to be forgotten
   * Deletes all local and cloud data (when cloud is connected)
   * @returns {Promise<boolean>} - true when deletion complete
   */
  async deleteMyData() {
    // Clear local consent
    this.consentGiven = false;
    this.saveConsent(false);

    // Clear local question log
    localStorage.removeItem('questions_log');

    // TODO (Plan 06-03): Supabase deletion
    // When Supabase is connected, this will call:
    // await supabase.from('questions').delete().eq('session_id', sessionId);

    return true;
  }

  /**
   * Revoke consent (stops future syncing)
   */
  revokeConsent() {
    this.consentGiven = false;
    this.saveConsent(false);
  }

  /**
   * Check current consent status
   * @returns {boolean} - true if consent given and active
   */
  hasConsent() {
    return this.consentGiven;
  }
}

// Export for use in other modules
window.PrivacyConsentManager = PrivacyConsentManager;
window.privacyConsent = new PrivacyConsentManager();
