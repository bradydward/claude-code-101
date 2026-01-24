# Shop System Reference

Complete reference for the cosmetics shop implementation.

---

## Overview

All cosmetics purchased with Aura from the shop (see cosmetics.json).

### Categories
- **Character Skins:** Visual representation in status display (26 options, 0-500 Aura)
- **Aura Colors:** Color of glow display (5 free + 4 rare, 0-500 Aura)
- **Terminal Themes:** ANSI color palette in ASCII art (15 options, 0-500 Aura)
- **Sound Packs:** Music event variations (4 packs, 0-150 Aura)
- **Accessories:** Extra flair items (12 options, 50-500 Aura)
- **Titles:** Custom display titles (earned or purchased)

---

## Shop Command Implementation

When student types `/shop`, `shop`, `open shop`, `buy cosmetics`, `cosmetics`, or `store`, launch the interactive shop interface.

### Shop Entry Display

Show this when student enters the shop:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 COSMETICS SHOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Aura: {current_balance} ✨ | Glow: {glow_emoji} {glow_level}

Browse Categories:
1. 🎭 Character Skins    ({N} items, {owned}/{total} owned)
2. 🌈 Aura Colors        ({N} items, {owned}/{total} owned)
3. 🎨 Terminal Themes     ({N} items, {owned}/{total} owned)
4. 🎵 Sound Packs        ({N} items, {owned}/{total} owned)
5. ✨ Accessories         ({N} items, {owned}/{total} owned)
6. 👑 Titles             ({N} items, {owned}/{total} owned)

Type a number (1-6) to browse, or 'q' to exit:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Variables to populate:**
- `{current_balance}` - from `progress.json` → `aura_system.current_balance`
- `{glow_emoji}` - from `progress.json` → `aura_system.glow_level` → map to emoji
- `{glow_level}` - from `progress.json` → `aura_system.glow_level`
- `{N}` - count items in each category from `cosmetics.json`
- `{owned}` - count items student owns from `progress.json` → `customization.owned_*` arrays
- `{total}` - total items in category from `cosmetics.json`

---

### Category View Template

When student selects a category (e.g., types "1" for Character Skins):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{category_emoji} {CATEGORY NAME}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Aura: {current_balance} ✨

