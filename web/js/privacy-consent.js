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
   * Deletes all local and cloud data
   * @returns {Promise<Object>} - deletion result with status
   */
  async deleteMyData() {
    // Clear local consent
    this.consentGiven = false;
    this.saveConsent(false);

    // Clear local question log
    localStorage.removeItem('questions_log');

    // Delete from Supabase if available
    if (window.questionSync) {
      const result = await window.questionSync.deleteMyData();
      return result;
    }

    return { deleted: true, local_only: true };
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

  /**
   * Show privacy settings dialog with sync stats and controls
   */
  async showPrivacySettings() {
    const stats = window.questionSync ? await window.questionSync.getSyncStats() : { synced: 0, pending: 0, lastSync: null };

    const dialog = document.createElement('div');
    dialog.className = 'consent-dialog-overlay';
    dialog.innerHTML = `
      <div class="consent-dialog">
        <h2>Privacy Settings</h2>

        <div class="privacy-status">
          <p><strong>Cloud Sync:</strong> ${this.consentGiven ? 'Enabled' : 'Disabled'}</p>
          <p><strong>Questions synced:</strong> ${stats.synced || 0}</p>
          <p><strong>Last sync:</strong> ${stats.lastSync ? new Date(stats.lastSync).toLocaleDateString() : 'Never'}</p>
        </div>

        <div class="privacy-actions">
          ${this.consentGiven ?
            '<button class="privacy-opt-out">Opt Out (Stop Sharing)</button>' :
            '<button class="privacy-opt-in">Opt In (Start Sharing)</button>'
          }
          <button class="privacy-delete">Delete All My Data</button>
          <button class="privacy-close">Close</button>
        </div>
      </div>
    `;

    const optOutBtn = dialog.querySelector('.privacy-opt-out');
    if (optOutBtn) {
      optOutBtn.addEventListener('click', async () => {
        this.revokeConsent();
        dialog.remove();
        alert('Cloud sync disabled. Your questions will only be logged locally.');
      });
    }

    const optInBtn = dialog.querySelector('.privacy-opt-in');
    if (optInBtn) {
      optInBtn.addEventListener('click', async () => {
        dialog.remove();
        await this.showConsentDialog();
      });
    }

    dialog.querySelector('.privacy-delete').addEventListener('click', async () => {
      if (confirm('Delete all your synced questions? This cannot be undone.')) {
        const result = await this.deleteMyData();
        dialog.remove();
        alert(result.deleted ? 'All your data has been deleted.' : `Deletion failed: ${result.reason}`);
      }
    });

    dialog.querySelector('.privacy-close').addEventListener('click', () => {
      dialog.remove();
    });

    document.body.appendChild(dialog);
  }
}

// Export for use in other modules
window.PrivacyConsentManager = PrivacyConsentManager;
window.privacyConsent = new PrivacyConsentManager();
