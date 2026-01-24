# Claude Code 101 - Full Curriculum

Every task teaches a real Claude Code or terminal skill. Zero filler. Each lesson has a `stat_tag` indicating which stat it grows.

---

## Module 1: Getting Into the Terminal
**Stat Tag: Speed** | **Badge: Terminal Explorer 🏆**

This module gets you from "I have a laptop" to "I can use the terminal."

### Lesson 1.1: Opening Your Terminal
- Task 1: On your Mac, press `Cmd + Space` to open Spotlight search (the fastest way to launch any app without clicking through menus)
- Task 2: Type "Terminal" and press Enter (Spotlight finds it instantly, no need to know where it's installed)
- Task 3: A window appears with a blinking cursor - this is your terminal, a way to talk to your computer by typing commands instead of clicking (every developer uses this because typing is faster and more powerful than clicking)
- Task 4: Type `echo "hello"` and press Enter - your computer responds with "hello" (echo means "repeat what I say", this proves the terminal is listening and responding to your commands)

### Lesson 1.2: Understanding Where You Are
- Task 1: Type `pwd` and press Enter (pwd = "print working directory" = "where am I?" - because the terminal is always IN a folder, you need to know which one)
- Task 2: Read the result - it's a path like `/Users/brady` - this is your home folder (every user has one, it's like the root of your personal file tree)
- Task 3: Type `ls` and press Enter (ls = "list" = "what's here?" - shows all files and folders in your current location so you know what exists)
- Task 4: You just learned the two most essential commands: `pwd` tells you where you are (location), `ls` tells you what's around you (contents) - you'll use these constantly

### Lesson 1.3: Moving Around
- Task 1: Type `ls` - find a folder name in the list like "Desktop" or "Documents" (these are folders inside your current location)
- Task 2: Type `cd Desktop` and press Enter (cd = "change directory" = "go to folder" - like double-clicking a folder in Finder, but faster)
- Task 3: Type `pwd` to confirm you moved - see how the path changed from `/Users/brady` to `/Users/brady/Desktop`? (pwd always shows your current location)
- Task 4: Type `cd ..` to go back up one level (the `..` is shorthand for "parent folder" = one level up in the folder tree - every folder has a parent except the root)
- Task 5: Type `pwd` to confirm you're back home (the path should match what you saw in Task 1 - navigation works both ways)

### Lesson 1.4: Creating Your Project Folder
- Task 1: Type `cd ~/Developer` to go to your Developer folder (if you get an error "No such file or directory", that's okay - the folder doesn't exist yet)
- Task 2: If you got an error, type `mkdir ~/Developer && cd ~/Developer` to create it and go there (mkdir = "make directory" = "create folder")
- Task 3: Type `pwd` to confirm you're in Developer - organizing projects in folders prevents chaos later
- Task 4: Type `mkdir projects` to create a "projects" folder (this will hold all your coding projects)
- Task 5: Type `cd projects` to go inside it
- Task 6: Type `mkdir "Claude Code 101"` to create your course folder (quotes needed because of the spaces)
- Task 7: Type `cd "Claude Code 101"` - this is your home base for the entire course, you'll return here often