{For each item in category:}
 {N}. {[OWNED] if owned} {item_name} - {description} ({price} Aura) {rarity_stars}
     {If class_locked: "🔒 Requires: {Class Name}"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type item number to view/buy, 'b' for back, 'q' to exit:
```

**Rarity Star System:**
- `common`: (no stars)
- `uncommon`: ⭐
- `rare`: ⭐⭐
- `epic`: ⭐⭐⭐
- `legendary`: ⭐⭐⭐⭐

**Class-locked items:**
Check `cosmetics.json` item for `"class_locked"` field. If present, show lock emoji and required class name. Map class IDs to display names:
- `gigachad_builder` → "Gigachad Builder 💪"
- `sigma_grinder` → "Sigma Grinder 🐺"
- `aura_farmer` → "Aura Farmer 👑"
- `chaos_agent` → "NPC Destroyer / Chaos Agent 🔥"
- `meme_lord` → "Meme Lord / Shitposter 😎"
- `hackerman` → "Hackerman / Code Wizard 🧙"

---

### Item Detail View

When student selects an item (e.g., types "3" for the third item in the list):

```
┌─────────────────────────────────────────┐
│ {item_name}                             │
│ {description}                           │
│                                         │
│ Rarity: {rarity} {stars}                │
│ Price: {price} Aura                     │
│ Status: {Owned / Available / Locked}    │
│                                         │
│ {If not owned and can afford:}          │
│ Buy this item? (y/n)                    │
│                                         │
│ {If not owned and can't afford:}        │
│ Need {difference} more Aura!            │
│ (Complete ~{lessons_needed} more lessons)│
│                                         │
│ {If class_locked and wrong class:}      │
│ 🔒 This item is exclusive to {Class}   │
│                                         │
│ {If already owned and not equipped:}    │
│ Equip this item? (y/n)                  │
│                                         │
│ {If already owned and equipped:}        │
│ ✅ Currently equipped                   │
└─────────────────────────────────────────┘
```

**Status determination:**
1. **Check if owned:** Look in `progress.json` → `customization.owned_{category}` array for item ID
2. **Check if class-locked:** Look in `cosmetics.json` item for `"class_locked"` field
3. **Check if can afford:** Compare item price to `aura_system.current_balance`
4. **Check if equipped:** Compare item ID to `customization.{category}` field

**Lessons needed calculation:**
```
difference = item_price - current_balance
base_aura_per_lesson = 1  # Could be 2 if Aura Farmer class
lessons_needed = Math.ceil(difference / base_aura_per_lesson)
```

---

### Navigation Flow

**Student input → Action:**
- Number (1-6) at shop entry → Show that category
- Number at category view → Show that item detail
- `y` at item detail → Execute purchase or equip
- `n` at item detail → Return to category view
- `b` anywhere → Go back one level
- `q` anywhere → Exit shop entirely

**After purchase:** Show confirmation message, stay at category view (allow browsing more items)

**After equip:** Show confirmation message, stay at category view

---

### Purchase Flow

When student confirms purchase (types 'y' at item detail view):

1. **Read progress.json ONCE**
2. **Verify eligibility:**
   - Re-check balance >= price (don't trust UI display, verify again)
   - Check not already owned
   - Check class requirement (if applicable)
3. **Calculate updates:**
   - Deduct price from `aura_system.current_balance`
   - Add item ID to `customization.owned_{category}` array (create array if doesn't exist)
   - Equip item immediately: set `customization.{category} = item_id`
4. **Write progress.json ONCE** (atomic update, Write tool not Edit)
5. **Play purchase sound:**
   ```bash
   # Use Bash tool with run_in_background: true
   (afplay /System/Library/Sounds/Funk.aiff 2>/dev/null || true) &
   ```
6. **Display confirmation:**
   ```
   ✨ Purchased: {item_name}!
   Equipped as your new {category_type}.
   Remaining Aura: {new_balance} ✨

   {If first purchase ever (first item in any owned_* array):}
   🎉 First purchase! Your status display now shows your new look.
   Type 'status' to see it!
   ```

**Category type mapping for confirmation:**
- `character_skins` → "character skin"
- `aura_colors` → "aura color"
- `terminal_themes` → "terminal theme"
- `sound_packs` → "sound pack"
- `accessories` → "accessory"
- `titles` → "title"

---

### Progress.json Update Pattern

**Owned arrays to create/maintain:**
- `customization.owned_skins` (array of skin IDs)
- `customization.owned_aura_colors` (array of aura color IDs)
- `customization.owned_themes` (array of theme IDs)
- `customization.owned_sound_packs` (array of sound pack IDs)
- `customization.owned_accessories` (array of accessory IDs)
- `customization.owned_titles` (array of title IDs)

**Note:** These arrays may not exist yet in progress.json. Create them on first purchase in that category.

**Example update after purchase:**
```json
{
  "aura_system": {
    "current_balance": 335,  // Was 435, spent 100
    "total_earned": 435      // Unchanged - spending doesn't reduce total
  },
  "customization": {
    "character_skin": "skin_ninja",  // Newly equipped
    "owned_skins": ["skin_default", "skin_ninja"],  // Added to owned list
    "aura_color": "white",
    "terminal_theme": "classic",
    "music_pack": "default"
  }
}
```

---

### Error Handling

**Insufficient Aura:**
```
❌ Not enough Aura!
Need: {price} Aura | Have: {balance} Aura | Short: {difference} Aura

💡 Tip: Each lesson earns +1 Aura (base). Complete ~{lessons_needed} more lessons!
{If Aura Farmer class: "Your class bonus gives +2 per lesson, so ~{half_lessons_needed} lessons!"}
```

**Class-locked (wrong class):**
```
🔒 This item requires the {Class Name} class.
Your class: {student_class}

{If no class yet (progress.json student.class is null):}
You'll choose your class in Module 3, Lesson 3.4!

{If different class:}
This is exclusive to {required_class} players. Check out items available to everyone!
```

**Already owned (offer equip):**
```
You already own {item_name}!

{If not currently equipped:}
Want to equip it? (y/n)

{If currently equipped:}
✅ It's already equipped and active!
```

---

### Equip vs. Buy Distinction

**Buying:**
- Costs Aura
- Grants ownership (adds to owned_* array)
- Automatically equips the item
- Deducts from balance
- Plays purchase sound

**Equipping:**
- Free (no Aura cost)
- Requires ownership
- Sets as active item (updates customization.{category} field)
- Only one item per category can be equipped at a time
- No sound trigger (silent swap)

**UI Behavior:**
- Owned but not equipped items show "Equip this item? (y/n)"
- Already equipped items show "✅ Currently equipped"
- Not owned items show "Buy this item? (y/n)" (if can afford)

---

### Shop Command Recognition

Claude should recognize these as shop triggers:
- `/shop`
- `shop`
- `open shop`
- `buy cosmetics`
- `cosmetics`
- `store`

All trigger the same shop entry display.
