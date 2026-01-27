// Mock Terminal Engine - Scripted Quest System

const QUESTS = [
  {
    id: 1,
    name: 'The Blinking Cursor',
    description: 'What is a terminal?',
    xpReward: 10,
    steps: [
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>echo "hello"</code> and press Enter',
        expected: 'echo "hello"',
        altExpected: ["echo 'hello'", 'echo hello'],
        response: 'hello',
        explanation: "Perfect! See how it repeated 'hello'? That's what echo does - it repeats whatever you give it. Simple, right?"
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Now type: <code>echo "I am learning"</code>',
        expected: 'echo "I am learning"',
        altExpected: ["echo 'I am learning'", 'echo I am learning'],
        response: 'I am learning',
        explanation: "Excellent! You're giving commands and the computer obeys. That's really all the terminal is - you type, it responds. Let's learn more..."
      }
    ]
  },
  {
    id: 2,
    name: 'Where Am I?',
    description: 'Navigation basics',
    xpReward: 20,
    steps: [
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>pwd</code> (print working directory)',
        expected: 'pwd',
        altExpected: [],
        response: '/Users/you',
        explanation: "That's your current location - where you are in your computer's file system. Think of it like GPS coordinates for files!"
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>ls</code> (list what\'s here)',
        expected: 'ls',
        altExpected: [],
        response: 'Desktop  Documents  Downloads  projects',
        explanation: "There we go! Those are all the folders in your current location. Let's move into one..."
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>cd Desktop</code> (change directory)',
        expected: 'cd Desktop',
        altExpected: ['cd desktop'],
        response: '',
        newPrompt: 'user@mac ~/Desktop % ',
        explanation: "You moved! Notice the path in your prompt changed to show where you are."
      },
      {
        prompt: 'user@mac ~/Desktop % ',
        instruction: 'Type: <code>pwd</code> to confirm your location',
        expected: 'pwd',
        altExpected: [],
        response: '/Users/you/Desktop',
        explanation: "See? You're now inside Desktop. You navigated with just a few keystrokes!"
      }
    ]
  },
  {
    id: 3,
    name: 'Moving Around',
    description: 'cd mastery',
    xpReward: 20,
    steps: [
      {
        prompt: 'user@mac ~/Desktop % ',
        instruction: 'Type: <code>cd ..</code> (go up one level)',
        expected: 'cd ..',
        altExpected: ['cd..'],
        response: '',
        newPrompt: 'user@mac ~ % ',
        explanation: "Two dots (..) means 'go back up'. Like pressing the back button."
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>cd Documents</code>',
        expected: 'cd Documents',
        altExpected: ['cd documents'],
        response: '',
        newPrompt: 'user@mac ~/Documents % ',
        explanation: "You jumped into Documents. Moving between folders is this easy."
      },
      {
        prompt: 'user@mac ~/Documents % ',
        instruction: 'Type: <code>ls</code> to see what\'s inside',
        expected: 'ls',
        altExpected: [],
        response: 'notes.txt  resume.pdf  school',
        explanation: "Every folder can contain files and more folders. It's like a tree."
      },
      {
        prompt: 'user@mac ~/Documents % ',
        instruction: 'Type: <code>cd ~</code> (shortcut for home)',
        expected: 'cd ~',
        altExpected: ['cd'],
        response: '',
        newPrompt: 'user@mac ~ % ',
        explanation: "The ~ symbol means 'home'. No matter where you are, cd ~ takes you home."
      }
    ]
  },
  {
    id: 4,
    name: 'Creating Things',
    description: 'mkdir and files',
    xpReward: 20,
    steps: [
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>mkdir my-project</code> (make directory)',
        expected: 'mkdir my-project',
        altExpected: ['mkdir myproject', 'mkdir my_project'],
        response: '',
        explanation: "Silence means success! No news is good news in the terminal. Your folder was created."
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>ls</code> to see your new folder',
        expected: 'ls',
        altExpected: [],
        response: 'Desktop  Documents  Downloads  my-project  projects',
        explanation: "There it is! 'my-project' is now a real folder on your computer."
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>cd my-project</code> to go inside',
        expected: 'cd my-project',
        altExpected: ['cd myproject', 'cd my_project'],
        response: '',
        newPrompt: 'user@mac ~/my-project % ',
        explanation: "You're inside your brand new folder. It's yours."
      },
      {
        prompt: 'user@mac ~/my-project % ',
        instruction: 'Type: <code>ls</code> to see inside',
        expected: 'ls',
        altExpected: [],
        response: '',
        explanation: "Empty! Because you just made it. Soon YOU'LL fill it with amazing things."
      }
    ]
  },
  {
    id: 5,
    name: 'A Taste of Power',
    description: 'Claude Code preview',
    xpReward: 50,
    steps: [
      {
        prompt: 'user@mac ~/my-project % ',
        instruction: 'Type: <code>claude</code> to launch Claude Code',
        expected: 'claude',
        altExpected: [],
        response: '\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551  Welcome to Claude Code!           \u2551\n\u2551  Your AI-powered coding companion  \u2551\n\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d\n\nTip: Ask me anything or give me a task!\n',
        isClaudeMode: true,
        explanation: "This is what REAL Claude Code looks like! When you install it for real, this is exactly how it starts. Let me show you what I can do..."
      },
      {
        prompt: 'claude> ',
        instruction: 'Ask Claude: <code>What folder are we in?</code>',
        expected: 'What folder are we in?',
        altExpected: ['what folder are we in', 'where are we', 'pwd', 'what folder are we in?'],
        response: "You're currently in /Users/you/my-project\n\nThis is an empty directory - ready for you to build something!",
        isClaudeMode: true,
        explanation: "See? I can understand plain English AND I can see your file system. No need for technical commands - just ask me in normal language!"
      },
      {
        prompt: 'claude> ',
        instruction: 'Type: <code>Create a file called hello.txt</code>',
        expected: 'Create a file called hello.txt',
        altExpected: ['create a file called hello.txt', 'make a file called hello.txt', 'create hello.txt'],
        response: "\u2713 Created hello.txt with content:\n  \"Hello! This is your first file.\"\n\nThe file has been saved to /Users/you/my-project/hello.txt",
        isClaudeMode: true,
        explanation: "Boom! File created. In the real Claude Code, I can build entire projects for you - websites, apps, games, anything. This is just a tiny preview!"
      },
      {
        prompt: 'claude> ',
        instruction: 'Type: <code>/exit</code> to leave Claude',
        expected: '/exit',
        altExpected: ['exit', 'quit', '/quit'],
        response: '\nGoodbye! Happy coding.\n',
        isClaudeMode: false,
        explanation: "That was just practice mode - but the REAL Claude Code works exactly like this. Ready to install it for real and start building?"
      }
    ]
  }
];