### Lesson 1.5: Terminal Survival Kit
- Task 1: Press the Up Arrow key - your last command reappears like magic (the terminal remembers everything you typed, so you can recall and rerun commands without retyping)
- Task 2: Start typing `pw` then press Tab - it autocompletes to `pwd` (Tab completion saves hundreds of keystrokes per day by finishing commands and filenames for you)
- Task 3: Type `echo "test"` and while it's showing, press `Ctrl + C` - this stops/kills the current command (because some commands run forever until you stop them, Ctrl+C is your emergency exit)
- Task 4: Type `clear` to clean the screen or press `Ctrl + L` (same result - clears visual clutter so you can see your next command clearly, doesn't delete history)
- Task 5: Remember the critical difference: `Ctrl + C` in terminal = STOP/KILL command (not copy like in other apps!), `Cmd + C` = copy text on Mac (terminal keyboard shortcuts are different)

**Module 1 Complete: Terminal Explorer 🏆 | +200 XP | +3 Speed | +10 Aura**

---

## Module 2: Installing Claude Code
**Stat Tag: Efficiency** | **Badge: Setup Champion 🏆**

### Lesson 2.1: Getting Your API Key
- Task 1: Open your browser and go to `console.anthropic.com` (Anthropic's developer console where you manage API access)
- Task 2: Create an account or sign in (free to create, you'll add payment later when you use credits - new accounts get free trial credits)
- Task 3: Find "API Keys" in the menu (usually in the left sidebar or settings - this is where you create authentication keys)
- Task 4: Click "Create Key" and give it a descriptive name like "claude-code" (naming helps when you have multiple keys for different projects)
- Task 5: Copy the key immediately and save it somewhere safe like a password manager (you'll need it in 2 minutes, and it only shows ONCE - if you lose it, you have to create a new one)
- Task 6: This key is like a password that lets Claude Code connect to Claude's AI brain (it authenticates your requests so Anthropic knows who's using their API and can bill appropriately)

### Lesson 2.2: Installing Claude Code
- Task 1: Go back to your terminal (should be in your Claude Code 101 folder - check with `pwd` to verify)
- Task 2: Type `npm install -g @anthropic-ai/claude-code` and press Enter (npm = package manager that installs software, -g = install globally so it works from any folder)
- Task 3: Wait for it to finish - you'll see text scrolling as it downloads and installs (this is normal, takes 30-60 seconds)
- Task 4: If you see an error about "npm not found", you need Node.js first: type `brew install node`, wait for that to finish, then retry Task 2
- Task 5: When done, type `claude --version` - if you see a version number like "1.2.3", it worked! If you see an error, the installation failed (ask for help)

### Lesson 2.3: First Launch
- Task 1: Make sure you're in your project folder: type `cd ~/Developer/projects/"Claude Code 101"` (or `pwd` to check if you're already there)
- Task 2: Type `claude` and press Enter - this starts Claude Code (the first launch is special, it needs setup)
- Task 3: It will ask for your API key - paste it in using Cmd+V, then press Enter (you won't see the key as you paste for security, that's normal)
- Task 4: You should see Claude Code start and greet you - type "hello" and wait for a response (this proves it's working)
- Task 5: Type "What folder am I in?" - Claude Code responds with your current directory because it can see your computer
- Task 6: You just launched an AI that can read files, run commands, and write code on your computer. This is the power you'll learn to wield.

**Module 2 Complete: Setup Champion 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 3: Your First Conversations + CLASS SELECTION
**Stat Tag: Creativity** | **Badge: First Contact 🏆**

### Lesson 3.1: Talking to Claude Code
- Task 1: Start Claude Code (`claude` command if not already running), then type "What folder are we in right now?" - Claude can see your file system and will tell you the path
- Task 2: Type "What files are in this folder?" - Claude checks using the same `ls` command you learned, shows you the results
- Task 3: Type "What is the weather like?" - notice Claude says it can't check weather (Claude Code is about YOUR COMPUTER, not internet data or general chat)
- Task 4: The key difference from ChatGPT/Claude.ai: Claude Code can actually DO things on your computer (read files, create files, run commands) instead of just talking about them

### Lesson 3.2: Creating Files Through Conversation
- Task 1: Type "Create a file called hello.txt with the text 'My first file created by AI' inside" - this is asking Claude to write a file for you
- Task 2: Claude will ask permission to create the file (showing you exactly what it will do) - type 'y' to approve (this safety check prevents accidents)
- Task 3: Type "Show me what's in hello.txt" to verify it worked - Claude reads the file and displays the contents
- Task 4: Exit Claude Code by typing `/exit` or pressing Ctrl+C twice - you're back to your regular terminal
- Task 5: Type `ls` to see the file exists in your folder - hello.txt is right there, a real file you created through conversation
- Task 6: Type `cat hello.txt` to read it yourself without Claude - the text is exactly what you specified
- Task 7: You just created a real file through conversation instead of using a text editor. This is the power of Claude Code.

### Lesson 3.3: Specific vs. Vague Prompts
- Task 1: Start Claude Code again with `claude` and type "Make a webpage" - notice the generic result (Claude has to guess what you want, so you get a basic template)
- Task 2: Now type "Create a file called test.html with a blue background, white text, the title 'Hello World' in a big heading, and a paragraph saying 'I made this with Claude Code'" - much more specific
- Task 3: Compare the results - the second webpage matches your exact vision while the first is generic (specific prompts = better output every single time because Claude knows exactly what you want)
- Task 4: Type "Open test.html in my browser" and Claude will run the `open` command for you (this is Claude controlling your computer through terminal commands)
- Task 5: Your webpage opens in the browser looking exactly how you specified - specific instructions create specific results (this is the key to working effectively with AI)

### Lesson 3.4: CLASS SELECTION EVENT
- Task 1: Read about the 6 character classes that will shape your learning journey (each class has different stat bonuses and playstyle - this choice matters for your progression)
- Task 2: Think about what excites you most: Building products? Moving fast? Collecting achievements? Finding secrets? Having fun? Technical mastery? (your honest preference determines which class fits you)
- Task 3: Choose your class when your teacher presents the options (this is a permanent decision that gives you unique bonuses for every lesson going forward)
- Task 4: Celebrate your class selection! You now have a character class with unique stat bonuses and a skill tree to unlock (this makes the learning journey feel like YOUR adventure, not a generic course)

**Module 3 Complete: First Contact 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 4: Claude Code Models - Choose Your Power Level
**Stat Tag: Efficiency** | **Badge: Model Master 🏆**

### Lesson 4.1: What Are Models?
- Task 1: In Claude Code, type `/model` to see your current model (this shows which AI "brain" is currently responding to you)
- Task 2: Claude has different "brains" called models - think of them like difficulty settings in a game, or gears on a bike (different power levels for different needs)
- Task 3: Type "What model are you using right now?" and note the answer (Claude tells you which model is active - probably Sonnet by default)
- Task 4: Know the three main models: Haiku (fast and cheap for simple tasks), Sonnet (balanced for most work), Opus (powerful and expensive for complex problems) - picking the right model saves time and money

### Lesson 4.2: Haiku - The Speed Demon
- Task 1: Type `/model haiku` to switch to Haiku (the fastest model - prioritizes speed over depth)
- Task 2: Ask it "What is a terminal?" and notice how fast the response comes - usually under 2 seconds
- Task 3: Ask it "Create a simple Python hello world script" - quick and simple tasks are Haiku's strength (fast execution, good enough quality)
- Task 4: Haiku = fast answers, simple tasks, costs less API credits. Like asking a quick question to a friend who gives you the essentials without elaborating.

### Lesson 4.3: Sonnet - The All-Rounder
- Task 1: Type `/model sonnet` to switch to Sonnet (the balanced model - good quality without being slow or expensive)
- Task 2: Ask it "Explain what an API key is and why it matters, in simple terms" - notice Sonnet gives more context and examples
- Task 3: Compare this response to what Haiku would have said - Sonnet is more detailed and thoughtful (better explanations, more nuance)
- Task 4: Ask it "Create an HTML page with CSS styling for a personal portfolio" - Sonnet handles medium complexity well (structured code, good practices)
- Task 5: Sonnet = the default choice for most work. Good at most things without being overkill. This is your daily driver.

### Lesson 4.4: Opus - The Powerhouse
- Task 1: Type `/model opus` to switch to Opus (the most powerful and expensive model - deepest reasoning)
- Task 2: Ask it "Design a complete file structure for a blog website with categories, posts, and user accounts" - this is a complex architecture question
- Task 3: Notice the depth and architecture-level thinking - Opus considers edge cases, scalability, best practices (things Haiku/Sonnet might skip)
- Task 4: Opus = complex problems, architecture decisions, big-picture thinking. Use when quality matters more than speed or cost.
- Task 5: Switch back to Sonnet with `/model sonnet` for normal use - Opus is overkill for everyday tasks, save it for when you really need the horsepower

**Module 4 Complete: Model Master 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 5: Writing Prompts Like a Pro
**Stat Tag: Creativity** | **Badge: Prompt Engineer 🏆**

### Lesson 5.1: Context Is King
- Task 1: Type "Fix the bug" - Claude will say it needs more information because it has no context (which bug? which file? what project?)
- Task 2: Now type "Look at hello.txt and tell me if there are any spelling mistakes" - Claude reads the file and checks (context provided = Claude can act)
- Task 3: The difference: "Fix the bug" is vague, "Look at hello.txt and check spelling" is specific (Claude needs to know WHAT and WHERE)
- Task 4: Rule #1: Always give Claude context - mention the file name, describe what you're trying to do, explain what's wrong (more context = better help)
- Task 5: Practice: Ask Claude to "look at the files in this folder and describe what this project is" - watch how it explores and summarizes

### Lesson 5.2: Multi-Step Instructions
- Task 1: Type "Create a folder called 'practice', put a file called 'notes.md' inside it with a heading 'My Notes' and three bullet points about what I've learned so far" - this is asking Claude to do three things at once
- Task 2: Watch Claude handle all three steps in order - it creates the folder, creates the file inside, and writes the content (you don't have to break it down)
- Task 3: Verify it worked: type `ls practice` to see the notes.md file, then `cat practice/notes.md` to read the contents (or ask Claude to show you)
- Task 4: You can give Claude complex multi-step tasks and it figures out the order and dependencies (this saves you from typing multiple commands)
- Task 5: Clean up: ask Claude to "delete the practice folder and everything in it" - approve the deletion when asked

### Lesson 5.3: Iterating on Responses
- Task 1: Ask Claude "Create a README.md for a project called 'My First App'" - Claude generates a complete README file
- Task 2: Read the result - find something you'd change (maybe too long? wrong tone? missing installation instructions? too technical?)
- Task 3: Tell Claude what to fix: "Make the description shorter" or "Add a section about installation" or "Use simpler language" - Claude updates the file
- Task 4: You don't need to start over from scratch - just tell Claude what to adjust and it modifies the existing file (iteration is faster than recreation)
- Task 5: Delete the test README when done: ask Claude to "remove README.md" - if it asks about YOUR project's README, say no (this is just a test file)

### Lesson 5.4: Prompt Templates
- Task 1: Learn this universal pattern: "I want to [goal]. The context is [situation]. Please [specific action]." - this structure ensures Claude has goal + context + action (the three key ingredients)
- Task 2: Practice it: "I want to organize my project files. The context is I have a Claude Code 101 folder with learning files. Please suggest a file structure." - see how it provides complete information?
- Task 3: Another powerful pattern: "Look at [file] and [action]. Keep [constraint]." - gives Claude a target, an action, and a boundary (prevents scope creep)
- Task 4: Practice it: "Look at hello.txt and rewrite it to sound more professional. Keep it under 2 sentences." - Claude knows what to change and what NOT to change
- Task 5: Templates save cognitive energy - instead of composing from scratch every time, fill in the blanks (you'll develop your own winning patterns as you go)

### Lesson 5.5: Advanced Prompting Patterns
- Task 1: The "show your work" pattern: "Create a simple HTML page. Explain each line as you write it." - forces Claude to teach while building (you learn the reasoning, not just the code)
- Task 2: The "options" pattern: "Give me 3 different ways to structure a personal website. Pros and cons of each." - explores the solution space before committing (decision-making aid)
- Task 3: The "constraints" pattern: "Write a CSS file for hello.html. Only use 3 colors. No frameworks." - boundaries force creativity and prevent over-engineering (simpler is often better)
- Task 4: The "review" pattern: "Look at test.html and rate it 1-10 on code quality. Explain why and suggest improvements." - gets expert feedback before shipping (like a code review from a senior dev)
- Task 5: You now have 4 power patterns that solve common problems - use them anytime you're stuck on what to ask (each pattern unlocks a different capability)

**Module 5 Complete: Prompt Engineer 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 6: Plan Mode - Safe Exploration
**Stat Tag: Accuracy** | **Badge: Plan Mode Pro 🏆**

### Lesson 6.1: What Is Plan Mode?
- Task 1: Type `/plan` to enter plan mode (a special mode where Claude Code won't make changes - it only shows what it WOULD do)
- Task 2: Type "Reorganize all files in this folder into subfolders by type" - normally this would move your files, but in plan mode it just describes the changes
- Task 3: Read Claude's plan - it shows what files would move where, what folders would be created, all WITHOUT actually doing it (safe exploration)
- Task 4: This is like a "preview" button before hitting save - you see the plan before executing it, which prevents mistakes on big changes

### Lesson 6.2: Using Plan Mode for Big Changes
- Task 1: While still in plan mode, type "If I wanted to add a website to this project, what files would I need?" - Claude thinks through the requirements
- Task 2: Read the plan - Claude outlines what files to create (HTML, CSS, JS), what structure to use, and why each file matters (exploring ideas safely)
- Task 3: Type "What about adding a game to this project instead?" - Claude gives a different plan with game-specific files and logic
- Task 4: Compare the two plans side-by-side - plan mode lets you explore multiple approaches without committing to any (like sketching before painting, or trying on clothes before buying)

### Lesson 6.3: Exiting Plan Mode and Executing
- Task 1: Type `/plan` again to exit plan mode (it toggles - on/off with the same command, or use your version's toggle command)
- Task 2: Now you're back in normal mode - Claude CAN make real changes again (you'll see the mode indicator change)
- Task 3: Take one small idea from your plan and ask Claude to do just that one thing - for example "Create index.html from the website plan" (start small, verify it works)
- Task 4: Verify it worked by asking Claude "Show me index.html" - if you don't like it, ask Claude to remove the file or delete it yourself with `rm index.html`

### Lesson 6.4: When to Use Plan Mode
- Task 1: Use plan mode when: you're about to change many files (risky), you're unsure about the best approach (exploring), or you want to compare multiple options (decision-making)
- Task 2: Don't use plan mode when: the task is simple (like creating one file), you're confident in the approach (you know what you want), or you're just experimenting with throwaway code
- Task 3: Practice: type `/plan` to enter, ask "What would it take to add a dark mode to test.html?", read the plan (CSS changes, color schemes, toggle logic), then `/plan` to exit
- Task 4: Plan mode is your safety net and thinking space. Use it whenever something feels "big" or uncertain - better to preview than to regret.

**Module 6 Complete: Plan Mode Pro 🏆 | +200 XP | +3 Accuracy | +10 Aura**

---

## Module 7: Technical Foundations
**Stat Tag: Speed** | **Badge: Tech Foundation 🏆**

### Lesson 7.1: Understanding JSON
- Task 1: Ask Claude "Show me progress.json and explain what each field means" - you'll see your RPG progress stored as structured data
- Task 2: JSON = a way to store organized data, like a form with labeled fields and their values (not random text, but structured information)
- Task 3: The rules: curly braces `{}` contain objects (collections of fields), square brackets `[]` contain lists (ordered items), text needs quotes, commas separate items (strict format, no mistakes allowed)
- Task 4: Ask Claude to "Add a field called 'favorite_color' with value 'blue' to progress.json" - Claude modifies the JSON structure for you
- Task 5: Ask Claude to "Remove the favorite_color field from progress.json" to clean up - you just read and modified real JSON data
- Task 6: This is how most apps store settings, user data, game saves - JSON is everywhere in software development

### Lesson 7.2: File Types You'll See
- Task 1: Ask Claude "What are the file types in this project and what does each extension mean?" - Claude analyzes your files and explains the extensions
- Task 2: Common types: `.md` = Markdown (formatted text, like Word but simpler), `.json` = data storage (structured information), `.html` = web pages (structure), `.css` = styling (appearance), `.js` = behavior (interactivity)
- Task 3: Create one of each: ask Claude to "Create example.html, example.css, and example.js - each with just one line of example code" - hands-on practice recognizing file types
- Task 4: Ask Claude to "Explain what each file does and how they connect to each other" - understanding relationships between file types is key (HTML links to CSS, CSS styles HTML, JS adds interactivity)
- Task 5: Clean up: "Delete example.html, example.css, and example.js" - practice cleanup (don't leave test files littering your project)

### Lesson 7.3: File Management
- Task 1: Type `touch testfile.txt` to create an empty file (touch = create if doesn't exist, or update timestamp if it does)
- Task 2: Type `ls` to see testfile.txt in the list - proof it exists
- Task 3: Type `cp testfile.txt testcopy.txt` to copy it (cp = copy, now you have two files with the same content)
- Task 4: Type `ls` again to see both files - testfile.txt and testcopy.txt both exist
- Task 5: Type `mv testcopy.txt renamed.txt` to rename it (mv = move, but "moving" to the same folder with a different name = rename)
- Task 6: Type `rm renamed.txt` to delete it (rm = remove - be careful, this is permanent, no undo or trash can!)
- Task 7: Type `rm testfile.txt` to clean up - your folder is back to normal

### Lesson 7.4: Understanding Paths
- Task 1: Type `pwd` - this shows an "absolute path" (starts from the root `/` and gives the complete address from the top of your drive)
- Task 2: Absolute path example: `/Users/brady/Developer/projects/Claude Code 101` - this works from anywhere on your computer (full address)
- Task 3: Relative path = from where you are now: `./hello.txt` means "hello.txt in THIS folder", `subfolder/file.txt` means "go into subfolder, then find file.txt"
- Task 4: Special shortcuts: `../` means "one folder up" (parent directory), `~/` means "my home folder" (shortcut to /Users/yourname)
- Task 5: Ask Claude "What's the absolute path to progress.json in this project?" - Claude shows you the full address
- Task 6: Understanding paths is crucial because most errors are "file not found" = wrong path (you're looking in the wrong place)

### Lesson 7.5: Terminal Power Moves
- Task 1: Type `history` to see all your past commands (your terminal remembers everything you've ever typed in this session - useful for finding that command you ran yesterday)
- Task 2: Type `!!` and press Enter - it reruns your last command (saves typing when you need to repeat something, or when you forgot `sudo` before a command)
- Task 3: Type `Ctrl + R` then start typing "cd" - this searches your command history backwards (fuzzy search through thousands of commands - press Enter to run the match, Ctrl+R again to find the next match)
- Task 4: Type `ls -la` - the `-la` flags show hidden files (starting with `.`) AND details like size, date modified, permissions (the `l` = long format, `a` = all including hidden)
- Task 5: These shortcuts will save you hundreds of keystrokes over time (experts type less, not more - they use shortcuts and history instead of retyping)

### Lesson 7.6: Reading Error Messages
- Task 1: Type `cd nonexistentfolder` - read the error message carefully: "No such file or directory" = the folder doesn't exist (you tried to go somewhere that isn't there)
- Task 2: Type `cat nonexistentfile.txt` - same error pattern: "No such file" = you tried to read a file that doesn't exist (most errors are this clear if you actually read them)
- Task 3: Type `npm install fake-package-that-doesnt-exist-12345` and wait for the error - "404 Not Found" = the package doesn't exist on npm's servers (404 is the internet's "not found" code)
- Task 4: Ask Claude "What are the 5 most common terminal errors and what do they mean?" - learn to recognize these patterns
- Task 5: Errors aren't scary - they're the computer telling you exactly what went wrong and often how to fix it (reading errors carefully saves hours of confusion)

**Module 7 Complete: Tech Foundation 🏆 | +200 XP | +3 Speed | +10 Aura**

---

## Module 8: Git & Version Control
**Stat Tag: Accuracy** | **Badge: Version Controller 🏆**

### Lesson 8.1: What Is Version Control?
- Task 1: Ask Claude "Explain version control like I'm saving a video game - what are save points?" - Claude will explain Git in gaming terms
- Task 2: Git = a tool that creates save points (called "commits") for your code - you can go back to any save point if something breaks (time travel for code)
- Task 3: Every professional developer uses Git because projects get messy - files change, experiments fail, bugs appear - Git lets you undo anything (like unlimited save slots in a game)
- Task 4: Type `git --version` to confirm Git is installed - you should see something like "git version 2.30.0" (comes pre-installed on Mac)

### Lesson 8.2: Your First Repository
- Task 1: Make sure you're in your Claude Code 101 folder - type `pwd` to check the path
- Task 2: Type `git init` - this turns your regular folder into a Git repository (Git starts watching for changes, like activating autosave in a game)
- Task 3: You'll see "Initialized empty Git repository" - this means Git is now tracking this folder
- Task 4: Type `git status` - it shows all your files as "untracked" in red (Git sees them but isn't saving them yet)
- Task 5: Type `git add .` - this stages ALL files, preparing them for the first save (the dot means "everything in this folder")
- Task 6: Type `git status` again - now the files are green under "Changes to be committed" (ready to save)

### Lesson 8.3: Your First Commit
- Task 1: Type `git commit -m "Initial commit: Claude Code 101 project files"` - this creates your first save point
- Task 2: The `-m` flag adds a message describing what you saved (think of it like naming your save file in a game) - always write clear, descriptive messages so you remember what changed
- Task 3: You'll see output like "3 files changed, 150 insertions" - this summarizes what was saved
- Task 4: Type `git log` to see your save point history - it shows your commit with a unique ID, timestamp, and your message
- Task 5: You just created your first save point - your project is now tracked and you can always come back to this exact moment
- Task 6: Press `q` to exit the log view (it uses a pager if there are many commits)

### Lesson 8.4: Making Changes and Committing
- Task 1: Ask Claude to "Add a comment at the top of hello.txt saying 'Updated on [today's date]'" - Claude modifies the file for you
- Task 2: Type `git status` - hello.txt shows as "modified" in red (changed since last commit - Git detected the difference)
- Task 3: Type `git diff` to see exactly what changed - red lines show removals, green lines show additions (this diff view shows the precise modifications before you commit)
- Task 4: Type `git add hello.txt` to stage the change, then `git commit -m "Update hello.txt with date comment"` to save it (staging lets you choose which changes to include in this commit)
- Task 5: Type `git log` - now you have 2 save points, each with its own ID and timestamp (you can always go back to either version if needed - time travel for code)

### Lesson 8.5: GitHub - Your Code Online
- Task 1: Go to github.com and create an account or sign in (GitHub = the internet's code storage and collaboration platform, used by millions of developers)
- Task 2: Click "New repository", name it "claude-code-101", keep it public, DON'T add a README (you already have files, adding a README would create a conflict)
- Task 3: GitHub shows you commands to run - copy the ones under "push an existing repository from the command line" (these connect your local Git repo to GitHub's server)
- Task 4: Run those commands in your terminal - they set up the connection and upload your commits (your code travels from your laptop to GitHub's servers)
- Task 5: Refresh the GitHub page - your files are now online, backed up, and shareable! (Anyone can see them, clone them, or learn from them - your code is now part of the internet)

### Lesson 8.6: Branching Basics
- Task 1: Type `git branch` - you're on "main" (the primary branch where your stable code lives - shown with a `*` asterisk)
- Task 2: Type `git checkout -b experiment` - creates a new branch called "experiment" and switches to it (the `-b` flag means "create and switch")
- Task 3: Make any small change - ask Claude to edit hello.txt, then commit it (this change exists ONLY on the experiment branch, not on main)
- Task 4: Type `git checkout main` - you switch back to main, and hello.txt is unchanged! (branches are isolated timelines - changes on one branch don't affect others)
- Task 5: Branches let you experiment without risking your main work (like parallel save files in a video game - test risky ideas on a branch, keep main stable, merge successful experiments later)

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
- Task 1: Tell Claude "Create index.html with a basic HTML5 structure. Include a header with my name 'Brady', a nav bar, and three sections: About, Projects, Contact" - Claude writes the HTML for you
- Task 2: Ask Claude to "Explain the key HTML tags you used - what does each one do?" - you'll learn h1 (big heading), nav (navigation menu), section (content blocks), p (paragraphs)
- Task 3: Open it in your browser by typing `open index.html` - your default browser opens with your webpage
- Task 4: It looks plain and unstyled (black text on white background) - that's expected because HTML is just structure, we haven't added design yet (that's CSS in the next lesson)

### Lesson 9.3: CSS Styling Through Claude
- Task 1: Tell Claude "Create styles.css that makes my website look modern. Use a dark background, light text, nice fonts, and good spacing. Link it to index.html" - Claude creates the CSS file AND adds the link tag to your HTML
- Task 2: Refresh your browser (Cmd+R) - see the transformation! The same content now has colors, fonts, layout (this is the power of CSS - design on top of structure)
- Task 3: Don't like something? Tell Claude "Change the background to dark blue instead" or "Make the headings bigger" or "Add more space between sections" - Claude updates the CSS file
- Task 4: Iterate until you like how it looks - change colors, fonts, spacing - this is how real web development works (build, review, tweak, repeat)

### Lesson 9.4: Adding Real Content
- Task 1: Tell Claude "Update the About section with: [write 2-3 sentences about yourself - who you are, what you're learning, what you're interested in]"
- Task 2: Tell Claude "Update the Projects section with a card for 'Claude Code 101' - my first project learning to code with AI, include a brief description" - Claude adds structured project content
- Task 3: Tell Claude "Update the Contact section with a way to reach me" - provide email, Twitter, LinkedIn, GitHub, or whatever you're comfortable sharing
- Task 4: Refresh your browser - you now have a real personal site with YOUR information (not placeholder text, actual content about you)

### Lesson 9.5: Making It Responsive
- Task 1: Ask Claude "Make the website responsive so it looks good on phones too. Use CSS media queries." - Claude adds rules that adapt the layout based on screen size
- Task 2: To test responsiveness: resize your browser window to be very narrow (simulates a phone screen) - watch how the layout adjusts
- Task 3: If anything looks broken on small screens (text overlapping, images too big, unreadable content), tell Claude specifically what to fix
- Task 4: Responsive design = your site works on any screen size (desktop, tablet, phone) - this is professional standard, not optional (most web traffic is mobile now)

### Lesson 9.6: Deploying to the Internet
- Task 1: Ask Claude "Help me deploy this website to GitHub Pages for free" - Claude guides you through the GitHub deployment process
- Task 2: Follow Claude's steps: create a new GitHub repository for your website, push your my-website folder code, enable GitHub Pages in the repository settings
- Task 3: Wait 1-2 minutes for GitHub to build your site, then visit your live URL (usually `yourusername.github.io/repo-name`) - bookmark this!
- Task 4: Your website is LIVE on the actual internet - share the link with friends, family, anyone (this is real deployment, not a local preview)

### Lesson 9.7: Custom Domain (Optional)
- Task 1: If you have a domain name (like yourname.com), ask Claude "How do I point my custom domain to GitHub Pages?" - Claude explains DNS configuration
- Task 2: Follow the DNS setup instructions from your domain registrar (Namecheap, GoDaddy, etc.) - this usually takes 24-48 hours to fully propagate
- Task 3: If you don't have a domain, skip this lesson entirely - the free github.io URL works perfectly fine and looks professional
- Task 4: Either way (custom domain or github.io), you have a live personal website on the internet

### Lesson 9.8: Polish and Ship
- Task 1: Visit your live site and find 3 things to improve (typos, colors, layout, wording, anything you notice)
- Task 2: Tell Claude each fix, one at a time - wait for each to complete before the next (iterate based on what you see in the browser)
- Task 3: Commit your improvements: `git add . && git commit -m "Polish website design and content"` then `git push` to update the live site
- Task 4: Wait a minute, refresh your live site - the changes appear (you just shipped updates to a real product on the internet)
- Task 5: You built a website from scratch, deployed it live, and iterated based on feedback. This is the full product development cycle. Built with Claude Code.

**Module 9 Complete: Web Builder 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 10: Agents - Your AI Specialists
**Stat Tag: Efficiency** | **Badge: Agent Commander 🏆**

### Lesson 10.1: What Are Agents?
- Task 1: Ask Claude "What are agents in Claude Code? Explain like I'm new." - Claude explains the agent system in simple terms
- Task 2: Agents = specialized sub-processes Claude spawns for complex tasks (like hiring specialists for different parts of a big job instead of doing everything yourself)
- Task 3: When you give Claude a big task, it might break it into smaller pieces and send each to a different agent (parallelization and specialization = faster, better results)
- Task 4: Type a complex request: "Look at all files in this project, summarize what each one does, and suggest improvements" - watch the output to see if Claude mentions using agents or breaking down the task

### Lesson 10.2: When Claude Spawns Agents
- Task 1: Simple tasks (1 file, 1 action) = Claude handles directly without agents (faster for small work, no overhead)
- Task 2: Complex tasks (multiple files, research + action, big analysis) = Claude may spawn agents to parallelize the work (each agent handles one piece)
- Task 3: Try this complex task: "Search this entire project for any TODO comments, incomplete features, or things that need fixing" - this often triggers agent use because it requires analyzing many files
- Task 4: Notice in the output if you see mentions of "Agent", "task delegation", or Claude explaining it's breaking down the work (behavior may vary by Claude version)

### Lesson 10.3: Reading Agent Output
- Task 1: When agents run, you might see their progress and intermediate results (depends on Claude version and verbosity settings)
- Task 2: Ask Claude "Run a thorough review of my website files - check HTML structure, CSS quality, responsive design, and accessibility" - this multi-faceted analysis may use agents
- Task 3: Read the output carefully - if agents were used, you might see each agent's findings organized by category (HTML issues, CSS issues, etc.)
- Task 4: The final answer combines all agent findings into one coherent response - you don't have to piece it together yourself, Claude synthesizes the results

### Lesson 10.4: Controlling Agent Behavior
- Task 1: You can guide Claude's approach: "Do this step by step, showing me each step" - this reduces agent delegation (Claude walks you through the process, more transparency)
- Task 2: Or: "Handle this completely and just show me the final result" - this increases agent delegation (Claude optimizes for speed, less visibility into intermediate steps)
- Task 3: Practice both approaches on the same task and compare: try "Analyze my website step by step" vs "Analyze my website and give me the summary" - notice the difference in output style
- Task 4: You control the tradeoff: more detail and understanding (step-by-step) vs. faster results and less noise (final result only)

### Lesson 10.5: Multi-Agent Workflows
- Task 1: Ask Claude "Create a complete landing page for a product called 'AI Study Buddy'. Research similar products, design the layout, write compelling copy, and create the HTML/CSS files" - this is a big, multi-faceted task
- Task 2: This complex task may involve multiple agents working in parallel (research agent finds examples, design agent creates layout, code agent writes HTML/CSS) - parallelization speeds up completion
- Task 3: Review the result - notice how the different aspects came together cohesively: research informed the design, design influenced the copy, everything works as one polished product
- Task 4: Clean up the test files after reviewing: ask Claude to "delete the AI Study Buddy files" - multi-agent workflows = complex tasks made simple through specialization

**Module 10 Complete: Agent Commander 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 11: MCP - Connecting External Tools
**Stat Tag: Efficiency** | **Badge: MCP Specialist 🏆**

### Lesson 11.1: What Is MCP?
- Task 1: MCP = Model Context Protocol - think of it as a plugin system that expands Claude Code's abilities (like browser extensions add features to Chrome)
- Task 2: Without MCP: Claude can read/write files and run terminal commands (powerful, but limited to your local computer)
- Task 3: With MCP: Claude can talk to GitHub directly, query databases, call APIs, fetch web data, and more (bridges Claude to external services)
- Task 4: Ask Claude "What MCP servers do I currently have configured?" - this shows which plugins are installed (might be none if you're on a fresh install)

### Lesson 11.2: Installing Your First MCP Server
- Task 1: Ask Claude "Help me install the filesystem MCP server so you can better navigate my files" - Claude explains the installation process (this varies by version and system)
- Task 2: Follow the installation steps Claude provides (usually involves npm install and updating a config file) - if you encounter errors, tell Claude what happened
- Task 3: Restart Claude Code to load the new MCP server: exit (Ctrl+C twice or `/exit`) then run `claude` again
- Task 4: Test it: ask Claude "Use your filesystem tools to show me a tree view of this project" - if the MCP server loaded, Claude has enhanced file navigation

### Lesson 11.3: GitHub MCP
- Task 1: Ask Claude "Help me set up the GitHub MCP server so you can interact with my repositories" - Claude guides you through GitHub authentication and MCP installation
- Task 2: This lets Claude create issues, review pull requests, manage repos, check CI status - all without you leaving the terminal (GitHub API access through conversation)
- Task 3: After setup and restart, test: "Create an issue on my claude-code-101 repo titled 'Add more lessons' with description 'Brainstorm ideas for Module 16'"
- Task 4: Check GitHub in your browser - the issue should be there with your title and description. Claude can now manage your GitHub directly through MCP.

### Lesson 11.4: Using MCP Tools in Conversations
- Task 1: With MCP servers installed, Claude has more tools available beyond file operations (check available tools to see what's possible now)
- Task 2: Ask Claude "What tools do you have available right now?" - Claude lists all MCP tools it can use (GitHub, filesystem, database, etc.)
- Task 3: Try using a tool directly: "Use your GitHub tool to list all my public repositories" - Claude calls the GitHub API through MCP and shows results
- Task 4: MCP expands what Claude can do without you leaving the terminal (no browser switching, no API calls from your command line - Claude handles it all)

### Lesson 11.5: Finding and Adding New MCPs
- Task 1: Ask Claude "What are the most useful MCP servers available for developers?" - Claude recommends popular ones (Slack, databases, web search, etc.)
- Task 2: Pick one that sounds useful for your workflow (if you use Slack, get the Slack MCP; if you work with databases, get the database MCP)
- Task 3: Install it together with Claude's help - follow the same pattern: install, configure, restart Claude Code, test
- Task 4: MCP is how you customize Claude Code to YOUR specific needs - the more relevant MCPs you add, the more powerful Claude becomes for your work (build your own custom AI toolkit)

**Module 11 Complete: MCP Specialist 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 12: Advanced Patterns
**Stat Tag: Accuracy** | **Badge: Advanced Practitioner 🏆**

### Lesson 12.1: Claude Code in Existing Projects
- Task 1: Navigate to your website folder: `cd my-website` (or any project folder you've created)
- Task 2: Start Claude Code there: `claude` - Claude opens in the context of that folder
- Task 3: Type "Analyze this project. What's the file structure, what technology is used, and what could be improved?" - Claude reads all files and understands the project
- Task 4: Claude understands existing projects automatically - you can drop it into ANY folder (your code, downloaded projects, work projects) and it figures out what's there by reading the files

### Lesson 12.2: Debugging with Claude
- Task 1: Ask Claude to "Add a broken JavaScript function to my website that has a subtle bug in it" - Claude creates intentionally buggy code for practice (this is a safe way to learn debugging)
- Task 2: Then ask "I think there's a bug in my JavaScript. The function isn't working as expected. Can you find and fix it?" - don't tell Claude what the bug is
- Task 3: Watch how Claude reads the code, identifies the issue (maybe a typo, logic error, or wrong variable), and proposes a fix with explanation
- Task 4: This is real debugging workflow in professional development - describe symptoms, let the AI (or colleague) investigate root cause, review proposed fix
- Task 5: Clean up: ask Claude to "remove the test JavaScript" or undo the changes

### Lesson 12.3: Code Review with Claude
- Task 1: Ask Claude "Review my index.html as if you were a senior developer. Be honest about what's good and what could be better - check semantics, accessibility, best practices." - this gets a thorough review
- Task 2: Read the feedback carefully - Claude gives constructive criticism (both praise for good choices and suggestions for improvement)
- Task 3: Pick one suggestion and implement it: tell Claude "Let's implement your suggestion about [specific item]" - work through the improvement together
- Task 4: Code review = getting expert feedback before shipping (catches bugs, improves quality, teaches better patterns) - Claude is an always-available, patient reviewer who never judges

### Lesson 12.4: Refactoring with Claude
- Task 1: Ask Claude "Is there any repetitive or messy code in my website files? Show me specific examples." - Claude analyzes for code smells (duplication, inconsistency, poor structure)
- Task 2: If found, ask: "Refactor it to be cleaner while keeping the exact same functionality" - Claude improves code structure without changing behavior
- Task 3: Verify the website still works after refactoring - refresh browser, test all features (this proves refactoring was safe, no breakage)
- Task 4: Refactoring = making code better (more readable, maintainable, efficient) without changing what it does - crucial professional skill that prevents technical debt

### Lesson 12.5: Testing Strategies
- Task 1: Ask Claude "How would I test that my website works correctly? Give me a comprehensive testing checklist." - Claude creates a QA plan
- Task 2: Claude suggests manual tests: all links work, responsive on different sizes, content has no typos, forms work, images load, accessibility passes, cross-browser compatibility
- Task 3: Go through the checklist together - check each item on your live site (actually click links, resize window, check on phone if possible)
- Task 4: Testing = making sure things work before users see them (professionals test everything, every time) - shipping broken code damages reputation and user trust

### Lesson 12.6: Performance Optimization
- Task 1: Ask Claude "Analyze my website for performance. How fast does it load? What could be faster? Suggest specific optimizations." - Claude reviews file sizes, rendering, resource loading
- Task 2: Implement one optimization Claude suggests - common wins: compress images, minify CSS/JS, reduce HTTP requests, lazy load images, optimize fonts
- Task 3: Compare before/after if possible - check file sizes (`ls -lh` shows file sizes) or use browser dev tools to measure load time
- Task 4: Fast websites = happy users and better SEO rankings - every 100 milliseconds matters for user experience (slow sites lose visitors before content even loads)

**Module 12 Complete: Advanced Practitioner 🏆 | +200 XP | +3 Accuracy | +10 Aura**

---

## Module 13: Shipping Real Products
**Stat Tag: Creativity** | **Badge: Product Shipper 🏆**

### Lesson 13.1: From Idea to Plan
- Task 1: Think of something YOU actually want to build - a tool for yourself, a website for a hobby, an app idea that solves a real problem you have (not a fake project - something you'd actually use)
- Task 2: Tell Claude your idea and ask "Help me break this into small buildable pieces - prioritize by what's essential vs nice-to-have" - Claude creates a project roadmap
- Task 3: Review the plan together - is it realistic for your skill level? What's the absolute smallest version that would still be useful? (cut features until you have the core)
- Task 4: This smallest useful version is called an MVP (Minimum Viable Product) - if Instagram's MVP was just "share a photo", what's YOUR project's MVP?

### Lesson 13.2: Building Your MVP
- Task 1: Take the first piece from your plan and build it with Claude - start with the core feature (the ONE thing your project absolutely must do)
- Task 2: Keep it brutally simple - if you catch yourself adding "nice to have" features, STOP (those come later, after the MVP works)
- Task 3: Build just enough to demonstrate the core idea works - ugly is fine, basic is fine, as long as it functions (polish comes after validation)
- Task 4: When the basic version works, commit it: `git add . && git commit -m "MVP: [your project name] - core functionality working"` - this is your first real product milestone

### Lesson 13.3: Iterating Based on Feedback
- Task 1: Actually USE your MVP yourself - find 3 things that are annoying, confusing, or could work better (real usage reveals real problems)
- Task 2: Prioritize ruthlessly: which ONE improvement would make the biggest difference to actual users? (not the prettiest, not the easiest - the most impactful)
- Task 3: Build that one improvement with Claude - implement, test, verify it actually made things better
- Task 4: This is the build-measure-learn loop (Eric Ries, Lean Startup) - ship fast, get feedback, improve based on real data, repeat forever

### Lesson 13.4: Deployment and Maintenance
- Task 1: Deploy your MVP to the internet - use GitHub Pages, or ask Claude "What are free hosting options for [your project type]?" (Netlify, Vercel, Heroku free tier)
- Task 2: Share the live link with someone who would actually use it - ask for HONEST feedback (not "it's great!" but "what's confusing? what's broken? what's missing?")
- Task 3: Make one fix based on their most critical feedback - deploy the update, ask them to try again
- Task 4: You've now completed the entire product lifecycle: idea → plan → build → deploy → get feedback → improve → deploy again. This is exactly how real products are made, from startups to big tech.

**Module 13 Complete: Product Shipper 🏆 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 14: Ralph Wiggum Mode - Autonomous Loops
**Stat Tag: Efficiency** | **Badge: Autonomous Operator 🏆**

### Lesson 14.1: What Is Autonomous Mode?
- Task 1: Sometimes you want Claude to tackle a big task without stopping to ask permission for every single file change (faster results, less interruption)
- Task 2: Autonomous mode = Claude runs multiple steps in a row, making decisions independently, only stopping when done or stuck (like delegating to a capable assistant)
- Task 3: Ask Claude "How do I enable autonomous mode so you can work without asking permission for each file change?" - Claude explains the permission settings
- Task 4: This is nicknamed "Ralph Wiggum mode" (after the Simpsons character) - Claude goes on autopilot and does its best (trust required, but powerful for big tasks)

### Lesson 14.2: Setting Up a Long-Running Task
- Task 1: Give Claude a substantial task: "Refactor my entire website to use semantic HTML5 tags (header, nav, main, article, section, footer). Update all HTML files and adjust CSS to match." - this touches many files
- Task 2: Grant permissions for Claude to run without stopping - when prompted, approve autonomous operation (you're giving Claude permission to make multiple changes without asking each time)
- Task 3: Watch Claude work through multiple files and steps automatically - you'll see file changes happening rapidly without interruption (this is the speed benefit)
- Task 4: Review the results when Claude reports completion - open files, check the browser, verify it did what you wanted (always review autonomous work)

### Lesson 14.3: Monitoring and Guiding
- Task 1: Start another autonomous task: "Add 3 more project cards to my website's Projects section with descriptions and links" - Claude begins working
- Task 2: While Claude works, you can still interrupt and redirect: type "Actually, make them about open source projects I admire instead of my own projects" - Claude adjusts mid-task
- Task 3: You're not completely hands-off - autonomous doesn't mean uncontrollable (you can guide, correct, or stop at any time while Claude handles the implementation details)
- Task 4: Think of it like being a director: you set the vision and make creative decisions, Claude handles the execution and technical work (collaboration at speed)

### Lesson 14.4: When to Use vs. Hands-On
- Task 1: Autonomous is good for: repetitive tasks (updating 20 files the same way), big refactors (restructuring entire codebase), bulk changes (renaming variables everywhere), research (analyzing many files)
- Task 2: Hands-on is better for: learning new concepts (you need to see each step), creative decisions (design choices require your input), sensitive changes (security, data, critical features)
- Task 3: Practice: look back at tasks you've done - which would have been faster autonomous? Which needed your direct involvement at each step?
- Task 4: You now have both modes in your toolkit: careful step-by-step for learning and precision, full-speed autonomous for execution and scale. Use the right tool for the job.

**Module 14 Complete: Autonomous Operator 🏆 | +200 XP | +3 Efficiency | +10 Aura**

---

## Module 15: You're a Builder Now
**Stat Tag: Creativity** | **Badge: Claude Code Graduate 🎓**

### Lesson 15.1: Review of Your Journey
- Task 1: Ask Claude "List every skill I've learned across all 15 modules of Claude Code 101, organized by category" - Claude creates a comprehensive skill inventory
- Task 2: Read through the entire list - terminal fluency, Git, web development, AI prompting, debugging, deployment - you went from complete beginner to all of this
- Task 3: Pick the skill you're most proud of learning and tell Claude why it matters to you (what can you do now that you couldn't before?)
- Task 4: Reflect on the distance traveled: you've gone from "what's a terminal?" to building, deploying, and autonomously managing real projects with an AI pair programmer

### Lesson 15.2: Building Your Next Project
- Task 1: Think of your next project - something YOU actually want to exist in the world (not a tutorial, not an exercise - a real thing you'll use or share)
- Task 2: Use everything you've learned: plan mode for exploring approaches, specific prompts for better results, Git for version control, autonomous mode for speed, deployment for shipping
- Task 3: Start building it RIGHT NOW with Claude - don't wait for perfect conditions or more knowledge - you know enough to build real things
- Task 4: You don't need a course anymore. You don't need permission. You have the skills and the AI pair programmer. Just build.

### Lesson 15.3: The Endless Path
- Task 1: After Level 8, endless levels continue (every 1000 XP = new level) - your skill tree keeps growing, your Aura keeps climbing, your capabilities keep expanding (there's always more to master)
- Task 2: Ask Claude "What advanced Claude Code features or techniques haven't I explored yet? What's beyond the curriculum?" - Claude reveals the deep end
- Task 3: Pick one advanced topic and try it right now - dive into something you're curious about (no tutorial required, just explore with Claude as your guide)
- Task 4: The learning never stops, but now you know HOW to learn anything with Claude Code - research with Claude, experiment safely, iterate quickly, ship confidently. That's the real graduation: not knowledge, but the ability to acquire any knowledge.

**Module 15 Complete: Claude Code Graduate 🎓 | +200 XP | +3 Creativity | +10 Aura**

---

## Module 16: The Latest (Coming Later)
**Status: Placeholder - Weekly rotating content not yet implemented**

This module will contain:
- Weekly rotating challenges and tasks (fresh content keeps skills sharp)
- New Claude Code features as they're released (staying current with the tool)
- Community challenges when leaderboards launch (competitive motivation)
- Seasonal event lessons (themed content for variety)
- Advanced topics on demand (deep dives based on interest)

For now, students who reach this point should:
1. Continue earning XP through sandbox mode (free exploration reinforces skills)
2. Build personal projects (real-world application is the best teacher)
3. Explore advanced features on their own (curiosity-driven learning)
4. Return when new content is added (this module evolves over time)

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
