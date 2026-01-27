// Landing Page Interactions

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initSmoothScroll();
  initRevealAnimations();
  initSoundEffects();
  initInteractiveEffects();
  initCTATransition();
});

// Create floating particles in hero section
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const particleCount = 40; // More particles for fuller effect
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 6) + 's';
    container.appendChild(particle);
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Reveal elements on scroll
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.journey-step, .class-card, .how-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// CSS class for revealed elements
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// Sound effects
function initSoundEffects() {
  const sounds = {
    hover: () => playSound('Tink.aiff'),
    click: () => playSound('Pop.aiff')
  };

  // Add hover sounds to interactive elements
  document.querySelectorAll('.class-card, .journey-step, .how-step').forEach(el => {
    el.addEventListener('mouseenter', sounds.hover);
  });

  // Add click sounds to buttons
  document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', sounds.click);
  });
}

function playSound(filename) {
  // Check if on macOS
  if (navigator.platform.toLowerCase().includes('mac')) {
    try {
      const audio = new Audio(`/System/Library/Sounds/${filename}`);
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Silently fail if sound doesn't play
    } catch (e) {
      // Silently fail
    }
  }
}

// Interactive effects
function initInteractiveEffects() {
  // Add sparkle effect on class card click
  document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('click', (e) => {
      createSparkles(e.currentTarget);
    });
  });

  // Add XP float on journey step hover
  document.querySelectorAll('.journey-step').forEach((step, index) => {
    step.addEventListener('mouseenter', (e) => {
      const xp = [10, 20, 30, 50][index] || 10;
      createXPFloat(e.currentTarget, `+${xp} XP Preview`);
    });
  });
}

function createSparkles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = centerX + 'px';
    sparkle.style.top = centerY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.zIndex = '1000';

    const angle = (i / 8) * Math.PI * 2;
    const distance = 60;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.style.transition = 'all 0.6s ease-out';
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
      sparkle.style.opacity = '0';
    }, 10);

    setTimeout(() => sparkle.remove(), 600);
  }
}

function createXPFloat(element, text) {
  const rect = element.getBoundingClientRect();
  const float = document.createElement('div');
  float.textContent = text;
  float.style.position = 'fixed';
  float.style.left = (rect.left + rect.width / 2) + 'px';
  float.style.top = rect.top + 'px';
  float.style.transform = 'translate(-50%, -50%)';
  float.style.color = '#4fc3f7';
  float.style.fontWeight = '700';
  float.style.fontSize = '0.9rem';
  float.style.pointerEvents = 'none';
  float.style.zIndex = '1000';
  float.style.textShadow = '0 0 10px rgba(79, 195, 247, 0.5)';
  float.style.transition = 'all 1s ease-out';

  document.body.appendChild(float);

  setTimeout(() => {
    float.style.transform = 'translate(-50%, -100px) scale(1.2)';
    float.style.opacity = '0';
  }, 10);

  setTimeout(() => float.remove(), 1000);
}

// Cinematic transition to terminal page
function initCTATransition() {
  const ctaButton = document.querySelector('.cta-button');
  if (!ctaButton) return;

  ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    const targetURL = ctaButton.getAttribute('href');

    // Button glow effect
    ctaButton.style.boxShadow = '0 0 40px rgba(79, 195, 247, 0.8), 0 0 80px rgba(79, 195, 247, 0.5)';
    ctaButton.style.transform = 'scale(1.1)';

    // Particle explosion from button
    setTimeout(() => {
      createCTAExplosion(ctaButton);
    }, 200);

    // Fade out with particles
    setTimeout(() => {
      createTransitionOverlay(targetURL);
    }, 500);
  });
}

function createCTAExplosion(button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create 30 particles exploding outward
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10000';

    // Color variety
    const colors = ['#4fc3f7', '#ffd700', '#bb86fc'];
    const color = colors[i % 3];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 10px ${color}`;

    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';

    const angle = (i / 30) * Math.PI * 2;
    const distance = 150 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.transition = 'all 0.8s ease-out';
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
      particle.style.opacity = '0';
    }, 10);

    setTimeout(() => particle.remove(), 800);
  }
}

function createTransitionOverlay(targetURL) {
  // Create full-screen overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.background = '#0a0a0f';
  overlay.style.zIndex = '9999';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.5s ease-out';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.flexDirection = 'column';
  overlay.style.gap = '1rem';

  // Loading message
  overlay.innerHTML = `
    <div style="font-family: 'Press Start 2P', monospace; color: #4fc3f7; font-size: 1.2rem; text-shadow: 0 0 20px rgba(79, 195, 247, 0.5);">
      Connecting to Terminal...
    </div>
    <div class="loading-spinner"></div>
  `;

  document.body.appendChild(overlay);

  // Add spinner styles
  const style = document.createElement('style');
  style.textContent = `
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(79, 195, 247, 0.2);
      border-top: 4px solid #4fc3f7;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Fade in overlay
  setTimeout(() => {
    overlay.style.opacity = '1';
  }, 10);

  // Navigate after animation
  setTimeout(() => {
    window.location.href = targetURL;
  }, 1500);
}
