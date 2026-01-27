#!/bin/bash
# Batch Rename Sprites for Avatar System
# Usage: Place all downloaded sprites in a folder, then run this script

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎨 Avatar Sprite Renaming Tool"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get the project root (assuming script is in web/scripts/)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
TARGET_DIR="$PROJECT_ROOT/web/assets/characters"

echo "Target directory: $TARGET_DIR"
echo ""

# Ask user for source directory
echo "Where are your downloaded sprites?"
echo "Enter full path (or drag folder here):"
read -r SOURCE_DIR

# Remove quotes if user dragged folder
SOURCE_DIR="${SOURCE_DIR//\"/}"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Directory not found: $SOURCE_DIR"
  exit 1
fi

echo ""
echo "Found $(ls "$SOURCE_DIR"/*.png 2>/dev/null | wc -l | xargs) PNG files"
echo ""

# Define all 36 expected sprites
declare -a SPRITES=(
  "recruit-cyan-idle"
  "recruit-cyan-happy"
  "recruit-cyan-confused"
  "recruit-cyan-victory"
  "recruit-gold-idle"
  "recruit-gold-happy"
  "recruit-gold-confused"
  "recruit-gold-victory"
  "recruit-purple-idle"
  "recruit-purple-happy"
  "recruit-purple-confused"
  "recruit-purple-victory"
  "trainee-cyan-idle"
  "trainee-cyan-happy"
  "trainee-cyan-confused"
  "trainee-cyan-victory"
  "trainee-gold-idle"
  "trainee-gold-happy"
  "trainee-gold-confused"
  "trainee-gold-victory"
  "trainee-purple-idle"
  "trainee-purple-happy"
  "trainee-purple-confused"
  "trainee-purple-victory"
  "adventurer-cyan-idle"
  "adventurer-cyan-happy"
  "adventurer-cyan-confused"
  "adventurer-cyan-victory"
  "adventurer-gold-idle"
  "adventurer-gold-happy"
  "adventurer-gold-confused"
  "adventurer-gold-victory"
  "adventurer-purple-idle"
  "adventurer-purple-happy"
  "adventurer-purple-confused"
  "adventurer-purple-victory"
)

# Create temporary mapping directory
TEMP_DIR="$SOURCE_DIR/renamed_sprites"
mkdir -p "$TEMP_DIR"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Interactive Mapping"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For each sprite slot, you'll assign a file."
echo "Files will be displayed with numbers. Enter the number to assign."
echo ""

# List all PNG files with numbers
FILES=("$SOURCE_DIR"/*.png)
if [ ${#FILES[@]} -eq 0 ]; then
  echo "❌ No PNG files found in $SOURCE_DIR"
  exit 1
fi

# Interactive mapping
for SPRITE_NAME in "${SPRITES[@]}"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📝 Assign sprite: $SPRITE_NAME.png"
  echo ""

  # Show remaining files
  echo "Available files:"
  INDEX=1
  for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
      BASENAME=$(basename "$FILE")
      echo "  [$INDEX] $BASENAME"
      ((INDEX++))
    fi
  done
  echo "  [s] Skip this sprite"
  echo "  [q] Quit"
  echo ""

  # Get user choice
  read -p "Enter number (or s/q): " CHOICE

  if [ "$CHOICE" == "q" ]; then
    echo "Quitting..."
    exit 0
  fi

  if [ "$CHOICE" == "s" ]; then
    echo "⏭️  Skipped $SPRITE_NAME"
    echo ""
    continue
  fi

  # Validate numeric input
  if ! [[ "$CHOICE" =~ ^[0-9]+$ ]]; then
    echo "❌ Invalid input. Skipping."
    echo ""
    continue
  fi

  # Get file at that index
  SELECTED_FILE="${FILES[$((CHOICE-1))]}"

  if [ ! -f "$SELECTED_FILE" ]; then
    echo "❌ File not found. Skipping."
    echo ""
    continue
  fi

  # Copy file to temp directory with new name
  cp "$SELECTED_FILE" "$TEMP_DIR/${SPRITE_NAME}.png"
  echo "✅ Mapped: $(basename "$SELECTED_FILE") → ${SPRITE_NAME}.png"

  # Remove from array to prevent re-selection
  unset "FILES[$((CHOICE-1))]"
  FILES=("${FILES[@]}") # Re-index array

  echo ""
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Mapping Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

MAPPED_COUNT=$(ls "$TEMP_DIR"/*.png 2>/dev/null | wc -l | xargs)
echo "Mapped: $MAPPED_COUNT / 36 sprites"
echo ""

if [ "$MAPPED_COUNT" -eq 0 ]; then
  echo "❌ No sprites were mapped. Exiting."
  rm -rf "$TEMP_DIR"
  exit 1
fi

# Ask for confirmation
echo "Ready to copy $MAPPED_COUNT sprites to:"
echo "  $TARGET_DIR"
echo ""
read -p "Proceed? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
  echo "Cancelled. Files remain in: $TEMP_DIR"
  exit 0
fi

# Copy files to target directory
echo ""
echo "Copying sprites..."
cp "$TEMP_DIR"/*.png "$TARGET_DIR/"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Sprite Renaming Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Sprites copied to: $TARGET_DIR"
echo "Total sprites: $MAPPED_COUNT / 36"
echo ""

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo "Next steps:"
echo "  1. Run validation: node web/scripts/validate-sprites.js"
echo "  2. Test in browser: open web/terminal.html"
echo ""
