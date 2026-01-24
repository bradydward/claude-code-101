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
// UI CONTROLS AND INTERACTIONS
// ============================================================================

/**
 * Initialize music panel expand/collapse toggle
 */
function initMusicPanel() {
  const toggle = document.getElementById('music-panel-toggle');
  const body = document.getElementById('music-panel-body');
  const expandIcon = document.getElementById('music-expand-icon');

  if (!toggle || !body || !expandIcon) return;

  toggle.addEventListener('click', () => {
    body.classList.toggle('expanded');
    expandIcon.textContent = body.classList.contains('expanded') ? '\u25B2' : '\u25BC';
  });
}

/**
 * Wire volume slider to music manager
 */
function initVolumeControl() {
  const slider = document.getElementById('volume-slider');
  const valueDisplay = document.getElementById('volume-value');

  if (!slider || !valueDisplay) return;

  slider.addEventListener('input', (e) => {
    const volume = parseFloat(e.target.value);
    musicManager.setVolume(volume);
    valueDisplay.textContent = Math.round(volume * 100) + '%';
  });
}

/**
 * Wire toggle button to music manager
 */
function initToggleButton() {
  const toggleBtn = document.getElementById('music-toggle-btn');
  const nowPlaying = document.getElementById('music-now-playing');

  if (!toggleBtn || !nowPlaying) return;

  toggleBtn.addEventListener('click', () => {
    musicManager.toggle();

    // Update UI state
    const isEnabled = musicManager.preferences.enabled;
    toggleBtn.textContent = isEnabled ? 'ON' : 'OFF';
    toggleBtn.classList.toggle('off', !isEnabled);

    // Update now-playing text
    updateNowPlaying();
  });
}

/**
 * Render track library from metadata and custom uploads
 */
function renderMusicLibrary() {
  const trackList = document.getElementById('music-track-list');
  if (!trackList) return;

  trackList.innerHTML = ''; // Clear existing

  // Render built-in tracks
  if (musicManager.trackLibrary) {
    Object.keys(musicManager.trackLibrary).forEach(trackId => {
      const track = musicManager.trackLibrary[trackId];
      const card = createTrackCard(trackId, track.title, track.mood);
      trackList.appendChild(card);
    });
  }

  // Render custom tracks from localStorage
  const customTracks = loadCustomTracks();
  Object.keys(customTracks).forEach(trackId => {
    const track = customTracks[trackId];
    const card = createTrackCard(trackId, track.title, track.mood, true);
    trackList.appendChild(card);
  });

  // Mark active track
  updateActiveTrack();
}

/**
 * Create a track card element
 */
function createTrackCard(trackId, title, mood, isCustom = false) {
  const card = document.createElement('div');
  card.className = 'music-track-card';
  card.dataset.trackId = trackId;

  const titleDiv = document.createElement('div');
  titleDiv.className = 'music-track-title';
  titleDiv.textContent = title + (isCustom ? ' (Custom)' : '');

  const moodDiv = document.createElement('div');
  moodDiv.className = 'music-track-mood';
  moodDiv.textContent = mood;

  card.appendChild(titleDiv);
  card.appendChild(moodDiv);

  // Click handler for track switching
  card.addEventListener('click', () => {
    // If custom track, inject into musicManager
    if (isCustom) {
      const customTracks = loadCustomTracks();
      const trackData = customTracks[trackId];
      if (trackData) {
        switchToCustomTrack(trackId, trackData);
      }
    } else {
      musicManager.switchTrack(trackId);
    }

    // Update UI immediately
    updateActiveTrack(trackId);
    updateNowPlaying(trackId);
  });

  return card;
}

/**
 * Switch to a custom uploaded track
 */
function switchToCustomTrack(trackId, trackData) {
  // Cleanup current track
  if (musicManager.currentTrack) {
    musicManager.currentTrack.unload();
    musicManager.currentTrack = null;
  }

  // Create Howl from data URL
  musicManager.currentTrack = new Howl({
    src: [trackData.dataUrl],
    html5: true,
    loop: true,
    volume: musicManager.preferences.volume,
    onload: () => {
      if (musicManager.preferences.enabled && musicManager.isUnlocked) {
        musicManager.currentTrack.play();
      }
    },
    onloaderror: (id, error) => {
      console.error('Failed to load custom track:', error);
    }
  });

  // Save preference
  musicManager.preferences.track = trackId;
  musicManager.savePreferences();
}

/**
 * Update active track card styling
 */
