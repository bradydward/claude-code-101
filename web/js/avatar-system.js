// Avatar System - Character Sprite Engine for Terminal Onboarding

class AvatarSystem {
  constructor() {
    this.config = null;
    this.currentStage = 'recruit'; // recruit, trainee, adventurer
    this.currentColor = 'cyan'; // cyan, gold, purple
    this.currentEmotion = 'idle'; // idle, happy, confused, victory
    this.spriteElement = null;
    this.speechBubbleElement = null;
    this.loadConfig();
  }

  async loadConfig() {
    try {
      const response = await fetch('data/sprite-config.json');
      this.config = await response.json();
    } catch (error) {
      console.warn('Could not load sprite config, using defaults');
      this.config = this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      colors: {
        cyan: { primary: '#4fc3f7', glow: 'rgba(79, 195, 247, 0.6)' },
        gold: { primary: '#ffd700', glow: 'rgba(255, 215, 0, 0.6)' },
        purple: { primary: '#bb86fc', glow: 'rgba(187, 134, 252, 0.6)' }
      },
      speech_bubbles: {
        correct_command: ['YES! 🎉', 'Perfect!', 'Nailed it!'],
        wrong_command: ['Hmm, try again!', 'Not quite...', 'Almost there!'],
        quest_complete: ['LEVEL UP!', 'Amazing!', 'We did it!'],
        evolution: ['I\'ve grown stronger!', 'Power up!']
      }
    };
  }

  // Initialize avatar on page
  init(containerSelector = 'body') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Create avatar container
    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'avatar-container';
    avatarContainer.innerHTML = `
      <div class="avatar-sprite" id="avatar-sprite"></div>
      <div class="avatar-speech-bubble" id="avatar-speech"></div>
    `;
    container.appendChild(avatarContainer);

    this.spriteElement = document.getElementById('avatar-sprite');
    this.speechBubbleElement = document.getElementById('avatar-speech');

