# Web Integration Plan

Two awesome features to connect the terminal game with the web experience.

---

## Feature 1: Live Backend Sync & Web Features

### What It Does

As you complete tasks in Claude Code (terminal), your progress syncs to the cloud. Your web profile updates in real-time with stats, badges, and current progress. Leaderboards show global rankings. Celebration feed shows recent achievements.

### Tech Stack

**Recommended: Supabase (PostgreSQL + Real-time)**
- Free tier: 500MB database, 2GB bandwidth/month
- Real-time subscriptions (WebSocket-based)
- Built-in auth
- Row-level security
- Easy SDK for JavaScript

**Alternative: Firebase Realtime Database**
- Free tier: 1GB storage, 10GB bandwidth/month
- Simpler for real-time
- No SQL learning curve

### Database Schema

**players table:**
```sql
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  class TEXT,
  level INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,

  -- Stats
  speed INTEGER DEFAULT 5,
  accuracy INTEGER DEFAULT 5,
  creativity INTEGER DEFAULT 5,
  efficiency INTEGER DEFAULT 5,
  aura INTEGER DEFAULT 0,

  -- Aura system
  aura_total_earned INTEGER DEFAULT 0,
  aura_current_balance INTEGER DEFAULT 0,
  glow_level TEXT DEFAULT 'none',
  reputation_rank TEXT DEFAULT 'Unknown',

  -- Progress
  current_module INTEGER DEFAULT 1,
  current_lesson INTEGER DEFAULT 1,
  current_task INTEGER DEFAULT 1,

  -- Cosmetics
  character_skin TEXT DEFAULT 'skin_default',
  aura_color TEXT DEFAULT 'aura_white',
  terminal_theme TEXT DEFAULT 'theme_classic',

  -- Meta
  badges JSONB DEFAULT '[]',
  completed_modules JSONB DEFAULT '[]',
  last_online TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),

  -- Privacy
  public_profile BOOLEAN DEFAULT true,
  show_on_leaderboard BOOLEAN DEFAULT true,
  anonymous_mode BOOLEAN DEFAULT false
);

CREATE INDEX idx_players_leaderboard ON players (total_xp DESC, level DESC);
CREATE INDEX idx_players_class ON players (class);
```

**achievements_feed table:**
```sql
CREATE TABLE achievements_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id),
  username TEXT NOT NULL,
  achievement_type TEXT NOT NULL, -- 'level_up', 'module_complete', 'badge_earned'
  achievement_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_achievements_recent ON achievements_feed (created_at DESC);
```

### Terminal → Cloud Sync

**When to sync:**
- Task complete (lightweight - just XP/stats)
- Lesson complete (moderate)
- Module complete (full sync + badges)
- Level up (full sync)
- Cosmetic purchase (immediate)

**Sync implementation in CLAUDE.md:**

Add to Section 9 (Awarding XP):

```javascript
// After writing progress.json locally
if (progress.sync_settings.enabled) {
  await syncToSupabase({
    username: progress.student.name,
    level: progress.student.level,
    total_xp: progress.student.total_xp,
    stats: progress.stats,
    aura_total_earned: progress.aura_system.total_earned,
    current_module: progress.current_position.module,
    badges: progress.badges,
    last_online: new Date().toISOString()
  });
}
```

**Supabase client setup:**

File: `web/js/supabase-sync.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function syncProgress(progressData) {
  const { data, error } = await supabase
    .from('players')
    .upsert({
      username: progressData.username,
      ...progressData,
      last_online: new Date().toISOString()
    }, {
      onConflict: 'username'
    })

  if (error) console.error('Sync failed:', error)
  return data
}

export async function getLeaderboard(limit = 100) {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('show_on_leaderboard', true)
    .order('total_xp', { ascending: false })
    .limit(limit)

  return data
}

export async function subscribeToAchievements(callback) {
  const channel = supabase
    .channel('achievements')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'achievements_feed'
    }, callback)
    .subscribe()

  return channel
}
```

### Web Features to Build

#### 1. Profile Page (`web/profile.html`)

**Features:**
- Character avatar (current stage, color, equipped cosmetics)
- Stats visualization (progress bars or radar chart)
- Badge gallery (earned + locked)
- Current progress ("Working on Module 8")
- Last online timestamp
- Share button (Twitter, Discord)

**Real-time updates:**
- Subscribe to player's row in Supabase
- Update UI when XP/level changes
- Celebration animation when they level up (even if not on the page)

#### 2. Leaderboard (`web/leaderboard.html`)

**Features:**
- Top 100 global
- Filter by class (Gigachad, Sigma, etc.)
- Filter by timeframe (all-time, weekly, monthly)
- Your rank highlighted
- Click username → view their profile

**Real-time:**
- Updates every 10 seconds
- Smooth rank transitions (animated position changes)

#### 3. Live Celebration Feed (on `index.html`)