class TerminalSimulator {
  constructor() {
    this.currentQuest = 0;
    this.currentStep = 0;
    this.totalXP = 0;
    this.commandHistory = [];
    this.historyIndex = -1;
    this.currentPrompt = 'user@mac ~ % ';
    this.isWaitingForInput = false;
    this.typewriterSpeed = 20;

    this.terminalBody = document.getElementById('terminal-body');
    this.inputLine = document.querySelector('.input-line');
    this.inputField = document.getElementById('terminal-input');
    this.promptDisplay = document.getElementById('prompt-display');
    this.instructionText = document.querySelector('.instruction-text');
    this.questTitle = document.querySelector('.quest-name');
    this.questStepInfo = document.querySelector('.quest-step-info');
    this.questBar = document.querySelector('.quest-bar-fill');
    this.questXP = document.querySelector('.quest-xp');
    this.hintBtn = document.getElementById('hint-btn');
    this.skipBtn = document.getElementById('skip-btn');
    this.welcomeOverlay = document.getElementById('welcome-overlay');
    this.welcomeStartBtn = document.getElementById('welcome-start-btn');
    this.characterCreationOverlay = document.getElementById('character-creation-overlay');

    this.wrongAttempts = 0;
    this.autoContinueTimer = null;

    // Initialize avatar system
    this.avatar = new window.AvatarSystem();

    this.loadProgress();
    this.init();
  }

