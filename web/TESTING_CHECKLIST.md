# Epic Terminal Onboarding - Testing Checklist

## ✅ Quick Test (5 minutes)

Open `web/index.html` in your browser and verify:

### Landing Page
- [ ] Particles floating (cyan, gold, purple)
- [ ] Stars drifting in background
- [ ] "Begin Your Quest" button visible

### Transition
- [ ] Click "Begin Your Quest"
- [ ] Button glows brightly
- [ ] 30 particles explode outward
- [ ] "Connecting to Terminal..." appears
- [ ] Smooth fade to terminal page

### Terminal Page Load
- [ ] Stars drifting
- [ ] 40 particles floating
- [ ] Terminal zooms in smoothly
- [ ] Welcome modal appears OR character creation (if returning user)

### Character Creation
- [ ] Click "Let's Go!" in welcome modal
- [ ] Character creation modal appears
- [ ] 3 color choices visible (Cyan, Gold, Purple)
- [ ] Each choice has color preview circle
- [ ] Click one color (e.g., Cyan)

### Avatar Appearance
- [ ] Avatar appears above terminal (floating)
- [ ] Avatar is doing gentle bob animation
- [ ] Speech bubble appears: "Ready for adventure!"
- [ ] Avatar color matches your choice

### First Command
- [ ] Input field is pulsing/glowing (cyan glow)
- [ ] Instruction banner shows: "👉 YOUR TURN: Type..."
- [ ] Command is in cyan box with border
- [ ] "⏎ Enter" is in green

### Command Success
Type `echo "hello"` and press Enter:
- [ ] **EXPLOSION!** 12 particles burst from input
- [ ] Screen flashes white briefly
- [ ] Avatar jumps (happy animation)
- [ ] Speech bubble: "YES! 🎉" or similar
- [ ] "+1 XP" floats up next to input
- [ ] Terminal shows: `hello`
- [ ] Explanation text appears

### Quest 1 Completion
Complete both commands in Quest 1:
- [ ] Avatar does victory spin (360°)
- [ ] Large "+10 XP" floats up center
- [ ] Quest complete modal appears
- [ ] "QUEST 1 COMPLETE!" title
- [ ] "The Blinking Cursor" subtitle
- [ ] "+10 XP" shown
- [ ] Auto-countdown from 5
- [ ] Click "Continue" button

### Quest Progress
- [ ] Quest progress card shows "QUEST 2/5"
- [ ] Progress bar fills smoothly
- [ ] XP number updates
- [ ] New instructions appear

### Evolution (After Quest 3)
Complete quests 1, 2, and 3:
- [ ] After Quest 3, avatar does special animation
- [ ] Avatar fades out with spin
- [ ] Particle explosion at avatar
- [ ] Avatar fades in (larger, more detailed)
- [ ] Speech bubble: "I've grown stronger!" or similar
- [ ] New sprite visible (Trainee stage)

### Returning User
Close and reopen `web/terminal.html`:
- [ ] No welcome modal (remembers you)
- [ ] Avatar appears immediately
- [ ] Correct color loaded
- [ ] Correct stage loaded (Recruit/Trainee/Adventurer)
- [ ] Progress restored (current quest)

---

## 🐛 Known Issues to Ignore

### SVG Placeholders
- Avatar sprites are simple geometric shapes (circle with face)
- This is intentional - real pixel art comes later
- Functionality works perfectly

### Browser Console
You may see:
- "Failed to load sprite-config.json" on first load (expected)
- Avatar uses default config if this happens
- No impact on functionality

---

## 🎯 What Good Looks Like

### Timing
- Page load: <1 second
- Transition: ~2.5 seconds total (feels cinematic, not slow)
- Character creation: 3 seconds (click color → avatar appears)
- First interaction: ~8 seconds from landing

### Smoothness
- Particle animations: 60fps (smooth, no jank)
- Avatar animations: Smooth transitions
- Explosions: No lag
- No freezing at any point

### Feel
- "This feels like a game!"
- Clear what to do next
- Rewarding feedback on every action
- Avatar feels like "your" companion
- Excited to continue

---

## 🚨 If Something's Wrong

### Avatar doesn't appear
- Check browser console for errors
- Verify `web/js/avatar-system.js` exists
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### Particles not showing
- Check browser console
- Verify `web/css/terminal.css` loaded
- Try different browser

### Explosions not working
- Check browser console for JavaScript errors
- Verify `createSuccessExplosion()` method exists in terminal-sim.js

### Speech bubbles not showing
- Check avatar-system.js loaded
- Check speech bubble CSS in terminal.css
- Try clicking a command again

### Evolution not triggering
- Must complete full quests (not skip)
- Triggers after Quest 3 completion
- Check totalXP and currentQuest values in localStorage

---

## 📊 Performance Check

Open DevTools → Performance tab:
1. Start recording
2. Complete one command
3. Stop recording
4. Verify:
   - Particle animations at 60fps
   - No long tasks (>50ms)
   - No frame drops

---

## 💾 LocalStorage Check

Open DevTools → Application → Local Storage:

You should see:
- `cc101_terminal_visited`: "true"
- `cc101_avatar`: JSON with {stage, color, created_at}
- `cc101_terminal_progress`: JSON with {currentQuest, currentStep, totalXP}

---

## ✅ Success Criteria

All these should be true:
- [ ] Page loads in <1s
- [ ] Visual continuity from landing → terminal
- [ ] Character creation takes <5s
- [ ] First command within 10s of landing
- [ ] Explosions on every correct command
- [ ] Avatar reacts appropriately
- [ ] Quest celebrations feel epic
- [ ] Evolution animation is dramatic
- [ ] Everything runs at 60fps
- [ ] No freezing or lag

---

## 🎉 You're Done!

If all checkboxes are checked, the epic terminal onboarding is **working perfectly**!

Next steps:
1. Test with a non-technical friend
2. Watch their first 30 seconds
3. Note any confusion points
4. Optionally: Generate pixel art sprites
5. Ship it! 🚀
