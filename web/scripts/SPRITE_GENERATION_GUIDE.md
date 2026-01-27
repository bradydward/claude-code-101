# Avatar Sprite Generation Guide

Complete workflow for generating and integrating 36 pixel art sprites for the Claude Code 101 avatar system.

---

## Quick Start

**Goal:** Generate 36 pixel art sprites (3 stages × 3 colors × 4 emotions)

**Tools Created:**
- `rename-sprites.sh` - Interactive batch rename tool
- `validate-sprites.js` - Verify all sprites are present and valid
- Updated `avatar-system.js` - Now loads PNG sprites with SVG fallback

**Time Required:** ~2.5 hours over 3 days (or 1 day if batched)

---

## Part 1: Choose Your Generation Method

### Option A: Leonardo.ai (Recommended) ⭐

**Pros:**
- Free tier: 150 tokens/day (~30 images)
- Excellent pixel art quality
- Web-based, no setup
- Generate 4 variations per prompt

**Setup:**
1. Go to https://leonardo.ai
2. Sign up (free account)
3. Select "Pixel Art XL" model

**Daily Strategy:**
- Day 1: Generate Recruit sprites (12 total)
- Day 2: Generate Trainee sprites (12 total)
- Day 3: Generate Adventurer sprites (12 total)

### Option B: Bing Image Creator (Free, Unlimited)

**Pros:**
- Completely free
- Unlimited generations (slower queue)
- Powered by DALL-E 3

**Setup:**
1. Go to https://bing.com/create
2. Sign in with Microsoft account
3. Use prompts from Part 2

**Note:** Quality varies more than Leonardo.ai

### Option C: Stable Diffusion (Advanced)

**Pros:**
- Unlimited free generation
- Best quality control
- PixelArt LoRA models

**Cons:**
- 30-60 min setup
- Requires ~10GB disk space
- Needs decent GPU (or slow CPU generation)

**Setup:** See full guide in plan document

---

## Part 2: Generation Prompts

All 36 prompts are organized by:
- **Stage:** recruit → trainee → adventurer
- **Color:** cyan → gold → purple
- **Emotion:** idle → happy → confused → victory

### Recruit Stage (12 sprites)

**Concept:** Small pixel human with tiny robot companion - both just starting their journey together!

Copy-paste these prompts into your chosen AI tool:

#### Cyan Color (4 sprites)

**recruit-cyan-idle:**
```
32x32 pixel art, small human character with tiny robot companion floating beside them, cyan blue color scheme, idle standing pose together, simple design, retro game sprite, transparent background, beginner adventurer with helper bot, RPG game asset --style pixelart
```

**recruit-cyan-happy:**
```
32x32 pixel art, small human character with tiny robot companion, both celebrating together, cyan blue color scheme, happy jumping pose with arms raised, robot floating excitedly, simple design, retro game sprite, transparent background, joyful duo, RPG game asset --style pixelart
```

**recruit-cyan-confused:**
```
32x32 pixel art, small human character with tiny robot companion, both looking puzzled, cyan blue color scheme, confused pose with question marks, robot tilted, simple design, retro game sprite, transparent background, confused learners, RPG game asset --style pixelart
```

**recruit-cyan-victory:**
```
32x32 pixel art, small human character with tiny robot companion, both in victory pose, cyan blue color scheme, arms raised triumphantly, robot spinning happily, simple design, retro game sprite, transparent background, celebration duo, RPG game asset --style pixelart
```

#### Gold Color (4 sprites)

**recruit-gold-idle:**
```
32x32 pixel art, small human character with tiny robot companion floating beside them, golden yellow color scheme, idle standing pose together, simple design, retro game sprite, transparent background, beginner adventurer with helper bot, RPG game asset --style pixelart
```

**recruit-gold-happy:**
```
32x32 pixel art, small human character with tiny robot companion, both celebrating together, golden yellow color scheme, happy jumping pose with arms raised, robot floating excitedly, simple design, retro game sprite, transparent background, joyful duo, RPG game asset --style pixelart
```

**recruit-gold-confused:**
```
32x32 pixel art, small human character with tiny robot companion, both looking puzzled, golden yellow color scheme, confused pose with question marks, robot tilted, simple design, retro game sprite, transparent background, confused learners, RPG game asset --style pixelart
```

