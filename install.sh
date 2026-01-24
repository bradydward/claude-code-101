#!/bin/bash
# Claude Code 101 - One-Click Installer
# Idempotent installation script for macOS
# Detects and installs: Xcode CLT, Homebrew, Node.js, Claude Code CLI

set -e  # Exit on error
set -u  # Exit on undefined variable

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Claude Code 101 - One-Click Installer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================
# 1. DETECT MACOS
# ============================================
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "❌ This installer is for macOS only"
  echo ""
  echo "For other operating systems, see:"
  echo "https://github.com/your-repo/claude-code-101"
  exit 1
fi

echo "✅ macOS detected"
echo ""

# ============================================
# 2. CHECK XCODE COMMAND LINE TOOLS
# ============================================
echo "📋 Checking prerequisites..."
echo ""

if ! xcode-select -p &> /dev/null; then
  echo "⚠️  Xcode Command Line Tools required (needed for Homebrew)"
  echo ""
  echo "Installing now (this may take a few minutes)..."
  xcode-select --install
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "⏸️  PAUSED FOR XCODE CLT INSTALLATION"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "A popup appeared asking to install Command Line Tools."
  echo "Click 'Install' and wait for it to complete."
  echo ""
  echo "Once finished, re-run this script:"
  echo "/bin/bash install.sh"
  echo ""
  exit 0
else
  echo "✅ Xcode Command Line Tools installed"
fi

# ============================================
# 3. INSTALL HOMEBREW (IDEMPOTENT)
# ============================================
if ! command -v brew &> /dev/null; then
  echo "📦 Installing Homebrew (package manager for macOS)..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  # Handle Apple Silicon PATH
  if [[ $(uname -m) == 'arm64' ]]; then
    echo ""
    echo "🔧 Configuring Homebrew for Apple Silicon..."
    if ! grep -q '/opt/homebrew/bin' ~/.zshrc 2>/dev/null; then
      echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
    fi
    eval "$(/opt/homebrew/bin/brew shellenv)"
  fi

  echo "✅ Homebrew installed"
else
  echo "✅ Homebrew already installed"
fi

echo ""

# ============================================
# 4. INSTALL NODE.JS (IDEMPOTENT)
# ============================================
if ! command -v node &> /dev/null; then
  echo "📦 Installing Node.js (JavaScript runtime)..."
  if ! brew install node; then
    echo "❌ Failed to install Node.js via Homebrew"
    echo ""
    echo "Manual alternative:"
    echo "1. Visit: https://nodejs.org"
    echo "2. Download the LTS version"
    echo "3. Run the installer"
    echo "4. Re-run this script"
    exit 1
  fi
  echo "✅ Node.js installed ($(node --version))"
else
  echo "✅ Node.js already installed ($(node --version))"
fi

echo ""

# ============================================
# 5. INSTALL CLAUDE CODE CLI (IDEMPOTENT)
# ============================================
if ! command -v claude &> /dev/null; then
  echo "📦 Installing Claude Code CLI..."
  if ! npm install -g @anthropic-ai/claude-code; then
    echo "❌ Failed to install Claude Code CLI via npm"
    echo ""
    echo "Manual alternative:"
    echo "1. Run: npm install -g @anthropic-ai/claude-code"
    echo "2. If permission error, try: sudo npm install -g @anthropic-ai/claude-code"
    exit 1
  fi
  echo "✅ Claude Code CLI installed"
else
  echo "✅ Claude Code CLI already installed"
  # Silently attempt update (don't block on failure)
  npm update -g @anthropic-ai/claude-code &> /dev/null || true
fi

echo ""

# ============================================
# 6. CREATE PROJECT DIRECTORY (IDEMPOTENT)
# ============================================
echo "📂 Setting up project directory..."
mkdir -p ~/Developer/projects
cd ~/Developer/projects

if [ ! -d "Claude Code 101" ]; then
  echo "📥 Cloning course repository..."
  if ! git clone https://github.com/your-repo/claude-code-101.git "Claude Code 101"; then
    echo "❌ Failed to clone repository"
    echo ""
    echo "Manual alternative:"
    echo "1. Download from: https://github.com/your-repo/claude-code-101"
    echo "2. Extract to: ~/Developer/projects/Claude Code 101"
    exit 1
  fi
  echo "✅ Repository cloned"
else
  echo "✅ Course repository already exists"
  cd "Claude Code 101"
  echo "📥 Pulling latest updates..."
  git pull origin main 2>/dev/null || echo "⚠️  Could not update (you may have local changes - that's okay!)"
  cd ~/Developer/projects
fi

echo ""

# ============================================
# COMPLETION BANNER
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ INSTALLATION COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⏱️  Installation time:"
echo "    First-time setup: 5-8 minutes"
echo "    Re-run (updates): 10-30 seconds"
echo ""
echo "📋 Next steps:"
echo ""
echo "1️⃣  Get your API key:"
echo "    Visit: https://console.anthropic.com"
echo "    Create account (if new) and copy your API key"
echo ""
echo "2️⃣  Open a new terminal window:"
echo "    Cmd + Space → type 'Terminal' → Enter"
echo "    (New window loads the updated PATH)"
echo ""
echo "3️⃣  Navigate to the project:"
echo "    cd ~/Developer/projects/\"Claude Code 101\""
echo ""
echo "4️⃣  Start Claude Code:"
echo "    claude"
echo ""
echo "5️⃣  Begin your journey:"
echo "    Type: start lesson"
echo ""
echo "🎮 You're ready to begin! See you in the game."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
