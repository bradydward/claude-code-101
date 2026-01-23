// Landing Page Interactions

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initSmoothScroll();
  initRevealAnimations();
  initSoundEffects();
  initInteractiveEffects();
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