**Features:**
- Scrolling feed of recent achievements
- "🎉 Sarah just reached Level 7!"
- "💪 Mike completed Module 9!"
- Avatar icons next to names
- Click to view their profile
- Auto-scroll (newest at top)

**Implementation:**
```javascript
// Subscribe to new achievements
supabase
  .channel('feed')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'achievements_feed'
  }, (payload) => {
    addCelebrationToFeed(payload.new)
  })
  .subscribe()
```

#### 4. Cohort Challenges (Future)

**Features:**
- Weekly challenges (e.g., "Complete 5 lessons this week")
- Team leaderboards (if multiple people sign up together)
- Bonus rewards for cohort completion
- Social pressure in a fun way

### Privacy & Opt-in Flow

**First launch (after M1.L1.T1):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 CONNECT TO THE WEB?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Want to sync your progress to the web?

✅ Get a public profile page
✅ Appear on global leaderboards
✅ See celebration feed
✅ (Future) Join cohort challenges

You can disable this anytime in settings.

[Yes, sync my progress] [No thanks, local only]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Settings:**
- `/sync enable` - Turn on syncing
- `/sync disable` - Turn off (deletes cloud data)
- `/sync public` - Public profile (default)
- `/sync private` - Profile hidden, no leaderboard
- `/sync anonymous` - Show username only, hide real name

---

## Feature 2: AI Helper in Web Terminal

### What It Does

Adds a "💬 Ask Claude" button to the web terminal simulator. Users can ask questions about commands, get unstuck during setup, or troubleshoot errors - all without leaving the browser.

### UI Design

**Button placement:**
- Top-right corner of terminal window
- Always visible
- Badge with "Help" on hover

**Chat modal:**
- Slides in from right side
- Persistent during session
- Minimizable (collapses to button)
- Shows conversation history

**Example interaction:**

```
You: What does pwd do?

Claude: pwd stands for "Print Working Directory" - it shows you where you are in your computer's file system.

Think of it like GPS coordinates for files! When you type pwd, it tells you the full path to your current folder.

Try it in the terminal above - just type: pwd

You: ok I tried it and it shows /Users/you

Claude: Perfect! That's your home directory - the main folder for your user account. All your files (Documents, Desktop, Downloads) live inside this folder.

Now try ls to see what's in here!
```

### Implementation

#### 1. Add Chat UI to `web/terminal.html`

```html
<!-- AI Helper Button -->
<button class="ai-helper-btn" id="ai-helper-btn">
  💬 Ask Claude
</button>

<!-- AI Helper Modal -->
<div class="ai-helper-modal" id="ai-helper-modal">
  <div class="ai-helper-header">
    <h3>🤖 Claude's Here to Help</h3>
    <button class="ai-helper-close" id="ai-helper-close">✕</button>
  </div>
  <div class="ai-helper-messages" id="ai-helper-messages">
    <!-- Messages render here -->
    <div class="ai-message">
      <strong>Claude:</strong> Hi! I'm here to help you learn. Ask me anything about the commands or if you get stuck!
    </div>
  </div>
  <div class="ai-helper-input">
    <input type="text" id="ai-helper-input-field" placeholder="Ask a question...">
    <button id="ai-helper-send">Send</button>
  </div>
</div>
```

#### 2. Anthropic API Integration

**Backend proxy (required for API key security):**

You'll need a simple server to proxy requests (can't expose API key in browser).

**Option A: Vercel Serverless Function**

File: `api/chat.js`

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, context } = req.body

  // Build context-aware prompt
  const systemPrompt = `You are Claude, a helpful AI assistant guiding complete beginners through learning the terminal and Claude Code.

The user is currently in the web practice portal, learning basic terminal commands through a browser simulator.

Context:
- Current quest: ${context.currentQuest}
- Commands learned: ${context.commandsLearned.join(', ')}
- Last command typed: ${context.lastCommand}

Guidelines:
- Be warm, encouraging, patient
- Explain in plain language (no jargon without explanation)
- Keep responses concise (2-3 sentences max)
- Reference the terminal above when suggesting they try commands
- If they're stuck, break it down into smaller steps
`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022', // Fast + cheap for quick questions
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      system: systemPrompt
    })
  })

  const data = await response.json()
  const reply = data.content[0].text

  res.status(200).json({ reply })
}
```

**Option B: Cloudflare Worker (also free tier)**

Same logic, deploy to Cloudflare instead.

#### 3. Frontend Client

File: `web/js/ai-helper.js`

```javascript
class AIHelper {
  constructor() {
    this.modal = document.getElementById('ai-helper-modal')
    this.btn = document.getElementById('ai-helper-btn')
    this.messages = document.getElementById('ai-helper-messages')
    this.input = document.getElementById('ai-helper-input-field')
    this.sendBtn = document.getElementById('ai-helper-send')

    this.conversationHistory = []
    this.setupEventListeners()
  }

