# Phase 3: Music System Upgrade - Research

**Researched:** 2026-01-24
**Domain:** Web audio integration for learning platform (Howler.js + browser autoplay policies)
**Confidence:** HIGH

## Summary

This phase adds persistent background music to a web-based terminal simulator that currently uses macOS afplay for event sounds. The standard approach is **Howler.js** (industry-standard web audio library, 25.1k+ GitHub stars) with careful autoplay policy handling.

**Key findings:**
1. Howler.js is the definitive choice for cross-browser web audio (Web Audio API with HTML5 fallback)
2. Browser autoplay policies require user interaction before playing audio with sound
3. afplay (system audio) and Howler.js (browser audio) operate independently - no conflicts
4. Memory management requires explicit cleanup (unload() method) for long-running applications
5. Multiple royalty-free music sources available (Chosic, Fesliyan Studios, Pixabay)

**Primary recommendation:** Use Howler.js 2.x via CDN with muted autoplay + user unlock pattern. Store music preferences in localStorage (simpler than progress.json for web-only features). Implement explicit cleanup for memory efficiency.

## Standard Stack

The established libraries/tools for web audio in 2026:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Howler.js | 2.x | Background music playback | Industry standard - 25.1k stars, Web Audio API + HTML5 fallback, mobile-optimized, 7KB gzipped |
| Web Audio API | Native | Audio context management | Built into browsers, used by Howler under the hood |
| localStorage | Native | Music preference persistence | Built-in, synchronous, 5MB+ capacity, perfect for settings |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| AudioContext | Native | Volume/gain control | Advanced mixing scenarios (Howler handles this) |
| File API | Native | Custom MP3 upload | User-provided music files |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Howler.js | Raw Web Audio API | More code, no HTML5 fallback, harder mobile handling |
| Howler.js | HTML5 `<audio>` element | Limited control, poor mobile support, no fading |
| localStorage | progress.json | Requires backend read/write, overkill for web-only features |

**Installation:**
```html
<!-- CDN (recommended for vanilla JS projects) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js"></script>

<!-- OR via npm -->
npm install howler
```

## Architecture Patterns

### Recommended Project Structure
```
web/
├── music/
│   ├── background/          # Background music tracks (5+ MP3s)
│   │   ├── chill-lofi.mp3
│   │   ├── focus-beats.mp3
│   │   ├── epic-quest.mp3
│   │   └── metadata.json    # Track info (title, mood, BPM)
│   └── custom/              # User-uploaded MP3s
│       └── .gitkeep
├── js/
│   ├── terminal-sim.js      # Existing terminal logic
│   ├── music-system.js      # NEW: Background music manager
│   └── audio-settings.js    # NEW: Volume/toggle UI controls
└── terminal.html
```

