#!/usr/bin/env node
// Sprite Validation Tool
// Verifies all 36 avatar sprites are present and valid

const fs = require('fs');
const path = require('path');

const SPRITES_DIR = path.join(__dirname, '..', 'assets', 'characters');

// All 36 expected sprites
const EXPECTED_SPRITES = [
  // Recruit - Cyan
  'recruit-cyan-idle.png',
  'recruit-cyan-happy.png',
  'recruit-cyan-confused.png',
  'recruit-cyan-victory.png',

  // Recruit - Gold
  'recruit-gold-idle.png',
  'recruit-gold-happy.png',
  'recruit-gold-confused.png',
  'recruit-gold-victory.png',

  // Recruit - Purple
  'recruit-purple-idle.png',
  'recruit-purple-happy.png',
  'recruit-purple-confused.png',
  'recruit-purple-victory.png',

  // Trainee - Cyan
  'trainee-cyan-idle.png',
  'trainee-cyan-happy.png',
  'trainee-cyan-confused.png',
  'trainee-cyan-victory.png',

  // Trainee - Gold
  'trainee-gold-idle.png',
  'trainee-gold-happy.png',
  'trainee-gold-confused.png',
  'trainee-gold-victory.png',

  // Trainee - Purple
  'trainee-purple-idle.png',
  'trainee-purple-happy.png',
  'trainee-purple-confused.png',
  'trainee-purple-victory.png',

  // Adventurer - Cyan
  'adventurer-cyan-idle.png',
  'adventurer-cyan-happy.png',
  'adventurer-cyan-confused.png',
  'adventurer-cyan-victory.png',

  // Adventurer - Gold
  'adventurer-gold-idle.png',
  'adventurer-gold-happy.png',
  'adventurer-gold-confused.png',
  'adventurer-gold-victory.png',

  // Adventurer - Purple
  'adventurer-purple-idle.png',
  'adventurer-purple-happy.png',
  'adventurer-purple-confused.png',
  'adventurer-purple-victory.png'
];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 Avatar Sprite Validation');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// Check if sprites directory exists
if (!fs.existsSync(SPRITES_DIR)) {
  console.log('❌ Sprites directory not found:');
  console.log(`   ${SPRITES_DIR}`);
  console.log('');
  console.log('Create it with: mkdir -p web/assets/characters');
  process.exit(1);
}

console.log(`Directory: ${SPRITES_DIR}`);
console.log('');

// Track validation results
let missing = [];
let invalid = [];
let valid = [];
let totalSize = 0;

// Validate each sprite
EXPECTED_SPRITES.forEach((spriteName) => {
  const spritePath = path.join(SPRITES_DIR, spriteName);

  // Check if file exists
  if (!fs.existsSync(spritePath)) {
    missing.push(spriteName);
    return;
  }

  // Check if it's a valid PNG
  try {
    const stats = fs.statSync(spritePath);
    const fileSize = stats.size;
    totalSize += fileSize;

    // Read first few bytes to verify PNG signature
    const fd = fs.openSync(spritePath, 'r');
    const buffer = Buffer.alloc(8);
    fs.readSync(fd, buffer, 0, 8, 0);
    fs.closeSync(fd);

    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

    if (!buffer.equals(pngSignature)) {
      invalid.push(`${spriteName} (not a valid PNG)`);
      return;
    }

    // Check file size is reasonable (5KB - 500KB)
    if (fileSize < 5000) {
      invalid.push(`${spriteName} (file too small: ${Math.round(fileSize/1000)}KB)`);
      return;
    }

    if (fileSize > 500000) {
      invalid.push(`${spriteName} (file too large: ${Math.round(fileSize/1000)}KB - consider optimizing)`);
      // Don't return - large files are still valid, just a warning
    }

    valid.push(spriteName);

  } catch (error) {
    invalid.push(`${spriteName} (error: ${error.message})`);
  }
});

// Display results
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 Validation Results');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

console.log(`✅ Valid:   ${valid.length} / 36`);
console.log(`❌ Missing: ${missing.length} / 36`);
console.log(`⚠️  Invalid: ${invalid.length} / 36`);
console.log('');

// Show missing sprites by category
if (missing.length > 0) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('❌ Missing Sprites');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  // Group by stage
  const missingByStage = {
    recruit: [],
    trainee: [],
    adventurer: []
  };

  missing.forEach(sprite => {
    if (sprite.startsWith('recruit-')) missingByStage.recruit.push(sprite);
    else if (sprite.startsWith('trainee-')) missingByStage.trainee.push(sprite);
    else if (sprite.startsWith('adventurer-')) missingByStage.adventurer.push(sprite);
  });

  Object.entries(missingByStage).forEach(([stage, sprites]) => {
    if (sprites.length > 0) {
      console.log(`${stage.toUpperCase()} (${sprites.length} missing):`);
      sprites.forEach(sprite => console.log(`  - ${sprite}`));
      console.log('');
    }
  });
}

// Show invalid sprites
if (invalid.length > 0) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚠️  Invalid Sprites');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  invalid.forEach(msg => console.log(`  - ${msg}`));
  console.log('');
}

// Show file size summary
if (valid.length > 0) {
  const avgSize = totalSize / valid.length;
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📦 File Size Summary');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log(`Total: ${Math.round(totalSize / 1000)} KB`);
  console.log(`Average per sprite: ${Math.round(avgSize / 1000)} KB`);
  console.log('');
}

// Show completion status
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎯 Completion Status');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

const completionPercent = Math.round((valid.length / 36) * 100);
const progressBar = '▓'.repeat(Math.floor(completionPercent / 5)) +
                    '░'.repeat(20 - Math.floor(completionPercent / 5));

console.log(`[${progressBar}] ${completionPercent}%`);
console.log('');

// Final status
if (valid.length === 36) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 ALL SPRITES VALIDATED SUCCESSFULLY!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Avatar system is ready to use');
  console.log('  2. Test in browser: open web/terminal.html');
  console.log('  3. Check all emotions and evolutions work');
  console.log('');
  process.exit(0);
} else {
  console.log('⚠️  Sprite validation incomplete');
  console.log('');
  console.log('Action items:');
  if (missing.length > 0) {
    console.log(`  - Generate ${missing.length} missing sprites`);
    console.log(`  - Use prompts from plan for missing sprites`);
  }
  if (invalid.length > 0) {
    console.log(`  - Fix ${invalid.length} invalid sprites`);
    console.log(`  - Re-generate or re-download invalid files`);
  }
  console.log('');
  console.log('Then re-run: node web/scripts/validate-sprites.js');
  console.log('');
  process.exit(1);
}