  setupEventListeners() {
    this.btn.addEventListener('click', () => this.open())
    this.sendBtn.addEventListener('click', () => this.sendMessage())
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage()
    })
  }

  open() {
    this.modal.classList.add('active')
    this.input.focus()
  }

  async sendMessage() {
    const message = this.input.value.trim()
    if (!message) return

    // Add user message to UI
    this.addMessage('user', message)
    this.input.value = ''

    // Show typing indicator
    this.showTyping()

    try {
      // Get context from terminal state
      const context = {
        currentQuest: window.terminalSim?.currentQuest || 'Quest 1',
        commandsLearned: window.terminalSim?.commandsLearned || [],
        lastCommand: window.terminalSim?.lastCommand || 'none'
      }

      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
      })

      const { reply } = await response.json()

      // Remove typing, add Claude's response
      this.hideTyping()
      this.addMessage('claude', reply)

    } catch (error) {
      this.hideTyping()
      this.addMessage('claude', 'Sorry, I had trouble connecting. Try again?')
    }
  }

  addMessage(sender, text) {
    const div = document.createElement('div')
    div.className = `ai-message ${sender}-message`
    div.innerHTML = sender === 'claude'
      ? `<strong>Claude:</strong> ${text}`
      : `<strong>You:</strong> ${text}`

    this.messages.appendChild(div)
    this.messages.scrollTop = this.messages.scrollHeight
  }

  showTyping() {
    const typing = document.createElement('div')
    typing.className = 'ai-typing'
    typing.id = 'ai-typing-indicator'
    typing.innerHTML = '<strong>Claude:</strong> <span class="typing-dots">...</span>'
    this.messages.appendChild(typing)
  }

  hideTyping() {
    const typing = document.getElementById('ai-typing-indicator')
    if (typing) typing.remove()
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.aiHelper = new AIHelper()
})
```

#### 4. CSS Styling

File: `web/css/terminal.css` (append)

```css
/* AI Helper Button */
.ai-helper-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(79, 195, 247, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
}

.ai-helper-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(79, 195, 247, 0.6);
}

/* AI Helper Modal */
.ai-helper-modal {
  position: fixed;
  right: -400px;
  top: 0;
  bottom: 0;
  width: 400px;
  background: #1a1a2e;
  border-left: 2px solid var(--accent);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;
}

.ai-helper-modal.active {
  right: 0;
}

.ai-helper-header {
  padding: 1.5rem;
  background: rgba(79, 195, 247, 0.1);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-helper-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.ai-message {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  line-height: 1.6;
  font-size: 0.9rem;
}

.user-message {
  background: rgba(79, 195, 247, 0.1);
  border-left: 3px solid var(--accent);
}

.claude-message {
  background: rgba(129, 199, 132, 0.1);
  border-left: 3px solid #81c784;
}

.ai-helper-input {
  padding: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 0.5rem;
}

.ai-helper-input input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-family: inherit;
}

.ai-helper-input button {
  background: var(--accent);
  color: #0a0a0f;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.typing-dots {
  display: inline-block;
  animation: typing 1.5s infinite;
}

@keyframes typing {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}
```

### Cost Estimation

**Haiku API pricing:**
- Input: $0.25 per million tokens
- Output: $1.25 per million tokens

**Typical interaction:**
- Input: ~200 tokens (system prompt + context + question)
- Output: ~100 tokens (concise answer)
- Cost per interaction: ~$0.00015 (less than 1/100th of a cent)

**Monthly estimate:**
- 1,000 users
- 5 questions each
- Total: 5,000 interactions
- Cost: ~$0.75/month

Extremely affordable!

---

## Implementation Priority

**Phase 1: AI Helper (Ship First)**
- Immediate value for stuck users
- Low complexity (just API proxy + chat UI)
- Cheap to run
- Can launch this week

**Phase 2: Basic Sync**
- Supabase setup
- Simple profile page
- Leaderboard

**Phase 3: Real-time Features**
- Live celebration feed
- Real-time profile updates
- WebSocket subscriptions

**Phase 4: Advanced Social**
- Cohort challenges
- Team leaderboards
- Achievement sharing

---

## Security Considerations

**API Keys:**
- Never expose Anthropic API key in browser
- Use serverless function proxy
- Rate limit (max 10 questions per session)

**Sync:**
- Supabase Row-Level Security policies
- Users can only update their own data
- Anonymous mode hides sensitive info

**Privacy:**
- GDPR compliance (allow data deletion)
- Opt-in for public profiles
- Clear privacy policy

---

## Next Steps

Ready to build? I can help with:

1. **Set up Supabase project** - Create database schema, configure RLS
2. **Build AI helper** - Implement chat UI + API proxy
3. **Create profile page** - Design & implement with live data
4. **Add sync to CLAUDE.md** - Modify game loop to sync progress

Which would you like to tackle first?