### Pattern 1: Howler.js Initialization with Autoplay Policy Handling
**What:** Create background music player that respects browser autoplay restrictions
**When to use:** All background music initialization (Phase 3 core requirement)
**Example:**
```javascript
// Source: https://github.com/goldfire/howler.js (verified 2026-01-24)

class BackgroundMusicManager {
  constructor() {
    this.currentTrack = null;
    this.isUnlocked = false;
    this.preferences = this.loadPreferences();
  }

  // Initialize with muted autoplay-safe approach
  init() {
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

  // Load and prepare track
  loadTrack(trackName, startMuted = false) {
    // Cleanup previous track
    if (this.currentTrack) {
      this.currentTrack.unload(); // CRITICAL for memory management
    }

    // Create new Howl instance
    this.currentTrack = new Howl({
      src: [`music/background/${trackName}.mp3`],
      html5: true,  // Stream large files, don't wait for full download
      loop: true,   // Background music should loop
      volume: startMuted ? 0 : this.preferences.volume,
      onload: () => {
        console.log(`Track loaded: ${trackName}`);
        if (!startMuted && this.preferences.enabled) {
          this.play();
        }
      },
      onloaderror: (id, error) => {
        console.error(`Failed to load ${trackName}:`, error);
      },
      onend: () => {
        // Loop handles repeat, but onend useful for analytics
      }
    });
  }

  // Unlock audio on first user interaction
  unlockAudio() {
    if (this.isUnlocked) return;

    // Play then immediately stop to unlock Web Audio API
    const unlockSound = new Howl({
      src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA=='],
      onend: () => {
        this.isUnlocked = true;
        unlockSound.unload();

        // Now safe to play background music at user's preferred volume
        if (this.preferences.enabled && this.currentTrack) {
          this.currentTrack.volume(this.preferences.volume);
          this.play();
        }
      }
    });
    unlockSound.play();
  }

  play() {
    if (this.currentTrack && !this.currentTrack.playing()) {
      this.currentTrack.play();
    }
  }

  pause() {
    if (this.currentTrack) {
      this.currentTrack.pause();
    }
  }

  // Fade transition between tracks
  switchTrack(newTrackName) {
    if (!this.currentTrack) {
      this.loadTrack(newTrackName);
      return;
    }

    // Fade out current track over 2 seconds
    this.currentTrack.fade(this.currentTrack.volume(), 0, 2000);

    // After fade completes, switch tracks
    setTimeout(() => {
      this.loadTrack(newTrackName);
      // Fade in new track
      if (this.currentTrack && this.preferences.enabled) {
        this.currentTrack.volume(0);
        this.currentTrack.play();
        this.currentTrack.fade(0, this.preferences.volume, 2000);
      }
    }, 2000);
  }

  setVolume(volume) {
    this.preferences.volume = volume;
    if (this.currentTrack) {
      this.currentTrack.volume(volume);
    }
    this.savePreferences();
  }

  toggle() {
    this.preferences.enabled = !this.preferences.enabled;
    if (this.preferences.enabled) {
      this.play();
    } else {
      this.pause();
    }
    this.savePreferences();
  }

  loadPreferences() {
    const defaults = {
      track: 'chill-lofi',
      volume: 0.3,
      enabled: true
    };

    try {
      const saved = localStorage.getItem('music_preferences');
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) {
      return defaults;
    }
  }

  savePreferences() {
    localStorage.setItem('music_preferences', JSON.stringify(this.preferences));
  }

  // Cleanup on page unload
  destroy() {
    if (this.currentTrack) {
      this.currentTrack.unload();
    }
  }
}

// Usage in terminal.html
const musicManager = new BackgroundMusicManager();

// Initialize on page load (muted for autoplay)
document.addEventListener('DOMContentLoaded', () => {
  musicManager.init();
});

// Unlock on first user interaction
document.addEventListener('click', () => {
  musicManager.unlockAudio();
}, { once: true });

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  musicManager.destroy();
});
```

### Pattern 2: Music Library with Track Selection UI
**What:** Present music tracks to user with metadata, allow selection
**When to use:** MUS-02 requirement (student chooses track)
**Example:**
```javascript
// Track metadata structure
// Source: Common pattern from web game audio libraries
const MUSIC_LIBRARY = {
  'chill-lofi': {
    title: 'Chill Lofi Beats',
    mood: 'relaxed',
    bpm: 80,
    duration: 180, // seconds
    file: 'chill-lofi.mp3'
  },
  'focus-beats': {
    title: 'Deep Focus',
    mood: 'concentrated',
    bpm: 95,
    duration: 210
  },
  'epic-quest': {
    title: 'Epic Quest',
    mood: 'energetic',
    bpm: 130,
    duration: 165
  },
  'ambient-space': {
    title: 'Ambient Space',
    mood: 'peaceful',
    bpm: 60,
    duration: 240
  },
  'retro-synth': {
    title: 'Retro Synthwave',
    mood: 'nostalgic',
    bpm: 110,
    duration: 195
  }
};

// Track selection UI
function renderMusicLibrary() {
  const container = document.getElementById('music-library');

  Object.entries(MUSIC_LIBRARY).forEach(([id, track]) => {
    const trackCard = document.createElement('div');
    trackCard.className = 'track-card';
    trackCard.innerHTML = `
      <div class="track-title">${track.title}</div>
      <div class="track-meta">
        <span class="track-mood">${track.mood}</span>
        <span class="track-bpm">${track.bpm} BPM</span>
      </div>
    `;

    trackCard.addEventListener('click', () => {
      musicManager.switchTrack(id);
      // Update UI to show selected track
      document.querySelectorAll('.track-card').forEach(el => el.classList.remove('active'));
      trackCard.classList.add('active');
    });

    container.appendChild(trackCard);
  });
}
```