function updateActiveTrack(trackId = null) {
  const currentTrack = trackId || musicManager.preferences.track;
  const cards = document.querySelectorAll('.music-track-card');

  cards.forEach(card => {
    if (card.dataset.trackId === currentTrack) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

/**
 * Update now-playing display
 */
function updateNowPlaying(trackId = null) {
  const nowPlaying = document.getElementById('music-now-playing');
  if (!nowPlaying) return;

  const isEnabled = musicManager.preferences.enabled;
  const currentTrack = trackId || musicManager.preferences.track;

  if (!isEnabled) {
    nowPlaying.textContent = 'Music: Off';
    return;
  }

  // Get track title
  let trackTitle = 'Unknown';

  if (musicManager.trackLibrary && musicManager.trackLibrary[currentTrack]) {
    trackTitle = musicManager.trackLibrary[currentTrack].title;
  } else {
    // Check custom tracks
    const customTracks = loadCustomTracks();
    if (customTracks[currentTrack]) {
      trackTitle = customTracks[currentTrack].title;
    }
  }

  nowPlaying.textContent = `♫ ${trackTitle}`;
}

/**
 * Setup custom MP3 upload handler
 */
function setupCustomUpload() {
  const uploadInput = document.getElementById('custom-music-upload');
  const uploadBtn = document.querySelector('.music-upload-btn');
  const uploadStatus = document.getElementById('music-upload-status');

  if (!uploadInput || !uploadBtn || !uploadStatus) return;

  // Trigger file input on label click (already works via <label for="">)

  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
    if (!validTypes.includes(file.type)) {
      uploadStatus.textContent = 'Error: Only MP3/WAV files allowed';
      uploadStatus.className = 'music-upload-status error';
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      uploadStatus.textContent = 'Error: File too large (max 5MB)';
      uploadStatus.className = 'music-upload-status error';
      return;
    }

    // Read file as data URL
    uploadStatus.textContent = 'Uploading...';
    uploadStatus.className = 'music-upload-status';

    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const filename = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      const trackId = `custom-${Date.now()}`;

      // Save to localStorage
      try {
        const customTracks = loadCustomTracks();
        customTracks[trackId] = {
          title: filename,
          dataUrl: dataUrl,
          mood: 'custom',
          uploadedAt: new Date().toISOString()
        };
        saveCustomTracks(customTracks);

        // Re-render library
        renderMusicLibrary();

        // Success message
        uploadStatus.textContent = `✓ Added "${filename}"`;
        uploadStatus.className = 'music-upload-status success';

        // Clear after 3 seconds
        setTimeout(() => {
          uploadStatus.textContent = '';
          uploadStatus.className = 'music-upload-status';
        }, 3000);

      } catch (error) {
        if (error.name === 'QuotaExceededError') {
          uploadStatus.textContent = 'Error: File too large for browser storage';
        } else {
          uploadStatus.textContent = 'Error: Failed to save file';
        }
        uploadStatus.className = 'music-upload-status error';
      }

      // Clear input so same file can be re-uploaded
      uploadInput.value = '';
    };

    reader.onerror = () => {
      uploadStatus.textContent = 'Error: Failed to read file';
      uploadStatus.className = 'music-upload-status error';
      uploadInput.value = '';
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Load custom tracks from localStorage
 */
function loadCustomTracks() {
  try {
    const saved = localStorage.getItem('custom_tracks');
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn('Failed to load custom tracks:', error);
    return {};
  }
}

/**
 * Save custom tracks to localStorage
 */
function saveCustomTracks(tracks) {
  try {
    localStorage.setItem('custom_tracks', JSON.stringify(tracks));
  } catch (error) {
    console.error('Failed to save custom tracks:', error);
    throw error; // Re-throw to handle QuotaExceededError in caller
  }
}

/**
 * Restore UI state from preferences
 */
function restoreUIState() {
  // Restore volume slider
  const slider = document.getElementById('volume-slider');
  const volumeValue = document.getElementById('volume-value');
  if (slider && volumeValue) {
    slider.value = musicManager.preferences.volume;
    volumeValue.textContent = Math.round(musicManager.preferences.volume * 100) + '%';
  }

  // Restore toggle button
  const toggleBtn = document.getElementById('music-toggle-btn');
  if (toggleBtn) {
    const isEnabled = musicManager.preferences.enabled;
    toggleBtn.textContent = isEnabled ? 'ON' : 'OFF';
    toggleBtn.classList.toggle('off', !isEnabled);
  }

  // Update now-playing and active track
  updateNowPlaying();
  updateActiveTrack();
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
  musicManager.init().then(() => {
    // After music engine initializes, wire up UI
    initMusicPanel();
    renderMusicLibrary();
    initVolumeControl();
    initToggleButton();
    setupCustomUpload();
    restoreUIState();
  });
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
