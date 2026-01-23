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
        explanation: "Your computer just talked back! 'echo' repeats whatever you type after it."
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Now type: <code>echo "I am learning"</code>',
        expected: 'echo "I am learning"',
        altExpected: ["echo 'I am learning'", 'echo I am learning'],
        response: 'I am learning',
        explanation: "You're giving commands and the computer obeys. That's ALL a terminal is."
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
        explanation: "This is your location in the computer. Like GPS for files."
      },
      {
        prompt: 'user@mac ~ % ',
        instruction: 'Type: <code>ls</code> (list what\'s here)',
        expected: 'ls',
        altExpected: [],
        response: 'Desktop  Documents  Downloads  projects',
        explanation: "These are folders around you. Like rooms you can walk into."
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
        explanation: "This is Claude Code - an AI that lives in your terminal. It can read, write, and understand code."
      },
      {
        prompt: 'claude> ',
        instruction: 'Ask Claude: <code>What folder are we in?</code>',
        expected: 'What folder are we in?',
        altExpected: ['what folder are we in', 'where are we', 'pwd', 'what folder are we in?'],
        response: "You're currently in /Users/you/my-project\n\nThis is an empty directory - ready for you to build something!",
        isClaudeMode: true,
        explanation: "Claude can see your file system! It knows exactly where you are and what files exist."
      },
      {
        prompt: 'claude> ',
        instruction: 'Type: <code>Create a file called hello.txt</code>',
        expected: 'Create a file called hello.txt',
        altExpected: ['create a file called hello.txt', 'make a file called hello.txt', 'create hello.txt'],
        response: "\u2713 Created hello.txt with content:\n  \"Hello! This is your first file.\"\n\nThe file has been saved to /Users/you/my-project/hello.txt",
        isClaudeMode: true,
        explanation: "Claude just created a real file for you. No complicated commands needed - just plain English."
      },
      {
        prompt: 'claude> ',
        instruction: 'Type: <code>/exit</code> to leave Claude',
        expected: '/exit',
        altExpected: ['exit', 'quit', '/quit'],
        response: '\nGoodbye! Happy coding.\n',
        isClaudeMode: false,
        explanation: "Now imagine doing this with REAL projects... websites, apps, games. That's what awaits you."
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
    this.questBar = document.querySelector('.quest-bar-fill');
    this.questXP = document.querySelector('.quest-xp');

    this.loadProgress();
    this.init();
  }

  init() {
    this.inputField.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.terminalBody.addEventListener('click', () => this.inputField.focus());
    document.addEventListener('click', () => {
      if (!document.querySelector('.celebration-overlay.active') &&
          !document.querySelector('.completion-screen.active')) {
        this.inputField.focus();
      }
    });

    this.showWelcome();
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
    const lines = [
      { text: 'Welcome, adventurer.', class: 'success' },
      { text: '', class: 'output' },
      { text: 'This is a terminal. It looks scary, but it\'s just a place', class: 'output' },
      { text: 'where you type commands and your computer responds.', class: 'output' },
      { text: '', class: 'output' },
      { text: 'No clicking. No menus. Just you and the blinking cursor.', class: 'output' },
      { text: '', class: 'output' },
      { text: 'Let\'s begin your first quest...', class: 'success' },
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

    // Update quest progress UI
    this.updateQuestUI(quest);

    // Update instruction
    this.instructionText.innerHTML = step.instruction;

    // Update prompt
    this.currentPrompt = step.prompt;
    this.promptDisplay.textContent = this.currentPrompt;

    // Enable input
    this.isWaitingForInput = true;
    this.inputField.value = '';
    this.inputField.focus();

    this.saveProgress();
  }

  updateQuestUI(quest) {
    const questProgress = document.querySelector('.quest-title');
    questProgress.textContent = `QUEST ${quest.id}/5`;
    this.questTitle.textContent = quest.name;

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

    // Check if input matches expected
    const normalizedInput = input.toLowerCase().trim();
    const normalizedExpected = step.expected.toLowerCase().trim();
    const altMatches = step.altExpected.map(a => a.toLowerCase().trim());

    if (normalizedInput === normalizedExpected || altMatches.includes(normalizedInput)) {
      this.handleCorrectCommand(step);
    } else {
      this.handleWrongCommand(input, step);
    }
  }

  handleCorrectCommand(step) {
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
    // Friendly hint
    const hints = [
      `Hmm, not quite. Try typing: ${step.expected}`,
      `Close! The command is: ${step.expected}`,
      `Nice try! For this quest, type exactly: ${step.expected}`
    ];
    const hint = hints[Math.floor(Math.random() * hints.length)];

    setTimeout(() => {
      this.addOutputLine(hint, 'explanation');
      this.addOutputLine('', 'output');
      this.isWaitingForInput = true;
      this.inputField.focus();
      this.scrollToBottom();
    }, 200);
  }

  completeQuest(quest) {
    this.totalXP += quest.xpReward;
    this.currentQuest++;
    this.currentStep = 0;
    this.saveProgress();

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

    title.textContent = `QUEST ${quest.id} COMPLETE!`;
    message.textContent = quest.name;
    xp.textContent = `+${quest.xpReward} XP`;

    overlay.classList.add('active');

    const handleContinue = () => {
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
