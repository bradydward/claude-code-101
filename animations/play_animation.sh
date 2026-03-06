#!/bin/bash

# Terminal Animation Player for Claude Code 101
# Usage: ./play_animation.sh <animation_file.json>

ANIMATION_FILE="$1"

if [ ! -f "$ANIMATION_FILE" ]; then
    echo "Animation file not found: $ANIMATION_FILE"
    exit 1
fi

# ANSI color codes
GOLD='\033[1;33m'
RESET='\033[0m'

# Parse JSON and play animation (simplified - uses jq if available)
if command -v jq &> /dev/null; then
    # Get number of frames
    FRAME_COUNT=$(jq '.frames | length' "$ANIMATION_FILE")

    # Play each frame
    for ((i=0; i<FRAME_COUNT; i++)); do
        clear
        echo ""
        echo ""

        # Print frame art in gold color
        echo -e "${GOLD}"
        jq -r ".frames[$i].art[]" "$ANIMATION_FILE"
        echo -e "${RESET}"

        # Get frame duration
        DURATION=$(jq -r ".frames[$i].duration_ms" "$ANIMATION_FILE")
        DURATION_SEC=$(echo "scale=3; $DURATION/1000" | bc)

        # Wait
        sleep "$DURATION_SEC"
    done

    echo ""
    echo "Animation complete!"
else
    # Fallback: simple static display if jq not available
    clear
    echo ""
    echo -e "${GOLD}"
    echo "     💪 💪 💪"
    echo "      GIGACHAD"
    echo "     /|_|\\\\  "
    echo "    _/ ‾ \\\\_  "
    echo "   BUILDER MODE"
    echo -e "${RESET}"
    echo ""
fi
