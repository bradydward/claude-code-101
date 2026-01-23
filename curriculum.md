# Claude Code 101 - Full Curriculum

Every task teaches a real Claude Code or terminal skill. Zero filler. Each lesson has a `stat_tag` indicating which stat it grows.

---

## Module 1: Getting Into the Terminal
**Stat Tag: Speed** | **Badge: Terminal Explorer 🏆**

This module gets you from "I have a laptop" to "I can use the terminal."

### Lesson 1.1: Opening Your Terminal
- Task 1: On your Mac, press `Cmd + Space` to open Spotlight search
- Task 2: Type "Terminal" and press Enter
- Task 3: A window appears with a blinking cursor - this is your terminal (a way to talk to your computer by typing)
- Task 4: Type `echo "hello"` and press Enter - your computer talks back

### Lesson 1.2: Understanding Where You Are
- Task 1: Type `pwd` and press Enter (pwd = "print working directory" = "where am I?")
- Task 2: Read the result - it's a path like `/Users/brady` - this is your home folder
- Task 3: Type `ls` and press Enter (ls = "list" = "what's here?")
- Task 4: You just learned two commands: `pwd` shows where you are, `ls` shows what's around you

### Lesson 1.3: Moving Around
- Task 1: Type `ls` - find a folder name in the list (like "Desktop" or "Documents")
- Task 2: Type `cd Desktop` and press Enter (cd = "change directory" = "go to folder")
- Task 3: Type `pwd` to confirm you moved - see how the path changed?
- Task 4: Type `cd ..` to go back up one level (the `..` means "parent folder")
- Task 5: Type `pwd` to confirm you're back home