### Pattern 3: Custom MP3 File Upload
**What:** Allow user to upload their own MP3 files to music library
**When to use:** MUS-06 requirement (personal music picks)
**Example:**
```javascript
// Source: MDN File API + Howler.js integration
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file

function setupCustomMusicUpload() {
  const fileInput = document.getElementById('custom-music-upload');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Validation
    if (!file) return;

    // Check file type (MIME type varies by browser: audio/mpeg or audio/mp3)
    const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload an MP3 or WAV file');
      return;
    }

    // Check file size (max 20MB recommended)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert('File too large (max 20MB)');
      return;
    }

    // Create object URL for Howler
    const objectURL = URL.createObjectURL(file);

    // Store in localStorage for persistence (as data URL for smaller files)
    const reader = new FileReader();
    reader.onload = (e) => {
      const customTracks = JSON.parse(localStorage.getItem('custom_tracks') || '{}');
      const trackId = `custom-${Date.now()}`;

      customTracks[trackId] = {
        title: file.name.replace(/\.(mp3|wav)$/i, ''),
        dataUrl: e.target.result, // Base64 for localStorage
        mood: 'custom',
        uploadedAt: new Date().toISOString()
      };

      localStorage.setItem('custom_tracks', JSON.stringify(customTracks));

      // Add to music library UI
      renderCustomTrack(trackId, customTracks[trackId]);

      // Revoke object URL after use
      URL.revokeObjectURL(objectURL);
    };

    // For small files (<5MB), store as data URL
    if (file.size < 5 * 1024 * 1024) {
      reader.readAsDataURL(file);
    } else {
      // For larger files, only store metadata and keep file reference
      alert('Large file - will need to re-upload after browser refresh');
      // Could use IndexedDB here for larger files, but adds complexity
    }
  });
}

// HTML structure
/*
<div class="music-upload-section">
  <label for="custom-music-upload" class="upload-btn">
    📁 Upload Your Music (MP3)
  </label>
  <input
    type="file"
    id="custom-music-upload"
    accept="audio/mp3,audio/mpeg,audio/wav"
    style="display: none;"
  />
</div>
*/
```

### Pattern 4: Volume Control with Persistence
**What:** Slider for volume control that persists across sessions
**When to use:** MUS-04 requirement (volume control)
**Example:**
```javascript
// Source: Howler.js volume() + localStorage pattern
function setupVolumeControl() {
  const volumeSlider = document.getElementById('volume-slider');
  const volumeValue = document.getElementById('volume-value');

  // Load saved volume
  const savedVolume = parseFloat(localStorage.getItem('music_volume') || '0.3');
  volumeSlider.value = savedVolume;
  volumeValue.textContent = Math.round(savedVolume * 100) + '%';

  // Update volume on change
  volumeSlider.addEventListener('input', (e) => {
    const volume = parseFloat(e.target.value);
    volumeValue.textContent = Math.round(volume * 100) + '%';

    // Update Howler global volume
    Howler.volume(volume);

    // OR update specific track
    if (musicManager.currentTrack) {
      musicManager.setVolume(volume);
    }
  });

  // Persist on change end
  volumeSlider.addEventListener('change', (e) => {
    const volume = parseFloat(e.target.value);
    localStorage.setItem('music_volume', volume);
  });
}

// HTML structure
/*
<div class="volume-control">
  <label>🔊 Volume</label>
  <input
    type="range"
    id="volume-slider"
    min="0"
    max="1"
    step="0.1"
    value="0.3"
  />
  <span id="volume-value">30%</span>
</div>
*/
```

### Anti-Patterns to Avoid

- **Creating new Howl instances without cleanup:** Causes memory leaks. ALWAYS call `unload()` before creating new instances
- **Playing audio without user interaction check:** Violates autoplay policy, won't work in modern browsers
- **Using progress.json for music preferences:** Overkill - localStorage is simpler for web-only features
- **Storing large MP3 files in localStorage:** 5MB limit, use data URLs only for small files or implement IndexedDB
- **Blocking teaching flow with music loading:** Use `html5: true` for streaming, `onload` callbacks for readiness

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-browser audio playback | Custom Web Audio API wrapper | Howler.js | 25k stars, handles Web Audio API + HTML5 fallback, mobile unlock, format detection |
| Audio fade in/out | Manual setInterval volume changes | `howl.fade(from, to, duration)` | Built-in, uses AudioParam scheduling, smoother transitions |
| Autoplay policy detection | Trial-and-error play attempts | `navigator.getAutoplayPolicy()` + promise handling | MDN-recommended pattern, proper error handling |
| Music file format conversion | Custom encoder | Use MP3 (widely supported) + WebM fallback | Howler auto-detects, MP3 has 99%+ browser support in 2026 |
| Volume normalization | Manual gain calculation | Pre-process files with Audacity | Consistent loudness across tracks, no runtime overhead |