**recruit-gold-victory:**
```
32x32 pixel art, small human character with tiny robot companion, both in victory pose, golden yellow color scheme, arms raised triumphantly, robot spinning happily, simple design, retro game sprite, transparent background, celebration duo, RPG game asset --style pixelart
```

#### Purple Color (4 sprites)

**recruit-purple-idle:**
```
32x32 pixel art, small human character with tiny robot companion floating beside them, purple violet color scheme, idle standing pose together, simple design, retro game sprite, transparent background, beginner adventurer with helper bot, RPG game asset --style pixelart
```

**recruit-purple-happy:**
```
32x32 pixel art, small human character with tiny robot companion, both celebrating together, purple violet color scheme, happy jumping pose with arms raised, robot floating excitedly, simple design, retro game sprite, transparent background, joyful duo, RPG game asset --style pixelart
```

**recruit-purple-confused:**
```
32x32 pixel art, small human character with tiny robot companion, both looking puzzled, purple violet color scheme, confused pose with question marks, robot tilted, simple design, retro game sprite, transparent background, confused learners, RPG game asset --style pixelart
```

**recruit-purple-victory:**
```
32x32 pixel art, small human character with tiny robot companion, both in victory pose, purple violet color scheme, arms raised triumphantly, robot spinning happily, simple design, retro game sprite, transparent background, celebration duo, RPG game asset --style pixelart
```

### Trainee Stage (12 sprites)

**Concept:** Human with gear (backpack, hat) and larger robot companion - growing partnership, working together!

#### Cyan Color (4 sprites)

**trainee-cyan-idle:**
```
64x64 pixel art, human adventurer with backpack and hat standing with robot companion, cyan blue color scheme, idle pose together, robot has more features and arms, detailed pixel art, Stardew Valley style, transparent background, learning duo growing stronger, RPG game sprite --style pixelart
```

**trainee-cyan-happy:**
```
64x64 pixel art, human adventurer with backpack and robot companion celebrating, cyan blue color scheme, happy jumping pose, robot showing joy with lights, detailed pixel art, Stardew Valley style, transparent background, excited partnership, RPG game sprite --style pixelart
```

**trainee-cyan-confused:**
```
64x64 pixel art, human adventurer with backpack and robot companion both puzzled, cyan blue color scheme, confused pose with question marks, robot tilting with antenna down, detailed pixel art, Stardew Valley style, transparent background, stuck together, RPG game sprite --style pixelart
```

**trainee-cyan-victory:**
```
64x64 pixel art, human adventurer with backpack and robot companion in victory pose, cyan blue color scheme, arms raised with sparkles, robot glowing triumphantly, detailed pixel art, Stardew Valley style, transparent background, breakthrough moment, RPG game sprite --style pixelart
```

#### Gold Color (4 sprites)

**trainee-gold-idle:**
```
64x64 pixel art, human adventurer with backpack and hat standing with robot companion, golden yellow color scheme, idle pose together, robot has more features and arms, detailed pixel art, Stardew Valley style, transparent background, learning duo growing stronger, RPG game sprite --style pixelart
```

**trainee-gold-happy:**
```
64x64 pixel art, human adventurer with backpack and robot companion celebrating, golden yellow color scheme, happy jumping pose, robot showing joy with lights, detailed pixel art, Stardew Valley style, transparent background, excited partnership, RPG game sprite --style pixelart
```

**trainee-gold-confused:**
```
64x64 pixel art, human adventurer with backpack and robot companion both puzzled, golden yellow color scheme, confused pose with question marks, robot tilting with antenna down, detailed pixel art, Stardew Valley style, transparent background, stuck together, RPG game sprite --style pixelart
```

**trainee-gold-victory:**
```
64x64 pixel art, human adventurer with backpack and robot companion in victory pose, golden yellow color scheme, arms raised with sparkles, robot glowing triumphantly, detailed pixel art, Stardew Valley style, transparent background, breakthrough moment, RPG game sprite --style pixelart
```

#### Purple Color (4 sprites)

**trainee-purple-idle:**
```
64x64 pixel art, human adventurer with backpack and hat standing with robot companion, purple violet color scheme, idle pose together, robot has more features and arms, detailed pixel art, Stardew Valley style, transparent background, learning duo growing stronger, RPG game sprite --style pixelart
```