  init() {
    this.inputField.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.inputField.addEventListener('input', () => {
      this.inputLine.classList.add('typing');
    });

    this.terminalBody.addEventListener('click', () => this.inputField.focus());
    document.addEventListener('click', () => {
      if (!document.querySelector('.celebration-overlay.active') &&
          !document.querySelector('.completion-screen.active') &&
          !this.welcomeOverlay.classList.contains('active')) {
        this.inputField.focus();
      }
    });

    // Hint button
    this.hintBtn.addEventListener('click', () => this.showHint());

    // Skip button
    this.skipBtn.addEventListener('click', () => this.skipStep());

    // Welcome overlay
    this.welcomeStartBtn.addEventListener('click', () => {
      this.welcomeOverlay.classList.remove('active');
      this.showCharacterCreation();
    });

    // Character creation
    document.querySelectorAll('.color-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        this.createCharacter(color);
      });
    });

    // Initialize particle system
    this.initParticles();

    // Check if first visit
    const hasVisited = localStorage.getItem('cc101_terminal_visited');
    const hasAvatar = localStorage.getItem('cc101_avatar');

    if (hasVisited && hasAvatar) {
      // Returning user - skip welcome, init avatar
      this.welcomeOverlay.classList.remove('active');
      this.avatar.init('body');
      this.startQuests();
    } else if (hasVisited) {
      // Visited but no avatar - show character creation
      this.welcomeOverlay.classList.remove('active');
      this.showCharacterCreation();
    } else {
      // First time - show welcome modal
      localStorage.setItem('cc101_terminal_visited', 'true');
    }
  }

  initParticles() {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    document.body.appendChild(particleContainer);

    // Generate 40 particles
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random position
      particle.style.left = Math.random() * 100 + '%';

      // Random animation delay
      particle.style.animationDelay = Math.random() * 6 + 's';

      // Random animation duration (4-10s)
      particle.style.animationDuration = (4 + Math.random() * 6) + 's';

      particleContainer.appendChild(particle);
    }
  }

  showCharacterCreation() {
    this.characterCreationOverlay.classList.add('active');
  }

  createCharacter(color) {
    // Hide character creation modal
    this.characterCreationOverlay.classList.remove('active');

    // Create avatar
    this.avatar.createCharacter(color);
    this.avatar.init('body');

    // Show brief introduction then start
    setTimeout(() => {
      this.avatar.showSpeech('Ready for adventure!', 2000);
    }, 500);

    setTimeout(() => {
      this.startQuests();
    }, 2500);
  }

  startQuests() {
    const lines = [
      { text: 'Welcome, adventurer.', class: 'success' },
      { text: '', class: 'output' },
      { text: 'This terminal may look intimidating, but it\'s just a place', class: 'output' },
      { text: 'where you type commands and your computer responds.', class: 'output' },
      { text: '', class: 'output' },
      { text: 'Let\'s begin your first quest...', class: 'success' },
      { text: '', class: 'output' }
    ];

    this.typewriterLines(lines, () => {
      this.startCurrentStep();
    });
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('cc101_terminal_progress');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentQuest = data.currentQuest || 0;
        this.currentStep = data.currentStep || 0;
        this.totalXP = data.totalXP || 0;

        // Restore prompt state based on progress
        if (this.currentQuest < QUESTS.length) {
          const quest = QUESTS[this.currentQuest];
          if (this.currentStep < quest.steps.length) {
            this.currentPrompt = quest.steps[this.currentStep].prompt;
          }
        }
      }
    } catch (e) {
      // Start fresh
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('cc101_terminal_progress', JSON.stringify({
        currentQuest: this.currentQuest,
        currentStep: this.currentStep,
        totalXP: this.totalXP
      }));
    } catch (e) {
      // localStorage unavailable
    }
  }

  showWelcome() {
    const color = this.avatar ? this.avatar.currentColor : 'cyan';
    const colorEmoji = color === 'cyan' ? '🔵' : color === 'gold' ? '🟡' : '🟣';
    const colorName = color === 'cyan' ? 'Cyan' : color === 'gold' ? 'Gold' : 'Purple';

    const lines = [
      { text: '╔══════════════════════════════════════════════════════════════════╗', class: 'success' },
      { text: '║                   CLAUDE CODE (Practice Mode)                   ║', class: 'success' },
      { text: '╚══════════════════════════════════════════════════════════════════╝', class: 'success' },
      { text: '', class: 'output' },
      { text: '┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓', class: 'success' },
      { text: '┃                         YOUR ADVENTURE                          ┃', class: 'success' },
      { text: '┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫', class: 'success' },
      { text: '┃                                                                 ┃', class: 'dim' },
      { text: `┃     ${colorEmoji}  RECRUIT                          XP: 0 / 100      ┃`, class: 'output' },
      { text: '┃     Level 1: Curious Explorer                                   ┃', class: 'output' },
      { text: '┃     Streak: 0 days 🔥                                           ┃', class: 'dim' },
      { text: '┃                                                                 ┃', class: 'dim' },
      { text: '┃ ┌───────────────────────┐  ┌────────────────────────────────┐  ┃', class: 'dim' },
      { text: '┃ │   📊 STATS            │  │   🎯 ACTIVE QUEST              │  ┃', class: 'success' },
      { text: '┃ ├───────────────────────┤  ├────────────────────────────────┤  ┃', class: 'dim' },
      { text: '┃ │  ⚡ Speed: 5          │  │  Quest 1/5                     │  ┃', class: 'output' },
      { text: '┃ │  🎯 Accuracy: 5       │  │  The Blinking Cursor           │  ┃', class: 'output' },
      { text: '┃ │  💡 Creativity: 5     │  │                                │  ┃', class: 'output' },
      { text: '┃ │  ⚙️  Efficiency: 5    │  │  Reward: +10 XP                │  ┃', class: 'dim' },
      { text: '┃ │  ✨ Aura: 0           │  │                                │  ┃', class: 'dim' },
      { text: '┃ └───────────────────────┘  └────────────────────────────────┘  ┃', class: 'dim' },
      { text: '┃                                                                 ┃', class: 'dim' },
      { text: '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛', class: 'success' },
      { text: '', class: 'output' },
      { text: '👋 Hi! I\'m Claude, your AI coding companion.', class: 'success' },
      { text: '', class: 'output' },
      { text: '⚠️  This is PRACTICE MODE - not real Claude Code yet!', class: 'dim' },
      { text: '   Nothing you type affects your computer. Totally safe!', class: 'dim' },
      { text: '', class: 'output' },
      { text: 'Let me teach you the terminal basics. First up: "echo"', class: 'output' },
      { text: 'It makes your computer repeat whatever you tell it.', class: 'output' },
      { text: '', class: 'output' },
      { text: '👉 Type this command below and press Enter:', class: 'success' },
      { text: '', class: 'output' },
      { text: '   echo "hello"', class: 'command-example' },
      { text: '', class: 'output' }
    ];

    this.typewriterLines(lines, () => {
      this.startCurrentStep();
    });
  }

  typewriterLines(lines, callback, index = 0) {
    if (index >= lines.length) {
      if (callback) callback();
      return;
    }

    const line = lines[index];
    const el = document.createElement('div');
    el.className = `terminal-line ${line.class || 'output'}`;
    this.terminalBody.insertBefore(el, this.inputLine);

    if (line.text === '') {
      el.innerHTML = '&nbsp;';
      this.scrollToBottom();
      setTimeout(() => this.typewriterLines(lines, callback, index + 1), 100);
      return;
    }

    let charIndex = 0;
    const typeChar = () => {
      if (charIndex < line.text.length) {
        el.textContent += line.text[charIndex];
        charIndex++;
        this.scrollToBottom();
        setTimeout(typeChar, this.typewriterSpeed);
      } else {
        setTimeout(() => this.typewriterLines(lines, callback, index + 1), 200);
      }
    };
    typeChar();
  }

  startCurrentStep() {
    if (this.currentQuest >= QUESTS.length) {
      this.showCompletion();
      return;
    }

    const quest = QUESTS[this.currentQuest];
    const step = quest.steps[this.currentStep];

    // Reset wrong attempts
    this.wrongAttempts = 0;
    this.hintBtn.disabled = true;

    // Update quest progress UI
    this.updateQuestUI(quest);

    // Update instruction with enhanced formatting
    const enhancedInstruction = this.formatInstruction(step.instruction);
    this.instructionText.innerHTML = enhancedInstruction;

    // Update prompt
    this.currentPrompt = step.prompt;
    this.promptDisplay.textContent = this.currentPrompt;

    // Enable input
    this.isWaitingForInput = true;
    this.inputField.value = '';
    this.inputLine.classList.remove('typing');
    this.inputField.focus();

    this.saveProgress();
  }

  formatInstruction(instruction) {
    // Claude-style format: "Type this → <code>command</code> ← then press ⏎ Enter"
    return instruction
      .replace(/Type:/gi, '👉 Type')
      .replace(/and press Enter/gi, 'then press <span class="enter-key">⏎ Enter</span>');
  }

  updateQuestUI(quest) {
    const questProgress = document.querySelector('.quest-title');
    questProgress.textContent = `QUEST ${quest.id}/5`;
    this.questTitle.textContent = quest.name;
    this.questStepInfo.textContent = `Step ${this.currentStep + 1} of ${quest.steps.length}`;

    const stepProgress = this.currentStep / quest.steps.length;
    this.questBar.style.width = (stepProgress * 100) + '%';
    this.questXP.textContent = `${this.totalXP} XP`;
  }

  handleKeydown(e) {
    if (!this.isWaitingForInput) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const input = this.inputField.value.trim();
      if (input === '') return;
      this.processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.inputField.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputField.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
      } else {
        this.historyIndex = -1;
        this.inputField.value = '';
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      this.addOutputLine(this.currentPrompt + this.inputField.value + '^C', 'output');
      this.inputField.value = '';
    }
  }

  processCommand(input) {
    this.isWaitingForInput = false;
    this.commandHistory.push(input);
    this.historyIndex = -1;

    // Show what they typed
    this.addOutputLine(this.currentPrompt + input, 'output');
    this.inputField.value = '';

    const quest = QUESTS[this.currentQuest];
    const step = quest.steps[this.currentStep];

    // Check if input matches expected (very forgiving)
    const normalizedInput = input.toLowerCase().trim().replace(/\s+/g, ' ');
    const normalizedExpected = step.expected.toLowerCase().trim().replace(/\s+/g, ' ');
    const altMatches = step.altExpected.map(a => a.toLowerCase().trim().replace(/\s+/g, ' '));

    // Also check without quotes for flexibility
    const inputNoQuotes = normalizedInput.replace(/["']/g, '');
    const expectedNoQuotes = normalizedExpected.replace(/["']/g, '');

    if (normalizedInput === normalizedExpected ||
        altMatches.includes(normalizedInput) ||
        inputNoQuotes === expectedNoQuotes) {
      // Mark the input line as correct
      const allUserInputs = this.terminalBody.querySelectorAll('.user-input');
      const lastLine = allUserInputs[allUserInputs.length - 1];
      if (lastLine) {
        lastLine.classList.add('correct');
      }
      this.handleCorrectCommand(step);
    } else {
      this.handleWrongCommand(input, step);
    }
  }

  handleCorrectCommand(step) {
    // Success explosion effect!
    this.createSuccessExplosion();

    // Avatar celebrates!
    if (this.avatar) {
      this.avatar.onCorrectCommand();
    }

    // Show mini XP float (+1 XP per correct command)
    this.showMiniXPFloat('+1 XP', this.inputLine);

    // Show response with typewriter effect
    if (step.response) {
      const responseLines = step.response.split('\n');
      responseLines.forEach(line => {
        this.addOutputLine(line || ' ', 'output');
      });
    }

    // Show explanation
    setTimeout(() => {
      this.addOutputLine('', 'output');
      this.addOutputLine(step.explanation, 'explanation');
      this.addOutputLine('', 'output');

      // Update prompt if changed
      if (step.newPrompt) {
        this.currentPrompt = step.newPrompt;
      }

      // Advance step
      this.currentStep++;

      const quest = QUESTS[this.currentQuest];
      if (this.currentStep >= quest.steps.length) {
        // Quest complete!
        this.completeQuest(quest);
      } else {
        // Next step
        setTimeout(() => this.startCurrentStep(), 500);
      }

      this.scrollToBottom();
    }, 300);
  }

  handleWrongCommand(input, step) {
    this.wrongAttempts++;

    // Avatar shows confusion
    if (this.avatar) {
      this.avatar.onWrongCommand();
    }

    // Enable hint button after 1 wrong attempt
    if (this.wrongAttempts >= 1) {
      this.hintBtn.disabled = false;
    }

    // Friendly hint - more encouraging on multiple attempts
    let hint;
    if (this.wrongAttempts === 1) {
      hint = `Not quite! Try typing: ${step.expected}`;
    } else if (this.wrongAttempts === 2) {
      hint = `Almost there! Copy this exactly: ${step.expected}`;
    } else {
      hint = `No worries! Just type: ${step.expected} (or click "Hint" for help)`;
    }

    setTimeout(() => {
      this.addOutputLine(hint, 'explanation');
      this.addOutputLine('', 'output');
      this.isWaitingForInput = true;
      this.inputField.focus();
      this.scrollToBottom();
    }, 200);
  }

  showHint() {
    if (this.currentQuest >= QUESTS.length) return;

    const quest = QUESTS[this.currentQuest];
    const step = quest.steps[this.currentStep];

    // Show a helpful hint overlay
    this.addOutputLine('', 'output');
    this.addOutputLine(`💡 HINT: Type exactly as shown: ${step.expected}`, 'success');
    this.addOutputLine('Then press Enter!', 'explanation');
    this.addOutputLine('', 'output');
    this.scrollToBottom();
  }

  skipStep() {
    if (!confirm('Skip this step? You\'ll still learn it, just won\'t get the practice.')) {
      return;
    }

    this.addOutputLine('', 'output');
    this.addOutputLine('⏭️  Skipped! Moving on...', 'success');
    this.addOutputLine('', 'output');

    // Advance step
    this.currentStep++;

    const quest = QUESTS[this.currentQuest];
    if (this.currentStep >= quest.steps.length) {
      // Quest complete!
      this.completeQuest(quest);
    } else {
      // Next step
      setTimeout(() => this.startCurrentStep(), 800);
    }
  }

  completeQuest(quest) {
    this.totalXP += quest.xpReward;
    this.currentQuest++;
    this.currentStep = 0;
    this.saveProgress();

    // Avatar celebrates quest complete
    if (this.avatar) {
      this.avatar.onQuestComplete();

      // Check for evolution
      this.avatar.checkEvolution(this.totalXP, this.currentQuest);
    }

    // Show XP float
    this.showXPFloat(quest.xpReward);

    // Update quest bar to full
    this.questBar.style.width = '100%';
    this.questXP.textContent = `${this.totalXP} XP`;

    // Show celebration
    setTimeout(() => {
      this.showCelebration(quest);
    }, 800);
  }

  showCelebration(quest) {
    const overlay = document.getElementById('celebration-overlay');
    const title = overlay.querySelector('.celebration-title');
    const message = overlay.querySelector('.celebration-message');
    const xp = overlay.querySelector('.celebration-xp');
    const btn = overlay.querySelector('.celebration-btn');
    const autoTimer = document.getElementById('auto-timer');

    // Calculate level and show progression
    const level = Math.floor(this.totalXP / 100) + 1;
    const nextLevelXP = level * 100;
    const progress = this.totalXP % 100;

    title.textContent = `QUEST ${quest.id} COMPLETE!`;
    message.innerHTML = `
      ${quest.name}<br>
      <span style="font-size: 0.9rem; color: var(--term-dim); margin-top: 0.5rem; display: block;">
        Level ${level} | ${this.totalXP}/${nextLevelXP} XP | Quest ${this.currentQuest}/5
      </span>
    `;
    xp.textContent = `+${quest.xpReward} XP`;

    overlay.classList.add('active');

    // Auto-continue countdown
    let countdown = 5;
    autoTimer.textContent = countdown;

    this.autoContinueTimer = setInterval(() => {
      countdown--;
      autoTimer.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(this.autoContinueTimer);
        handleContinue();
      }
    }, 1000);

    const handleContinue = () => {
      clearInterval(this.autoContinueTimer);
      overlay.classList.remove('active');
      btn.removeEventListener('click', handleContinue);

      if (this.currentQuest >= QUESTS.length) {
        this.showCompletion();
      } else {
        // Brief pause then start next quest
        this.addOutputLine('', 'output');
        this.addOutputLine(`--- Quest ${this.currentQuest + 1}: ${QUESTS[this.currentQuest].name} ---`, 'success');
        this.addOutputLine('', 'output');
        setTimeout(() => this.startCurrentStep(), 500);
      }
    };

    btn.addEventListener('click', handleContinue);
  }

  showXPFloat(amount) {
    const float = document.createElement('div');
    float.className = 'xp-float';
    float.textContent = `+${amount} XP`;
    float.style.left = '50%';
    float.style.top = '50%';
    float.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(float);
    setTimeout(() => float.remove(), 1500);
  }

  showMiniXPFloat(text, element) {
    const rect = element.getBoundingClientRect();
    const float = document.createElement('div');
    float.className = 'mini-xp-float';
    float.textContent = text;
    float.style.left = rect.right + 20 + 'px';
    float.style.top = rect.top + 'px';
    document.body.appendChild(float);
    setTimeout(() => float.remove(), 1000);
  }

  createSuccessExplosion() {
    // Create particle burst from input line
    const rect = this.inputLine.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create 12 particles radiating outward
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'success-particle';

      // Random color (cyan, gold, or purple)
      const colors = ['#4fc3f7', '#ffd700', '#bb86fc'];
      const color = colors[i % 3];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 10px ${color}`;

      // Position at center
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';

      // Calculate angle for this particle
      const angle = (i / 12) * Math.PI * 2;
      const distance = 60 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 600);
    }

    // Screen flash
    const flash = document.createElement('div');
    flash.className = 'success-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);
  }

  showCompletion() {
    this.isWaitingForInput = false;
    const screen = document.getElementById('completion-screen');
    screen.classList.add('active');

    // Update final XP
    const xpDisplay = screen.querySelector('.completion-stat-value');
    if (xpDisplay) xpDisplay.textContent = this.totalXP;

    // Init copy buttons
    screen.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.previousElementSibling?.textContent ||
                     btn.closest('.code-block')?.querySelector('code')?.textContent;
        if (code) {
          navigator.clipboard.writeText(code.trim()).then(() => {
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.textContent = 'Copy';
              btn.classList.remove('copied');
            }, 2000);
          });
        }
      });
    });

    // Clear saved progress (they completed it)
    localStorage.removeItem('cc101_terminal_progress');
  }

  addOutputLine(text, className = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.textContent = text || '\u00A0';
    this.terminalBody.insertBefore(line, this.inputLine);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if user has completed all quests
  try {
    const saved = localStorage.getItem('cc101_terminal_progress');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.currentQuest >= QUESTS.length) {
        // Already completed - show completion screen directly
        document.getElementById('completion-screen').classList.add('active');
        return;
      }
    }
  } catch (e) {}

  new TerminalSimulator();
});