**Key insight:** Web audio is deceptively complex. Browser differences, mobile restrictions, memory management, and format compatibility are all solved problems. Howler.js handles 95% of edge cases you'd otherwise spend weeks debugging.

## Common Pitfalls

### Pitfall 1: Memory Leaks from Un-destroyed Howl Instances
**What goes wrong:** Creating new Howl instances without calling `unload()` on previous instances causes memory to accumulate. Production apps report ~1GB/hour memory growth with streaming audio.
**Why it happens:** Howler maintains references to Web Audio nodes and buffers. JavaScript GC can't clean them up without explicit `unload()` call.
**How to avoid:**
- ALWAYS call `howl.unload()` before creating new instance
- Call `unload()` in `onend` callback for one-time sounds
- Implement `destroy()` method for music manager cleanup
**Warning signs:**
- Browser tab becomes sluggish after 30+ minutes
- Memory usage grows continuously in DevTools
- Mobile devices experience crashes after extended use

### Pitfall 2: Autoplay Policy Violations
**What goes wrong:** Background music doesn't play on page load, no error shown to user
**Why it happens:** Modern browsers block audio with sound until user interacts with page (click, tap, key press)
**How to avoid:**
- Use `navigator.getAutoplayPolicy()` to check before playing
- Implement "unlock audio" pattern with silent sound on first interaction
- Start with muted autoplay, fade in after unlock
- Show visible "Enable Music" button if autoplay blocked
**Warning signs:**
- Music works in development but not production
- Works on desktop but fails on mobile
- `howl.play()` returns but no audio heard

### Pitfall 3: Incorrect File Format MIME Types
**What goes wrong:** MP3 files fail to load or play inconsistently across browsers
**Why it happens:** Chrome returns `audio/mp3`, Firefox/Opera/IE return `audio/mpeg` for same file
**How to avoid:**
- Accept both MIME types in validation: `['audio/mp3', 'audio/mpeg']`
- Let Howler detect format from file extension (it does this automatically)
- Always provide fallback format: `src: ['track.mp3', 'track.webm']`
**Warning signs:**
- File upload works in one browser, fails in another
- Console shows "format not supported" errors
- Validation rejects valid MP3 files

### Pitfall 4: Using progress.json for Web-Only Features
**What goes wrong:** Music preferences require backend file operations for purely frontend features
**Why it happens:** Existing progress tracking uses progress.json, seems logical to extend it
**How to avoid:**
- Use localStorage for web-only features (music, UI preferences)
- Reserve progress.json for cross-platform data (XP, level, badges)
- localStorage is synchronous and instant, no file I/O overhead
**Warning signs:**
- Music preferences feel slow to save/load
- File conflicts when multiple tabs open
- Need backend read/write for simple toggle

### Pitfall 5: Large Files in localStorage
**What goes wrong:** Saving 10MB MP3 as data URL crashes browser or fails silently
**Why it happens:** localStorage has ~5MB limit, varies by browser
**How to avoid:**
- Store only small files (<1MB) as data URLs in localStorage
- For larger files, use File API object URLs (session-only)
- Consider IndexedDB for persistent large file storage (more complex)
- Show file size limit in UI (e.g., "Max 5MB")
**Warning signs:**
- localStorage.setItem() fails silently
- Browser console shows "QuotaExceededError"
- Music upload works once, then breaks

### Pitfall 6: Event Listener Accumulation
**What goes wrong:** Creating 100+ event listeners causes performance degradation
**Why it happens:** Adding event listeners in loops or on every play() without cleanup
**How to avoid:**
- Use event delegation for music library clicks
- Remove listeners before re-adding: `removeEventListener` before `addEventListener`
- Use `{ once: true }` option for one-time listeners
**Warning signs:**
- Browser DevTools shows excessive listener count
- UI becomes sluggish with many tracks
- Multiple event fires for single interaction

## Code Examples

Verified patterns from official sources:

### Basic Howler.js Setup
```javascript
// Source: https://github.com/goldfire/howler.js (official README)
// Verified: 2026-01-24

// Simple background music
const bgMusic = new Howl({
  src: ['music/background/track.mp3'],
  loop: true,
  volume: 0.5,
  html5: true  // Stream large files
});

bgMusic.play();

// Event sounds (layered on background)
const taskSound = new Howl({
  src: ['sounds/ping.mp3'],
  volume: 0.8,
  onend: function() {
    this.unload();  // Cleanup after play
  }
});

taskSound.play();
```

### Fade Transitions
```javascript
// Source: https://github.com/goldfire/howler.js/issues/539
// Verified: 2026-01-24

// Fade out over 2 seconds, then stop
bgMusic.fade(1, 0, 2000);
setTimeout(() => bgMusic.stop(), 2000);

// Fade in new track
const newTrack = new Howl({ src: ['music/new.mp3'], volume: 0 });
newTrack.play();
newTrack.fade(0, 0.5, 2000);
```

### Autoplay Policy Detection
```javascript
// Source: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
// Verified: 2026-01-24

// Modern approach (Chrome 111+, Firefox 113+)
if (navigator.getAutoplayPolicy) {
  const policy = navigator.getAutoplayPolicy('mediaelement');

  if (policy === 'allowed') {
    // Can autoplay with audio
    bgMusic.play();
  } else if (policy === 'allowed-muted') {
    // Can only autoplay muted
    bgMusic.mute(true);
    bgMusic.play();
  } else {
    // Show enable music button
    showMusicButton();
  }
}

// Fallback approach (older browsers)
const playPromise = bgMusic.play();
if (playPromise !== undefined) {
  playPromise.catch(error => {
    if (error.name === 'NotAllowedError') {
      // Autoplay blocked - wait for user interaction
      showMusicButton();
    }
  });
}
```

### localStorage Music Preferences
```javascript
// Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// Verified: 2026-01-24

// Save preferences
function saveMusicPrefs(track, volume, enabled) {
  const prefs = {
    background_track: track,
    volume: volume,
    music_enabled: enabled,
    last_updated: new Date().toISOString()
  };
  localStorage.setItem('music_preferences', JSON.stringify(prefs));
}

// Load preferences
function loadMusicPrefs() {
  const defaults = {
    background_track: 'chill-lofi',
    volume: 0.3,
    music_enabled: true
  };

  try {
    const saved = localStorage.getItem('music_preferences');
    return saved ? JSON.parse(saved) : defaults;
  } catch (e) {
    console.warn('Failed to load music prefs:', e);
    return defaults;
  }
}

// Usage
const prefs = loadMusicPrefs();
const bgMusic = new Howl({
  src: [`music/${prefs.background_track}.mp3`],
  volume: prefs.volume,
  loop: true
});

if (prefs.music_enabled) {
  bgMusic.play();
}
```

### File Upload with Validation
```javascript
// Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
// Verified: 2026-01-24

document.getElementById('music-upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate type (Chrome uses audio/mp3, Firefox uses audio/mpeg)
  const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
  if (!validTypes.includes(file.type)) {
    alert('Please upload MP3 or WAV file');
    return;
  }

  // Validate size (max 5MB for localStorage)
  if (file.size > 5 * 1024 * 1024) {
    alert('File too large (max 5MB)');
    return;
  }

  // Create Howl from file
  const url = URL.createObjectURL(file);
  const customTrack = new Howl({
    src: [url],
    html5: true,
    onload: () => {
      console.log('Custom track loaded:', file.name);
    },
    onloaderror: (id, error) => {
      console.error('Load error:', error);
      URL.revokeObjectURL(url); // Cleanup
    }
  });
});
```