**trainee-purple-happy:**
```
64x64 pixel art, human adventurer with backpack and robot companion celebrating, purple violet color scheme, happy jumping pose, robot showing joy with lights, detailed pixel art, Stardew Valley style, transparent background, excited partnership, RPG game sprite --style pixelart
```

**trainee-purple-confused:**
```
64x64 pixel art, human adventurer with backpack and robot companion both puzzled, purple violet color scheme, confused pose with question marks, robot tilting with antenna down, detailed pixel art, Stardew Valley style, transparent background, stuck together, RPG game sprite --style pixelart
```

**trainee-purple-victory:**
```
64x64 pixel art, human adventurer with backpack and robot companion in victory pose, purple violet color scheme, arms raised with sparkles, robot glowing triumphantly, detailed pixel art, Stardew Valley style, transparent background, breakthrough moment, RPG game sprite --style pixelart
```

### Adventurer Stage (12 sprites)

**Concept:** Confident hero with full gear and powerful AI robot partner - unstoppable team at peak performance!

#### Cyan Color (4 sprites)

**adventurer-cyan-idle:**
```
128x128 pixel art, confident human hero with armor and weapon standing with advanced robot AI partner, cyan blue color scheme, idle pose side by side, robot sleek and powerful with glowing elements, high quality pixel art, Celeste game style, transparent background, elite partnership, professional quality --style pixelart
```

**adventurer-cyan-happy:**
```
128x128 pixel art, human hero with armor and advanced robot AI celebrating together, cyan blue color scheme, both jumping in victory, robot with energy effects, high quality pixel art, Celeste game style, transparent background, triumphant duo at their peak, professional quality --style pixelart
```

**adventurer-cyan-confused:**
```
128x128 pixel art, human hero with armor and advanced robot AI both puzzled, cyan blue color scheme, confused pose with question marks, robot scanning with sensors, high quality pixel art, Celeste game style, transparent background, problem-solving together, professional quality --style pixelart
```

**adventurer-cyan-victory:**
```
128x128 pixel art, human hero with armor raising weapon and advanced robot AI in epic victory pose, cyan blue color scheme, sparkle effects and energy glow, high quality pixel art, Celeste game style, transparent background, ultimate celebration, professional quality --style pixelart
```

#### Gold Color (4 sprites)

**adventurer-gold-idle:**
```
128x128 pixel art, confident human hero with armor and weapon standing with advanced robot AI partner, golden yellow color scheme, idle pose side by side, robot sleek and powerful with glowing elements, high quality pixel art, Celeste game style, transparent background, elite partnership, professional quality --style pixelart
```

**adventurer-gold-happy:**
```
128x128 pixel art, human hero with armor and advanced robot AI celebrating together, golden yellow color scheme, both jumping in victory, robot with energy effects, high quality pixel art, Celeste game style, transparent background, triumphant duo at their peak, professional quality --style pixelart
```

**adventurer-gold-confused:**
```
128x128 pixel art, human hero with armor and advanced robot AI both puzzled, golden yellow color scheme, confused pose with question marks, robot scanning with sensors, high quality pixel art, Celeste game style, transparent background, problem-solving together, professional quality --style pixelart
```

**adventurer-gold-victory:**
```
128x128 pixel art, human hero with armor raising weapon and advanced robot AI in epic victory pose, golden yellow color scheme, sparkle effects and energy glow, high quality pixel art, Celeste game style, transparent background, ultimate celebration, professional quality --style pixelart
```

#### Purple Color (4 sprites)

**adventurer-purple-idle:**
```
128x128 pixel art, confident human hero with armor and weapon standing with advanced robot AI partner, purple violet color scheme, idle pose side by side, robot sleek and powerful with glowing elements, high quality pixel art, Celeste game style, transparent background, elite partnership, professional quality --style pixelart
```

**adventurer-purple-happy:**
```
128x128 pixel art, human hero with armor and advanced robot AI celebrating together, purple violet color scheme, both jumping in victory, robot with energy effects, high quality pixel art, Celeste game style, transparent background, triumphant duo at their peak, professional quality --style pixelart
```

**adventurer-purple-confused:**
```
128x128 pixel art, human hero with armor and advanced robot AI both puzzled, purple violet color scheme, confused pose with question marks, robot scanning with sensors, high quality pixel art, Celeste game style, transparent background, problem-solving together, professional quality --style pixelart
```