### Lesson 1.4: Creating Your Project Folder
- Task 1: Type `cd ~/Developer` to go to your Developer folder (or `mkdir ~/Developer && cd ~/Developer` if it doesn't exist)
- Task 2: Type `mkdir projects` to create a "projects" folder
- Task 3: Type `cd projects` to go inside it
- Task 4: Type `mkdir "Claude Code 101"` to create your project folder
- Task 5: Type `cd "Claude Code 101"` - this is your home base for the entire course

### Lesson 1.5: Terminal Survival Kit
- Task 1: Press the Up Arrow key - your last command reappears (you can scroll through history)
- Task 2: Start typing `pw` then press Tab - it autocompletes to `pwd` (Tab = autocomplete)
- Task 3: Type `echo "test"` and while it's showing, press `Ctrl + C` - this stops things
- Task 4: Type `clear` to clean the screen (or press `Ctrl + L`)
- Task 5: Remember: `Ctrl + C` in terminal = STOP (not copy!). `Cmd + C` = copy on Mac.

**Module 1 Complete: Terminal Explorer 🏆 | +200 XP | +3 Speed | +10 Aura**

---

## Module 2: Installing Claude Code
**Stat Tag: Efficiency** | **Badge: Setup Champion 🏆**

### Lesson 2.1: Getting Your API Key
- Task 1: Open your browser and go to `console.anthropic.com`
- Task 2: Create an account or sign in
- Task 3: Find "API Keys" in the menu
- Task 4: Click "Create Key" and give it a name like "claude-code"
- Task 5: Copy the key and save it somewhere safe (you'll need it in 2 minutes)
- Task 6: This key is like a password that lets Claude Code connect to Claude's brain

### Lesson 2.2: Installing Claude Code
- Task 1: Go back to your terminal (should be in your Claude Code 101 folder - check with `pwd`)
- Task 2: Type `npm install -g @anthropic-ai/claude-code` and press Enter
- Task 3: Wait for it to finish (you'll see text scrolling - that's normal)
- Task 4: If you see an error about "npm not found", type `brew install node` first, then retry step 2
- Task 5: When done, type `claude --version` - if you see a version number, it worked!

### Lesson 2.3: First Launch
- Task 1: Make sure you're in your project folder: `cd ~/Developer/projects/"Claude Code 101"`
- Task 2: Type `claude` and press Enter
- Task 3: It will ask for your API key - paste it in (Cmd+V)
- Task 4: You're in Claude Code! Type "hello" and see it respond
- Task 5: You just launched an AI that can control your computer. You're officially in.

**Module 2 Complete: Setup Champion 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 3: Your First Conversations + CLASS SELECTION
**Stat Tag: Creativity** | **Badge: First Contact 🏆**

### Lesson 3.1: Talking to Claude Code
- Task 1: In Claude Code, type "What folder are we in right now?" - Claude can see your system
- Task 2: Type "What files are in this folder?" - Claude checks for you
- Task 3: Type "What is the weather like?" - notice Claude Code is about YOUR COMPUTER, not general chat
- Task 4: The difference from ChatGPT/Claude.ai: Claude Code can actually DO things on your computer

### Lesson 3.2: Creating Files Through Conversation
- Task 1: Type "Create a file called hello.txt with the text 'My first file created by AI' inside"
- Task 2: Claude will ask permission to create the file - type 'y' to approve
- Task 3: Type "Show me what's in hello.txt" to verify it worked
- Task 4: Exit Claude Code (type `/exit` or press Ctrl+C twice), then type `ls` to see the file exists
- Task 5: You just created a real file through conversation. This is the power of Claude Code.

### Lesson 3.3: Specific vs. Vague Prompts
- Task 1: Start Claude Code again (`claude`) and type "Make a webpage" - notice the generic result
- Task 2: Now type "Create a file called test.html with a blue background, white text, the title 'Hello World' in a big heading, and a paragraph saying 'I made this with Claude Code'"
- Task 3: Compare the results - specific prompts = better output every time
- Task 4: Type "Open test.html in my browser" (Claude will use the `open` command)
- Task 5: You can see your webpage! Specific instructions create specific results.

### Lesson 3.4: CLASS SELECTION EVENT
- Task 1: Read about the 6 character classes that will shape your learning journey
- Task 2: Think about what excites you most: Building? Speed? Flex? Chaos? Fun? Mastery?
- Task 3: Choose your class (your teacher will present the options)
- Task 4: Celebrate! You now have a character class with unique bonuses and a skill tree to unlock

**Module 3 Complete: First Contact 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 4: Claude Code Models - Choose Your Power Level
**Stat Tag: Efficiency** | **Badge: Model Master 🏆**

### Lesson 4.1: What Are Models?
- Task 1: In Claude Code, type `/model` to see your current model
- Task 2: Claude has different "brains" called models - think of them like difficulty levels in a game
- Task 3: Type "What model are you using right now?" and note the answer
- Task 4: The three main models: Haiku (fast/cheap), Sonnet (balanced), Opus (powerful/expensive)

### Lesson 4.2: Haiku - The Speed Demon
- Task 1: Type `/model haiku` to switch to Haiku (or the equivalent command for your version)
- Task 2: Ask it "What is a terminal?" and notice how fast the response comes
- Task 3: Ask it "Create a simple Python hello world script" - quick and simple tasks are Haiku's strength
- Task 4: Haiku = fast answers, simple tasks, costs less. Like asking a quick question to a friend.

### Lesson 4.3: Sonnet - The All-Rounder
- Task 1: Type `/model sonnet` to switch to Sonnet
- Task 2: Ask it "Explain what an API key is and why it matters, in simple terms"
- Task 3: Notice the response is more detailed and thoughtful than Haiku
- Task 4: Ask it "Create an HTML page with CSS styling for a personal portfolio" - Sonnet handles medium complexity well
- Task 5: Sonnet = the default choice. Good at most things. Your daily driver.

### Lesson 4.4: Opus - The Powerhouse
- Task 1: Type `/model opus` to switch to Opus (this is the most powerful and expensive)
- Task 2: Ask it "Design a complete file structure for a blog website with categories, posts, and user accounts"
- Task 3: Notice the depth and architecture-level thinking
- Task 4: Opus = complex problems, architecture, big-picture thinking. Use when quality matters most.
- Task 5: Switch back to Sonnet (`/model sonnet`) for normal use - it's the best balance

**Module 4 Complete: Model Master 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 5: Writing Prompts Like a Pro
**Stat Tag: Creativity** | **Badge: Prompt Engineer 🏆**

### Lesson 5.1: Context Is King
- Task 1: Type "Fix the bug" - Claude can't help because it has no context
- Task 2: Now type "Look at hello.txt and tell me if there are any spelling mistakes"
- Task 3: The difference: Claude needs to know WHAT you're talking about
- Task 4: Rule #1: Always give Claude context - what file, what project, what you're trying to do
- Task 5: Practice: Ask Claude to "look at the files in this folder and describe what this project is"

### Lesson 5.2: Multi-Step Instructions
- Task 1: Type "Create a folder called 'practice', put a file called 'notes.md' inside it with a heading 'My Notes' and three bullet points about what I've learned so far"
- Task 2: Watch Claude handle all three steps in order
- Task 3: Verify: type `ls practice` and `cat practice/notes.md` (or ask Claude to show you)
- Task 4: You can give Claude complex multi-step tasks and it figures out the order
- Task 5: Clean up: ask Claude to "delete the practice folder and everything in it"

### Lesson 5.3: Iterating on Responses
- Task 1: Ask Claude "Create a README.md for a project called 'My First App'"
- Task 2: Read the result - find something you'd change (too long? wrong tone? missing info?)
- Task 3: Tell Claude what to fix: "Make the description shorter" or "Add a section about installation"
- Task 4: You don't need to start over - just tell Claude what to adjust
- Task 5: Delete the test README when done: ask Claude to "remove README.md" (say no if it asks about YOUR project's readme)

### Lesson 5.4: Prompt Templates
- Task 1: Learn this pattern: "I want to [goal]. The context is [situation]. Please [specific action]."
- Task 2: Practice: "I want to organize my project files. The context is I have a Claude Code 101 folder with learning files. Please suggest a file structure."
- Task 3: Another pattern: "Look at [file] and [action]. Keep [constraint]."
- Task 4: Practice: "Look at hello.txt and rewrite it to sound more professional. Keep it under 2 sentences."
- Task 5: Templates save time - you'll develop your own patterns as you go

### Lesson 5.5: Advanced Prompting Patterns
- Task 1: The "show your work" pattern: "Create a simple HTML page. Explain each line as you write it."
- Task 2: The "options" pattern: "Give me 3 different ways to structure a personal website. Pros and cons of each."
- Task 3: The "constraints" pattern: "Write a CSS file for hello.html. Only use 3 colors. No frameworks."
- Task 4: The "review" pattern: "Look at test.html and rate it 1-10 on code quality. Explain why and suggest improvements."
- Task 5: You now have 4 power patterns. Use them anytime you're stuck on what to ask.

**Module 5 Complete: Prompt Engineer 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 6: Plan Mode - Safe Exploration
**Stat Tag: Accuracy** | **Badge: Plan Mode Pro 🏆**

### Lesson 6.1: What Is Plan Mode?
- Task 1: Type `/plan` to enter plan mode (Claude Code won't make changes - only shows what it WOULD do)
- Task 2: Type "Reorganize all files in this folder into subfolders by type"
- Task 3: Read Claude's plan - it shows what it would do WITHOUT doing it
- Task 4: This is like a "preview" button - see the plan before executing it

### Lesson 6.2: Using Plan Mode for Big Changes
- Task 1: While in plan mode, type "If I wanted to add a website to this project, what files would I need?"
- Task 2: Read the plan - Claude outlines the files, structure, and steps
- Task 3: Type "What about adding a game to this project instead?" - compare the two plans
- Task 4: Plan mode lets you explore ideas without risk. Like sketching before painting.

### Lesson 6.3: Exiting Plan Mode and Executing
- Task 1: Type `/plan` again to exit plan mode (or the toggle command for your version)
- Task 2: Now you're back in normal mode - Claude CAN make changes again
- Task 3: Take one small idea from your plan and ask Claude to do just that one thing
- Task 4: Verify it worked, then undo if you want (`rm [filename]` or ask Claude to remove it)

### Lesson 6.4: When to Use Plan Mode
- Task 1: Use plan mode when: you're about to change many files, you're unsure about an approach, or you want to compare options
- Task 2: Don't use plan mode when: the task is simple, you're confident, or you're just creating one file
- Task 3: Practice: enter plan mode, ask "What would it take to add a dark mode to test.html?", read the plan, exit plan mode
- Task 4: Plan mode is your safety net. Use it whenever something feels "big" or uncertain.

**Module 6 Complete: Plan Mode Pro 🏆 | +200 XP | +3 Accuracy | +10 Aura**

---

## Module 7: Technical Foundations
**Stat Tag: Speed** | **Badge: Tech Foundation 🏆**

### Lesson 7.1: Understanding JSON
- Task 1: Ask Claude "Show me progress.json and explain what each field means"
- Task 2: JSON = a way to store organized data. Like a form with fields and values.
- Task 3: The rules: curly braces `{}` for objects, square brackets `[]` for lists, quotes around text, commas between items
- Task 4: Ask Claude to "Add a field called 'favorite_color' with value 'blue' to progress.json" (then remove it after)
- Task 5: You just read and modified real JSON. This is how most apps store data.

### Lesson 7.2: File Types You'll See
- Task 1: Ask Claude "What are the file types in this project and what does each extension mean?"
- Task 2: `.md` = Markdown (formatted text), `.json` = data storage, `.html` = web pages, `.css` = styling, `.js` = behavior
- Task 3: Create one of each: ask Claude to "Create example.html, example.css, and example.js - each with just one line of example code"
- Task 4: Ask Claude to explain what each file does and how they connect
- Task 5: Clean up: "Delete example.html, example.css, and example.js"

### Lesson 7.3: File Management
- Task 1: Type `touch testfile.txt` to create an empty file
- Task 2: Type `cp testfile.txt testcopy.txt` to copy it (cp = copy)
- Task 3: Type `mv testcopy.txt renamed.txt` to rename it (mv = move/rename)
- Task 4: Type `rm renamed.txt` to delete it (rm = remove - be careful, no undo!)
- Task 5: Type `rm testfile.txt` to clean up

### Lesson 7.4: Understanding Paths
- Task 1: Type `pwd` - this is an "absolute path" (starts from the root `/`)
- Task 2: Absolute = full address: `/Users/brady/Developer/projects/Claude Code 101`
- Task 3: Relative = from where you are: `./hello.txt` means "hello.txt in THIS folder"
- Task 4: `../` means "one folder up", `~/` means "home folder"
- Task 5: Ask Claude "What's the absolute path to progress.json in this project?"

### Lesson 7.5: Terminal Power Moves
- Task 1: Type `history` to see all your past commands (your terminal remembers everything)
- Task 2: Type `!!` and press Enter - it reruns your last command
- Task 3: Type `Ctrl + R` then start typing "cd" - this searches your history (press Enter to run the match)
- Task 4: Type `ls -la` - the `-la` flag shows hidden files AND details (size, date, permissions)
- Task 5: These shortcuts will save you hundreds of keystrokes over time

### Lesson 7.6: Reading Error Messages
- Task 1: Type `cd nonexistentfolder` - read the error. "No such file or directory" = it doesn't exist
- Task 2: Type `cat nonexistentfile.txt` - same error pattern. Terminal errors are usually clear if you read them.
- Task 3: Type `npm install fake-package-that-doesnt-exist-12345` - read the error. "404 Not Found" = the package doesn't exist
- Task 4: Ask Claude "What are the 5 most common terminal errors and what do they mean?"
- Task 5: Errors aren't scary - they're the computer telling you exactly what went wrong

**Module 7 Complete: Tech Foundation 🏆 | +200 XP | +3 Speed | +10 Aura**

---

## Module 8: Git & Version Control
**Stat Tag: Accuracy** | **Badge: Version Controller 🏆**

### Lesson 8.1: What Is Version Control?
- Task 1: Ask Claude "Explain version control like I'm saving a video game - what are save points?"
- Task 2: Git = a tool that creates save points for your code. You can go back to any save point.
- Task 3: Every professional developer uses Git. It's like unlimited undo for your entire project.
- Task 4: Type `git --version` to confirm Git is installed (it comes with Mac)

### Lesson 8.2: Your First Repository
- Task 1: Make sure you're in your Claude Code 101 folder (`pwd` to check)
- Task 2: Type `git init` - this turns your folder into a Git repository (tracked project)
- Task 3: Type `git status` - it shows all your files as "untracked" (not yet saved)
- Task 4: Type `git add .` - this stages ALL files (prepares them for saving)
- Task 5: Type `git status` again - now they're green (ready to save)

### Lesson 8.3: Your First Commit
- Task 1: Type `git commit -m "Initial commit: Claude Code 101 project files"`
- Task 2: The `-m` flag adds a message describing what you saved. Always write clear messages.
- Task 3: Type `git log` to see your save point - it shows your commit with a timestamp
- Task 4: You just created your first save point. Your project is now tracked.
- Task 5: Press `q` to exit the log view if it's stuck

### Lesson 8.4: Making Changes and Committing
- Task 1: Ask Claude to "Add a comment at the top of hello.txt saying 'Updated on [today's date]'"
- Task 2: Type `git status` - hello.txt shows as "modified" (changed since last save)
- Task 3: Type `git diff` to see exactly what changed (red = removed, green = added)
- Task 4: Type `git add hello.txt` then `git commit -m "Update hello.txt with date comment"`
- Task 5: Type `git log` - now you have 2 save points. You can always go back to either one.

### Lesson 8.5: GitHub - Your Code Online
- Task 1: Go to github.com and create an account (or sign in)
- Task 2: Click "New repository", name it "claude-code-101", keep it public, DON'T add a README
- Task 3: GitHub shows you commands to run - copy the ones under "push an existing repository"
- Task 4: Run those commands in your terminal (they connect your local project to GitHub)
- Task 5: Refresh the GitHub page - your files are now online! Anyone can see them.

### Lesson 8.6: Branching Basics
- Task 1: Type `git branch` - you're on "main" (the primary branch)
- Task 2: Type `git checkout -b experiment` - creates a new branch called "experiment"
- Task 3: Make any small change (ask Claude to edit hello.txt), commit it
- Task 4: Type `git checkout main` - you're back on main, and hello.txt is unchanged!
- Task 5: Branches let you experiment without risking your main work. Like a parallel save file.

**Module 8 Complete: Version Controller 🏆 | +200 XP | +3 Accuracy | +10 Aura**

---

## Module 9: Building Your Personal Website
**Stat Tag: Creativity** | **Badge: Web Builder 🏆**

This module builds a REAL personal website. It will be live on the internet by the end.

### Lesson 9.1: Planning Your Site
- Task 1: Ask Claude "Help me plan a simple personal website. I want: about me, projects, and contact sections. What files do I need?"
- Task 2: Review the plan together - keep it simple (1 HTML file, 1 CSS file to start)
- Task 3: Ask Claude to "Create a folder called 'my-website' in this project"
- Task 4: Navigate into it: `cd my-website`

### Lesson 9.2: HTML Basics Through Claude
- Task 1: Tell Claude "Create index.html with a basic HTML5 structure. Include a header with my name 'Brady', a nav bar, and three sections: About, Projects, Contact"
- Task 2: Ask Claude to explain the key HTML tags it used (h1, nav, section, etc.)
- Task 3: Open it in your browser: `open index.html`
- Task 4: It looks plain - that's because we haven't styled it yet

### Lesson 9.3: CSS Styling Through Claude
- Task 1: Tell Claude "Create styles.css that makes my website look modern. Use a dark background, light text, nice fonts, and spacing. Link it to index.html"
- Task 2: Refresh your browser - see the difference CSS makes!
- Task 3: Don't like something? Tell Claude "Change the background to dark blue instead" or "Make the font bigger"
- Task 4: Iterate until you like how it looks. This is how real web development works.

### Lesson 9.4: Adding Real Content
- Task 1: Tell Claude "Update the About section with: [write 2-3 sentences about yourself]"
- Task 2: Tell Claude "Update the Projects section with a card for 'Claude Code 101' - my first project learning to code with AI"
- Task 3: Tell Claude "Update the Contact section with a way to reach me" (email, Twitter, whatever you want)
- Task 4: Preview in browser again - you have a real personal site with real content

### Lesson 9.5: Making It Responsive
- Task 1: Ask Claude "Make the website responsive so it looks good on phones too. Use CSS media queries."
- Task 2: To test: resize your browser window to be narrow (simulates a phone screen)
- Task 3: If anything looks broken on small screens, tell Claude what to fix
- Task 4: Responsive design = your site works on any screen size. Professional.

### Lesson 9.6: Deploying to the Internet
- Task 1: Ask Claude "Help me deploy this website to GitHub Pages for free"
- Task 2: Follow Claude's steps: create a repo, push your code, enable GitHub Pages in settings
- Task 3: Wait a minute, then visit your live URL (usually `yourusername.github.io/repo-name`)
- Task 4: Your website is LIVE. On the actual internet. Anyone can visit it.

### Lesson 9.7: Custom Domain (Optional)
- Task 1: If you have a domain name, ask Claude "How do I point my custom domain to GitHub Pages?"
- Task 2: Follow the DNS setup instructions
- Task 3: If you don't have a domain, skip this - the github.io URL works fine
- Task 4: Either way, you have a live personal website

### Lesson 9.8: Polish and Ship
- Task 1: Visit your live site and find 3 things to improve
- Task 2: Tell Claude each fix, one at a time
- Task 3: Commit your changes: `git add . && git commit -m "Polish website"` then `git push`
- Task 4: You just shipped a product. A real website. Live on the internet. Built with Claude Code.

**Module 9 Complete: Web Builder 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 10: Agents - Your AI Specialists
**Stat Tag: Efficiency** | **Badge: Agent Commander 🏆**

### Lesson 10.1: What Are Agents?
- Task 1: Ask Claude "What are agents in Claude Code? Explain like I'm new."
- Task 2: Agents = specialized sub-processes Claude spawns for complex tasks. Like hiring specialists.
- Task 3: When you give Claude a big task, it might break it into smaller pieces and send each to an agent
- Task 4: Type a complex request: "Look at all files in this project, summarize what each one does, and suggest improvements" - watch if Claude uses agents

### Lesson 10.2: When Claude Spawns Agents
- Task 1: Simple tasks (1 file, 1 action) = Claude handles directly
- Task 2: Complex tasks (multiple files, research + action) = Claude may spawn agents
- Task 3: Try: "Search this project for any TODO comments or things that need fixing" - this often triggers agent use
- Task 4: Notice in the output if you see "Agent" or task delegation happening

### Lesson 10.3: Reading Agent Output
- Task 1: When agents run, you'll see their progress and results
- Task 2: Ask Claude "Run a thorough review of my website files and list any issues" (this may use agents)
- Task 3: Read the output - each agent focuses on one piece of the task
- Task 4: The final answer combines all agent findings into one response for you

### Lesson 10.4: Controlling Agent Behavior
- Task 1: You can tell Claude how to approach tasks: "Do this step by step, showing me each step" (less agent delegation)
- Task 2: Or: "Handle this completely and just show me the final result" (more agent delegation)
- Task 3: Practice both approaches on the same task and compare
- Task 4: You control the balance between seeing every step vs. getting fast results

### Lesson 10.5: Multi-Agent Workflows
- Task 1: Ask Claude "Create a complete landing page for a product called 'AI Study Buddy'. Research similar products, design the layout, write the copy, and create the HTML/CSS"
- Task 2: This complex task may involve multiple agents working in parallel
- Task 3: Review the result - notice how the different aspects (research, design, code) came together
- Task 4: Clean up the test files after reviewing. Multi-agent = complex tasks made simple.

**Module 10 Complete: Agent Commander 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 11: MCP - Connecting External Tools
**Stat Tag: Efficiency** | **Badge: MCP Specialist 🏆**

### Lesson 11.1: What Is MCP?
- Task 1: MCP = Model Context Protocol. Think of it as "plugins" for Claude Code.
- Task 2: Without MCP: Claude can read/write files and run terminal commands
- Task 3: With MCP: Claude can talk to GitHub, databases, APIs, and more directly
- Task 4: Ask Claude "What MCP servers do I currently have configured?"

### Lesson 11.2: Installing Your First MCP Server
- Task 1: Ask Claude "Help me install the filesystem MCP server so you can better navigate my files"
- Task 2: Follow the installation steps Claude provides
- Task 3: Restart Claude Code to load the new MCP server
- Task 4: Test it: ask Claude to do something that uses the new capability

### Lesson 11.3: GitHub MCP
- Task 1: Ask Claude "Help me set up the GitHub MCP server so you can interact with my repos"
- Task 2: This lets Claude create issues, review PRs, and manage repos directly
- Task 3: After setup, test: "Create an issue on my claude-code-101 repo titled 'Add more lessons'"
- Task 4: Check GitHub - the issue should be there. Claude can now manage your GitHub directly.

### Lesson 11.4: Using MCP Tools in Conversations
- Task 1: With MCP servers installed, Claude has more tools available
- Task 2: Ask Claude "What tools do you have available right now?" to see the full list
- Task 3: Try using a tool: "Use your GitHub tool to list my repositories"
- Task 4: MCP expands what Claude can do without you leaving the terminal

### Lesson 11.5: Finding and Adding New MCPs
- Task 1: Ask Claude "What are the most useful MCP servers available for developers?"
- Task 2: Pick one that sounds useful for your workflow
- Task 3: Install it together with Claude's help
- Task 4: MCP is how you customize Claude Code to YOUR specific needs. The more you add, the more powerful it becomes.

**Module 11 Complete: MCP Specialist 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 12: Advanced Patterns
**Stat Tag: Accuracy** | **Badge: Advanced Practitioner 🏆**

### Lesson 12.1: Claude Code in Existing Projects
- Task 1: Navigate to your website folder: `cd my-website`
- Task 2: Start Claude Code there: `claude`
- Task 3: Type "Analyze this project. What's the file structure, what technology is used, and what could be improved?"
- Task 4: Claude understands existing projects - you can drop it into ANY folder and it figures out what's there

### Lesson 12.2: Debugging with Claude
- Task 1: Ask Claude to "Add a broken JavaScript function to my website that has a bug in it" (for practice)
- Task 2: Then ask "I think there's a bug in my JavaScript. Can you find and fix it?"
- Task 3: Watch how Claude reads the code, identifies the issue, and proposes a fix
- Task 4: This is real debugging workflow - describe the problem, let Claude investigate
- Task 5: Clean up: remove the test JavaScript

### Lesson 12.3: Code Review with Claude
- Task 1: Ask Claude "Review my index.html as if you were a senior developer. Be honest about what's good and what could be better."
- Task 2: Read the feedback - Claude gives constructive criticism
- Task 3: Pick one suggestion and implement it together
- Task 4: Code review = getting feedback before shipping. Claude is an always-available reviewer.

### Lesson 12.4: Refactoring with Claude
- Task 1: Ask Claude "Is there any repetitive or messy code in my website files? Show me."
- Task 2: If found: "Refactor it to be cleaner while keeping the same functionality"
- Task 3: Verify the website still works after refactoring (refresh browser)
- Task 4: Refactoring = making code better without changing what it does. Important skill.

### Lesson 12.5: Testing Strategies
- Task 1: Ask Claude "How would I test that my website works correctly? What should I check?"
- Task 2: Claude will suggest things: links work, responsive design, content is correct, etc.
- Task 3: Go through the checklist together - check each item on your live site
- Task 4: Testing = making sure things work before users see them. Professionals always test.

### Lesson 12.6: Performance Optimization
- Task 1: Ask Claude "Analyze my website for performance. How fast does it load? What could be faster?"
- Task 2: Implement one optimization Claude suggests (like image compression, minifying CSS, etc.)
- Task 3: Compare before/after if possible
- Task 4: Fast websites = happy users. Every millisecond matters.

**Module 12 Complete: Advanced Practitioner 🏆 | +200 XP | +3 Accuracy | +10 Aura**

---

## Module 13: Shipping Real Products
**Stat Tag: Creativity** | **Badge: Product Shipper 🏆**

### Lesson 13.1: From Idea to Plan
- Task 1: Think of something you want to build (a tool, a website, an app idea)
- Task 2: Tell Claude your idea and ask "Help me break this into small buildable pieces"
- Task 3: Review the plan together - is it realistic? What's the smallest version that works?
- Task 4: An MVP (Minimum Viable Product) = the simplest version that's actually useful

### Lesson 13.2: Building Your MVP
- Task 1: Take the first piece from your plan and build it with Claude
- Task 2: Keep it simple - if you catch yourself adding "nice to have" features, stop
- Task 3: Build just enough to demonstrate the core idea
- Task 4: When the basic version works, commit it: `git add . && git commit -m "MVP: [your project name]"`

### Lesson 13.3: Iterating Based on Feedback
- Task 1: Look at your MVP and list 3 things that could be better
- Task 2: Prioritize: which improvement would make the biggest difference?
- Task 3: Build that one improvement with Claude
- Task 4: This is the build-measure-learn loop. Ship fast, improve based on what you notice.

### Lesson 13.4: Deployment and Maintenance
- Task 1: Deploy your MVP (GitHub Pages, or ask Claude for other free options)
- Task 2: Share the link with someone and ask for honest feedback
- Task 3: Make one fix based on their feedback
- Task 4: You've now gone through the entire product lifecycle: idea → plan → build → ship → feedback → improve. This is how real products are made.

**Module 13 Complete: Product Shipper 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 14: Ralph Wiggum Mode - Autonomous Loops
**Stat Tag: Efficiency** | **Badge: Autonomous Operator 🏆**

### Lesson 14.1: What Is Autonomous Mode?
- Task 1: Sometimes you want Claude to work on a big task without stopping to ask you permission for every step
- Task 2: Autonomous mode = Claude runs multiple steps in a row, only stopping when done or stuck
- Task 3: Ask Claude "How do I let you run autonomously without asking permission for each file change?"
- Task 4: This is "Ralph Wiggum mode" - Claude goes on autopilot (for better or worse)

### Lesson 14.2: Setting Up a Long-Running Task
- Task 1: Give Claude a meaty task: "Refactor my entire website to use semantic HTML5 tags. Update all pages and the CSS to match."
- Task 2: Grant permissions for Claude to run without stopping (follow the prompts)
- Task 3: Watch Claude work through multiple files and steps automatically
- Task 4: Review the results when done - did it do what you wanted?

### Lesson 14.3: Monitoring and Guiding
- Task 1: Start another autonomous task: "Add 3 more project cards to my website with real descriptions"
- Task 2: While Claude works, you can still type to redirect: "Actually, make them about open source projects I admire"
- Task 3: You're not completely hands-off - you can guide the direction while Claude handles execution
- Task 4: Think of it like being a director: you set the vision, Claude does the work

### Lesson 14.4: When to Use vs. Hands-On
- Task 1: Autonomous is good for: repetitive tasks, big refactors, bulk file changes, research
- Task 2: Hands-on is better for: learning new things, creative decisions, sensitive changes
- Task 3: Practice: identify which of your past tasks would have been good for autonomous mode
- Task 4: You now have both styles: careful step-by-step AND full-speed autonomous. Use the right tool for the job.

**Module 14 Complete: Autonomous Operator 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 15: You're a Builder Now
**Stat Tag: Creativity** | **Badge: Claude Code Graduate 🎓**

### Lesson 15.1: Review of Your Journey
- Task 1: Ask Claude "List every skill I've learned across all modules of Claude Code 101"
- Task 2: Read through the list - you went from zero to all of this
- Task 3: Pick the skill you're most proud of learning and tell Claude why
- Task 4: You've gone from "what's a terminal?" to building, deploying, and managing real projects

### Lesson 15.2: Building Your Next Project
- Task 1: Think of your next project - something YOU want to build (not an exercise)
- Task 2: Use everything you've learned: plan mode for design, good prompts, Git for saving, deployment for shipping
- Task 3: Start building it right now with Claude
- Task 4: You don't need a course anymore. You have the skills. Just build.

### Lesson 15.3: The Endless Path
- Task 1: After Level 8, levels keep going (every 1000 XP). Your skill tree keeps growing.
- Task 2: Ask Claude "What advanced Claude Code features haven't I explored yet?"
- Task 3: Pick one and try it right now
- Task 4: The learning never stops, but now you know HOW to learn. That's the real graduation.

**Module 15 Complete: Claude Code Graduate 🎓 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 16: The Latest (Coming Later)
**Status: Placeholder - Weekly rotating content not yet implemented**

This module will contain:
- Weekly rotating challenges and tasks
- New Claude Code features as they're released
- Community challenges (when leaderboards launch)
- Seasonal event lessons
- Advanced topics on demand

For now, students who reach this point should:
1. Continue earning XP through sandbox mode
2. Build personal projects
3. Explore advanced features on their own
4. Return when new content is added

---

## Stat Tag Reference

| Stat | Modules That Grow It |
|------|---------------------|
| ⚡ Speed | Module 1, 7 |
| 🎯 Accuracy | Module 6, 8, 12 |
| 💡 Creativity | Module 3, 5, 9, 13, 15 |
| ⚙️ Efficiency | Module 2, 4, 10, 11, 14 |
| ✨ Aura | All (small amount on every completion) |

---

## RPG Milestone Reference

| Module | RPG Event |
|--------|-----------|
| 3, Lesson 3.4 | CLASS SELECTION |
| Level 2 | First skill point |
| Level 5 | Sandbox mode unlocks |
| Level 7 | Class evolution (final form) |
| Level 8 | Endless levels begin |
| Module 15 | Graduation (all core content complete) |