    // Load saved avatar or use default
    this.loadFromStorage();
    this.render();
  }

  // Create character (color selection at start)
  createCharacter(color) {
    this.currentColor = color;
    this.currentStage = 'recruit';
    this.currentEmotion = 'idle';
    this.saveToStorage();
    this.render();
    this.playAnimation('idle');
  }

  // Render current sprite
  render() {
    if (!this.spriteElement) return;

    const stage = this.currentStage;
    const emotion = this.currentEmotion;
    const color = this.currentColor;
    const size = this.getSizeForStage(stage);

    // Try to load PNG sprite first
    const imagePath = `assets/characters/${stage}-${color}-${emotion}.png`;

    // Create image element with fallback
    const img = new Image();
    img.src = imagePath;

    img.onload = () => {
      // PNG loaded successfully
      this.spriteElement.innerHTML = `
        <img src="${imagePath}"
             alt="Avatar ${stage} ${emotion}"
             class="avatar-png-sprite"
             style="
               image-rendering: pixelated;
               image-rendering: crisp-edges;
               width: 100%;
               height: 100%;
               object-fit: contain;
               filter: drop-shadow(0 0 ${this.getGlowSize(stage)}px ${this.config?.colors[color]?.glow || 'rgba(79, 195, 247, 0.6)'});
             ">
      `;
    };

    img.onerror = () => {
      // PNG not found, use SVG fallback
      const configColor = this.config?.colors[color]?.primary || '#4fc3f7';
      this.spriteElement.innerHTML = this.generatePlaceholderSprite(size, configColor);
    };
  }

  getGlowSize(stage) {
    const glowSizes = { recruit: 10, trainee: 15, adventurer: 20 };
    return glowSizes[stage] || 10;
  }

  // Generate SVG placeholder sprite
  generatePlaceholderSprite(size, color) {
    const shapes = {
      recruit: this.generateRecruitShape(size, color),
      trainee: this.generateTraineeShape(size, color),
      adventurer: this.generateAdventurerShape(size, color)
    };
    return shapes[this.currentStage] || shapes.recruit;
  }

  generateRecruitShape(size, color) {
    // Simple circle for recruit (32px equivalent)
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 32 32" style="filter: drop-shadow(0 0 10px ${color});">
        <circle cx="16" cy="16" r="12" fill="${color}" opacity="0.9"/>
        <circle cx="12" cy="14" r="2" fill="#fff"/>
        <circle cx="20" cy="14" r="2" fill="#fff"/>
        <path d="M 10 20 Q 16 24 22 20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>
    `;
  }

  generateTraineeShape(size, color) {
    // More detailed shape for trainee (64px equivalent)
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 64 64" style="filter: drop-shadow(0 0 15px ${color});">
        <circle cx="32" cy="32" r="24" fill="${color}" opacity="0.9"/>
        <circle cx="32" cy="28" r="18" fill="${color}"/>
        <circle cx="26" cy="26" r="3" fill="#fff"/>
        <circle cx="38" cy="26" r="3" fill="#fff"/>
        <path d="M 22 36 Q 32 42 42 36" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
        <rect x="22" y="10" width="20" height="8" fill="${color}" opacity="0.7" rx="4"/>
      </svg>
    `;
  }

  generateAdventurerShape(size, color) {
    // Detailed shape for adventurer (128px equivalent)
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 128 128" style="filter: drop-shadow(0 0 20px ${color});">
        <circle cx="64" cy="64" r="48" fill="${color}" opacity="0.9"/>
        <circle cx="64" cy="56" r="36" fill="${color}"/>
        <circle cx="52" cy="52" r="6" fill="#fff"/>
        <circle cx="76" cy="52" r="6" fill="#fff"/>
        <circle cx="52" cy="52" r="3" fill="#000"/>
        <circle cx="76" cy="52" r="3" fill="#000"/>
        <path d="M 44 72 Q 64 84 84 72" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
        <rect x="44" y="20" width="40" height="16" fill="${color}" opacity="0.8" rx="8"/>
        <path d="M 44 92 L 36 110 L 44 110 M 84 92 L 92 110 L 84 110" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
      </svg>
    `;
  }

  getSizeForStage(stage) {
    const sizes = { recruit: 48, trainee: 72, adventurer: 128 };
    return sizes[stage] || 48;
  }

  // Play animation
  playAnimation(emotion) {
    if (!this.spriteElement) return;

    this.currentEmotion = emotion;

    // Re-render with new emotion sprite
    this.render();

    const animationClass = `avatar-${emotion}`;

    // Remove all animation classes
    this.spriteElement.className = 'avatar-sprite';

    // Trigger reflow to restart animation
    void this.spriteElement.offsetWidth;

    // Add new animation class
    this.spriteElement.classList.add(animationClass);

    // Return to idle after animation completes
    if (emotion !== 'idle') {
      setTimeout(() => {
        this.playAnimation('idle');
      }, emotion === 'happy' ? 600 : 1000);
    }
  }

  // Show speech bubble
  showSpeech(text, duration = 3000) {
    if (!this.speechBubbleElement) return;

    this.speechBubbleElement.textContent = text;
    this.speechBubbleElement.classList.add('active');

    setTimeout(() => {
      this.hideSpeech();
    }, duration);
  }

  hideSpeech() {
    if (!this.speechBubbleElement) return;
    this.speechBubbleElement.classList.remove('active');
  }

  // React to events
  onCorrectCommand() {
    this.playAnimation('happy');
    const messages = this.config?.speech_bubbles?.correct_command || ['YES! 🎉'];
    this.showSpeech(messages[Math.floor(Math.random() * messages.length)]);
  }

  onWrongCommand() {
    this.playAnimation('confused');
    const messages = this.config?.speech_bubbles?.wrong_command || ['Hmm, try again!'];
    this.showSpeech(messages[Math.floor(Math.random() * messages.length)]);
  }

  onQuestComplete() {
    this.playAnimation('victory');
    const messages = this.config?.speech_bubbles?.quest_complete || ['LEVEL UP!'];
    this.showSpeech(messages[Math.floor(Math.random() * messages.length)], 4000);
  }

  // Evolution system
  checkEvolution(totalXP, currentQuest) {
    let shouldEvolve = false;
    let newStage = this.currentStage;

    if (currentQuest >= 5 && this.currentStage !== 'adventurer') {
      newStage = 'adventurer';
      shouldEvolve = true;
    } else if (currentQuest >= 3 && this.currentStage === 'recruit') {
      newStage = 'trainee';
      shouldEvolve = true;
    }

    if (shouldEvolve) {
      this.evolve(newStage);
    }
  }

  evolve(newStage) {
    const oldStage = this.currentStage;
    this.currentStage = newStage;

    // Play evolution animation
    this.playEvolutionAnimation();

    // Show evolution message
    const messages = this.config?.speech_bubbles?.evolution || ['I\'ve grown stronger!'];
    setTimeout(() => {
      this.showSpeech(messages[Math.floor(Math.random() * messages.length)], 4000);
    }, 1000);

    this.saveToStorage();
  }

  playEvolutionAnimation() {
    if (!this.spriteElement) return;

    this.spriteElement.classList.add('avatar-evolving');

    setTimeout(() => {
      this.render(); // Re-render with new stage
      this.spriteElement.classList.remove('avatar-evolving');
      this.spriteElement.classList.add('avatar-evolved');

      setTimeout(() => {
        this.spriteElement.classList.remove('avatar-evolved');
        this.playAnimation('idle');
      }, 500);
    }, 1000);
  }

  // Storage
  saveToStorage() {
    try {
      localStorage.setItem('cc101_avatar', JSON.stringify({
        stage: this.currentStage,
        color: this.currentColor,
        created_at: Date.now()
      }));
    } catch (e) {
      console.warn('Could not save avatar to storage');
    }
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('cc101_avatar');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentStage = data.stage || 'recruit';
        this.currentColor = data.color || 'cyan';
      }
    } catch (e) {
      console.warn('Could not load avatar from storage');
    }
  }

  // Get avatar data for export to real curriculum
  exportData() {
    return {
      stage: this.currentStage,
      color: this.currentColor,
      created_at: localStorage.getItem('cc101_avatar') ?
        JSON.parse(localStorage.getItem('cc101_avatar')).created_at : Date.now()
    };
  }
}

// Export for use in terminal-sim.js
window.AvatarSystem = AvatarSystem;