**adventurer-purple-victory:**
```
128x128 pixel art, human hero with armor raising weapon and advanced robot AI in epic victory pose, purple violet color scheme, sparkle effects and energy glow, high quality pixel art, Celeste game style, transparent background, ultimate celebration, professional quality --style pixelart
```

---

## Part 3: Organize & Rename

### Step 1: Download Sprites

After generating each sprite:
1. Download the best variation (of 4 generated)
2. Save to a folder (e.g., `~/Downloads/claude-sprites/`)
3. Keep original names from AI tool

### Step 2: Batch Rename

Use the interactive rename script:

```bash
bash web/scripts/rename-sprites.sh
```

**What it does:**
1. Prompts you for the download folder location
2. Shows all PNG files with numbers
3. For each of 36 sprite slots, you assign a file number
4. Renames and copies to `web/assets/characters/`

**Tips:**
- Have the generation checklist handy (see Part 5)
- You can skip sprites and do them later
- Files are copied (originals kept safe)

---

## Part 4: Validate & Test

### Step 1: Run Validation

```bash
node web/scripts/validate-sprites.js
```

**What it checks:**
- All 36 files exist
- All are valid PNG format
- File sizes are reasonable
- Shows completion percentage
- Lists missing/invalid sprites

### Step 2: Visual Test

Open the terminal simulator:

```bash
open web/terminal.html
```

**Test checklist:**
1. **Character creation:**
   - Create character with each color (cyan, gold, purple)
   - Verify sprite loads (not placeholder SVG)

2. **Emotion changes:**
   - Type correct command → Happy sprite shows
   - Type wrong command → Confused sprite shows
   - Complete quest → Victory sprite shows
   - Wait between actions → Idle sprite shows

3. **Evolution stages:**
   - Complete Quest 1-2 → Recruit stage visible
   - Complete Quest 3-4 → Evolves to Trainee
   - Complete Quest 5 → Evolves to Adventurer

4. **Visual quality:**
   - Sprites look crisp (pixelated style preserved)
   - Glow effects appear around sprite
   - No white boxes (transparent backgrounds)
   - Animations smooth (bounce, fade, etc.)

---

## Part 5: Generation Checklist

Track your progress as you generate:

### Recruit (12 sprites)
- [ ] recruit-cyan-idle.png
- [ ] recruit-cyan-happy.png
- [ ] recruit-cyan-confused.png
- [ ] recruit-cyan-victory.png
- [ ] recruit-gold-idle.png
- [ ] recruit-gold-happy.png
- [ ] recruit-gold-confused.png
- [ ] recruit-gold-victory.png
- [ ] recruit-purple-idle.png
- [ ] recruit-purple-happy.png
- [ ] recruit-purple-confused.png
- [ ] recruit-purple-victory.png

### Trainee (12 sprites)
- [ ] trainee-cyan-idle.png
- [ ] trainee-cyan-happy.png
- [ ] trainee-cyan-confused.png
- [ ] trainee-cyan-victory.png
- [ ] trainee-gold-idle.png
- [ ] trainee-gold-happy.png
- [ ] trainee-gold-confused.png
- [ ] trainee-gold-victory.png
- [ ] trainee-purple-idle.png
- [ ] trainee-purple-happy.png
- [ ] trainee-purple-confused.png
- [ ] trainee-purple-victory.png

### Adventurer (12 sprites)
- [ ] adventurer-cyan-idle.png
- [ ] adventurer-cyan-happy.png
- [ ] adventurer-cyan-confused.png
- [ ] adventurer-cyan-victory.png
- [ ] adventurer-gold-idle.png
- [ ] adventurer-gold-happy.png
- [ ] adventurer-gold-confused.png
- [ ] adventurer-gold-victory.png
- [ ] adventurer-purple-idle.png
- [ ] adventurer-purple-happy.png
- [ ] adventurer-purple-confused.png
- [ ] adventurer-purple-victory.png

**Total: 36/36 sprites** ✅

---

## Part 6: Troubleshooting

### Sprites Not Loading

**Symptoms:** SVG placeholders still show instead of PNG sprites

**Solutions:**
1. Check file names match exactly: `stage-color-emotion.png`
2. Verify files are in `web/assets/characters/`
3. Open browser console (F12) for error messages
4. Check network tab - are PNGs being requested?

### White Boxes Around Sprites

**Symptoms:** White/colored background instead of transparent