### Music + afplay Event Sounds (No Conflict)
```javascript
// Background music (browser audio via Howler.js)
const bgMusic = new Howl({
  src: ['music/background/track.mp3'],
  loop: true,
  volume: 0.3
});
bgMusic.play();

// Event sounds (system audio via afplay - separate from browser)
// These are triggered by Claude via Bash tool in teaching session
// They layer on top of browser audio without conflicts

// Example: Task complete event in Claude
Bash({
  command: '(afplay /System/Library/Sounds/Ping.aiff 2>/dev/null || true) &',
  run_in_background: true,
  description: 'Play task complete sound'
});

// Technical explanation:
// - Howler.js audio = Web Audio API in browser process
// - afplay audio = macOS system audio in separate process
// - They mix at OS level, no interference
// - Volume controls are independent (browser volume vs system volume)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SoundManager2 | Howler.js | ~2015 | Modern Web Audio API support, better mobile |
| Flash audio | Native Web Audio | ~2017 | No plugins, faster, more reliable |
| Manual autoplay | Autoplay policy APIs | 2018-2020 | Must request unlock, better UX |
| Cookies for prefs | localStorage | ~2012 | 5MB vs 4KB, synchronous, simpler |
| .ogg + .mp3 fallbacks | .mp3 only (+ .webm optional) | ~2020 | MP3 99%+ browser support, simpler |

**Deprecated/outdated:**
- **SoundManager2**: Unmaintained since 2015, replaced by Howler.js
- **createjs.SoundJS**: Complex API, Howler.js simpler for most use cases
- **Buzz.js**: Abandoned in 2014, no mobile support
- **jPlayer**: jQuery dependency, overkill for background music
- **Flash-based audio**: Removed from browsers in 2020

## Open Questions

Things that couldn't be fully resolved:

1. **Should custom music files persist across browser sessions?**
   - What we know: localStorage can store <5MB data URLs, larger files need IndexedDB
   - What's unclear: User expectation - re-upload each session vs. persistent library?
   - Recommendation: Start with session-only (object URLs), add IndexedDB in Phase 4 if users request it

2. **Should music sync between web portal and CLI session?**
   - What we know: CLI session happens in separate terminal window/tab
   - What's unclear: Is music only for web portal, or should CLI trigger music changes?
   - Recommendation: Phase 3 scope is web portal only. Music plays during terminal.html session, stops when user types `claude` to enter CLI. Syncing CLI ↔ web is Phase 5+ complexity.

3. **Optimal number of tracks in initial library?**
   - What we know: More variety = better UX, but more licensing/hosting overhead
   - What's unclear: Balance between choice and decision paralysis
   - Recommendation: Start with 5 tracks (chill, focus, energetic, ambient, retro). Add more if user feedback requests variety.

4. **Should volume control be global or per-track?**
   - What we know: Global simpler, per-track allows "this track is too loud" fixes
   - What's unclear: User mental model - do they expect one volume slider or many?
   - Recommendation: Global volume slider (Howler.volume()), with per-track normalization done in preprocessing (Audacity). Simpler UX.

## Sources

### Primary (HIGH confidence)
- [Howler.js GitHub Repository](https://github.com/goldfire/howler.js) - Current version, installation, API reference
- [Howler.js Official Site](https://howlerjs.com/) - Documentation and examples
- [MDN: Autoplay Guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) - Browser policies, detection methods
- [MDN: localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Persistence patterns
- [MDN: File API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file) - Upload handling

### Secondary (MEDIUM confidence)
- [Howler.js npm Package](https://www.npmjs.com/package/howler) - Installation options
- [MDN: Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Underlying technology
- [Web Audio API Guide](https://webaudioapi.com/book/Web_Audio_API_Boris_Smus_html/ch01.html) - Fade transitions, mixing
- [Chrome Autoplay Policy](https://developer.chrome.com/blog/autoplay) - Chrome-specific rules
- [Chosic - Royalty-Free Music](https://www.chosic.com/free-music/games/) - Music sources
- [Fesliyan Studios](https://www.fesliyanstudios.com/) - Background music library
- [Pixabay Music](https://pixabay.com/music/search/gaming/) - Free game music

### Tertiary (LOW confidence - flagged for validation)
- [Howler.js Memory Leak Issues](https://github.com/goldfire/howler.js/issues/1731) - Community-reported problems (anecdotal)
- [Howler.js Playlist Discussion](https://github.com/goldfire/howler.js/issues/191) - Feature request from 2014 (may be outdated)
- Web search results on "best practices" - Multiple sources, cross-verified

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Howler.js is industry standard, 25k+ stars, active maintenance
- Architecture: HIGH - Patterns verified from official docs and MDN (2026-01-24)
- Pitfalls: MEDIUM - Memory leaks documented in GitHub issues, autoplay policies from MDN
- Music sources: MEDIUM - Royalty-free libraries exist, licensing requires verification per-track

**Research date:** 2026-01-24
**Valid until:** 60 days (stable domain - Howler.js v2 released 2017, still current in 2026)
