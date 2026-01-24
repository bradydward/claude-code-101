/**
 * BackgroundMusicManager - Handles background music playback for web portal
 *
 * Features:
 * - Howler.js integration for cross-browser audio
 * - Autoplay policy handling (muted start + user unlock)
 * - Fade transitions between tracks
 * - Volume control with localStorage persistence
 * - Memory cleanup (prevents leaks from Howl instances)
 */

class BackgroundMusicManager {
  constructor() {
    this.currentTrack = null;        // Current Howl instance
    this.isUnlocked = false;          // Audio context unlocked by user interaction
    this.preferences = this.loadPreferences();
    this.trackLibrary = null;         // Loaded from metadata.json
  }

  /**
   * Initialize music system
   * - Load track metadata from JSON
   * - Check autoplay policy
   * - Prepare default track (muted for autoplay safety)
   */
  async init() {
    try {
      // Load track library from metadata.json
      const response = await fetch('music/background/metadata.json');
      if (response.ok) {
        const data = await response.json();
        this.trackLibrary = data.tracks;
      } else {
        console.warn('Track metadata not found, using fallback');
        this.trackLibrary = {};
      }
    } catch (error) {
      console.error('Failed to load track library:', error);
      this.trackLibrary = {};
    }

    // Check autoplay policy (modern browsers)
    if (navigator.getAutoplayPolicy) {
      const policy = navigator.getAutoplayPolicy('mediaelement');
      if (policy === 'allowed') {
        this.isUnlocked = true;
      }
    }

    // Load default track (muted for autoplay compatibility)
    this.loadTrack(this.preferences.track || 'chill-lofi', true);
  }

  /**
   * Load a music track
   * @param {string} trackId - Track identifier from metadata
   * @param {boolean} startMuted - Start with volume at 0 (for autoplay policy)
   */
  loadTrack(trackId, startMuted = false) {
    // CRITICAL: Cleanup previous track to prevent memory leaks
    if (this.currentTrack) {
      this.currentTrack.unload();
      this.currentTrack = null;
    }

    // Get track info from library
    const trackInfo = this.trackLibrary?.[trackId];
    if (!trackInfo) {
      console.warn(`Track not found: ${trackId}`);
      return;
    }

    // Create new Howl instance
    this.currentTrack = new Howl({
      src: [`music/background/${trackInfo.file}`],
      html5: true,      // Stream large files (don't wait for full download)
      loop: true,       // Background music loops continuously
      volume: startMuted ? 0 : this.preferences.volume,
      onload: () => {
        console.log(`Track loaded: ${trackInfo.title}`);
        // Auto-play if not muted and music enabled
        if (!startMuted && this.preferences.enabled && this.isUnlocked) {
          this.play();
        }
      },
      onloaderror: (id, error) => {
        console.error(`Failed to load track ${trackId}:`, error);
        console.warn('Ensure MP3 files are in web/music/background/');
      }
    });
  }

  /**
   * Unlock audio on first user interaction
   * Required by browser autoplay policies
   */
  unlockAudio() {
    if (this.isUnlocked) return;

    // Play silent sound to unlock Web Audio API context
    // Base64 is empty WAV file (44 bytes)
    const unlockSound = new Howl({
      src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
      volume: 0
    });

    unlockSound.once('end', () => {
      this.isUnlocked = true;
      unlockSound.unload();

      // Now safe to play background music
      if (this.preferences.enabled && this.currentTrack) {
        // Fade in from 0 to preferred volume over 2 seconds
        this.currentTrack.volume(0);
        this.currentTrack.play();
        this.currentTrack.fade(0, this.preferences.volume, 2000);
      }
    });

    unlockSound.play();
  }

  /**
   * Play current track
   */
  play() {
    if (!this.currentTrack) return;
    if (!this.isUnlocked) return;

    if (!this.currentTrack.playing()) {
      this.currentTrack.play();
    }
  }

  /**
   * Pause current track
   */
  pause() {
    if (this.currentTrack) {
      this.currentTrack.pause();
    }
  }

  /**
   * Switch to a different track with crossfade
   * @param {string} trackId - New track to play
   */
  switchTrack(trackId) {
    if (!this.currentTrack) {
      this.loadTrack(trackId);
      return;
    }

    // Fade out current track over 2 seconds
    const currentVolume = this.currentTrack.volume();
    this.currentTrack.fade(currentVolume, 0, 2000);

    // After fade completes, switch tracks
    setTimeout(() => {
      this.loadTrack(trackId);

      // Fade in new track over 2 seconds
      if (this.currentTrack && this.preferences.enabled && this.isUnlocked) {
        this.currentTrack.volume(0);
        this.currentTrack.play();
        this.currentTrack.fade(0, this.preferences.volume, 2000);
      }
    }, 2000);

    // Save new track preference
    this.preferences.track = trackId;
    this.savePreferences();
  }

  /**
   * Set volume level
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setVolume(volume) {
    this.preferences.volume = Math.max(0, Math.min(1, volume));

    if (this.currentTrack) {
      this.currentTrack.volume(this.preferences.volume);
    }

    this.savePreferences();
  }

  /**
   * Toggle music on/off
   */
  toggle() {
    this.preferences.enabled = !this.preferences.enabled;

    if (this.preferences.enabled) {
      this.play();
    } else {
      this.pause();
    }

    this.savePreferences();
  }

  /**
   * Load music preferences from localStorage
   * @returns {Object} Preferences object
   */
  loadPreferences() {
    const defaults = {
      track: 'chill-lofi',
      volume: 0.3,
      enabled: true
    };

    try {
      const saved = localStorage.getItem('music_preferences');
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Failed to load music preferences:', error);
    }

    return defaults;
  }

  /**
   * Save music preferences to localStorage
   */
  savePreferences() {
    try {
      localStorage.setItem('music_preferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save music preferences:', error);
    }
  }

  /**
   * Cleanup - call on page unload to prevent memory leaks
   */
  destroy() {
    if (this.currentTrack) {
      this.currentTrack.unload();
      this.currentTrack = null;
    }
  }
}

// ============================================================================
// MODULE-LEVEL INITIALIZATION
// ============================================================================

// Create global music manager instance
const musicManager = new BackgroundMusicManager();

// Make it globally accessible for debugging and UI controls
if (typeof window !== 'undefined') {
  window.musicManager = musicManager;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  musicManager.init();
});

// Unlock audio on first user interaction (click, keypress, or touch)
['click', 'keydown', 'touchstart'].forEach(eventType => {
  document.addEventListener(eventType, () => {
    musicManager.unlockAudio();
  }, { once: true });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  musicManager.destroy();
});