**Solutions:**
1. Re-generate sprite with "transparent background" in prompt
2. Use online tool to remove background: https://remove.bg
3. Edit in GIMP/Photoshop to delete background layer

### File Too Large Warnings

**Symptoms:** Validation warns file >500KB

**Solutions:**
1. Use image optimizer: https://tinypng.com
2. Reduce resolution (if >512x512)
3. Save as 8-bit PNG instead of 24-bit

### Wrong Style/Quality

**Symptoms:** Sprite doesn't look pixelated or match style

**Solutions:**
1. Regenerate with stronger style keywords: "pixel art", "retro game sprite"
2. Try different AI model (e.g., Leonardo's "Pixel Art XL")
3. Specify game references: "Stardew Valley style", "Celeste style"

---

## Part 7: Advanced Tips

### Batch Generation Workflow

**For power users:**

1. **Prepare all prompts in a text file**
   - Copy all 36 prompts to `sprite-prompts.txt`
   - Add blank lines between each

2. **Generate in batches**
   - Leonardo.ai: Generate 4 variations per prompt (12 prompts/day)
   - Bing: Queue 10-15 prompts, walk away
   - Stable Diffusion: Batch process with ComfyUI

3. **Auto-download**
   - Browser extensions: "Image Downloader" for Chrome
   - Download all images to single folder

4. **Quick rename**
   - Use rename script for interactive mapping
   - Or manually rename if you have good organization

### Consistency Tips

To maintain visual consistency across all 36 sprites:

1. **Same AI model for all sprites**
   - Don't mix Leonardo + Bing
   - Same model = consistent style

2. **Same resolution targets**
   - Recruit: 32x32 or 64x64
   - Trainee: 64x64 or 128x128
   - Adventurer: 128x128 or 256x256

3. **Similar character features**
   - Keep body proportions similar
   - Evolution should look like same character growing

4. **Color palette**
   - Cyan: #4fc3f7
   - Gold: #ffd700
   - Purple: #bb86fc

### Time-Saving Shortcuts

1. **Generate idle first for each color/stage**
   - Establishes the base character look
   - Other emotions are variations

2. **Reuse successful prompts**
   - If a prompt works well, tweak slightly for other emotions
   - Same style keywords across all

3. **Parallel generation**
   - Open Leonardo.ai in multiple tabs
   - Queue different stages simultaneously

---

## Success Criteria

Your avatar system is complete when:

- [x] All 36 sprites generated and validated
- [x] All sprites have transparent backgrounds
- [x] All sprites load without errors in browser
- [x] Evolution animations work smoothly
- [x] Emotion changes are visible and appropriate
- [x] File sizes reasonable (<100KB each)
- [x] Consistent pixel art style across all sprites
- [x] Colors match theme (cyan/gold/purple)

---

## Next Steps After Completion

Once all sprites are integrated:

1. **Test with real users**
   - Get feedback on visual appeal
   - Verify emotions are clear

2. **Optimize if needed**
   - Compress PNGs if total size >2MB
   - Adjust glow effects in CSS

3. **Consider enhancements**
   - Add more emotions (shocked, tired, etc.)
   - Create class-specific sprites for Module 3
   - Animated sprites (multiple frames)

4. **Document your process**
   - Note which prompts worked best
   - Share tips for future sprite generation

---

## Resources

**AI Generation Tools:**
- Leonardo.ai: https://leonardo.ai
- Bing Image Creator: https://bing.com/create
- Craiyon: https://craiyon.com (free, unlimited)

**Image Editing:**
- Remove.bg: https://remove.bg (background removal)
- TinyPNG: https://tinypng.com (compression)
- Photopea: https://photopea.com (free Photoshop alternative)

**Pixel Art References:**
- PixelJoint: https://pixeljoint.com (pixel art gallery)
- Lospec: https://lospec.com/palette-list (color palettes)

**Stable Diffusion:**
- ComfyUI: https://github.com/comfyanonymous/ComfyUI
- Civitai: https://civitai.com (models and LoRAs)

---

## Support

If you run into issues:

1. Run validation: `node web/scripts/validate-sprites.js`
2. Check browser console for errors (F12)
3. Verify file naming matches exactly
4. Ensure transparent backgrounds

The avatar system uses SVG fallbacks, so the terminal will work even with missing sprites. Generate sprites at your own pace!

---

**Ready to start?** Begin with Recruit sprites using prompts from Part 2!
