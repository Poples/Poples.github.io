// ===============================
// Mobile Navigation Toggle
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.background = 'rgba(18, 18, 18, 0.98)';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.right = '2rem';
      navLinks.style.padding = '1rem';
      navLinks.style.borderRadius = '8px';
    }
  });

  // Hide mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    });
  });

  // --------------------------
  // Typewriter Effect
  // --------------------------
  const typeTarget = document.querySelector('.typewriter-target');
  const fullText = "Hi, I'm Joshua Swisher";
  let idx = 0;

  function typeWriter() {
    if (idx < fullText.length) {
      typeTarget.textContent += fullText.charAt(idx);
      idx++;
      setTimeout(typeWriter, 100);
    } else {
      // Once finished typing, remove the blinking cursor (border-right)
      typeTarget.style.borderRight = 'none';
    }
  }

  // Kick off typing when DOM is fully loaded
  typeWriter();
});

// ===============================
// Navbar background change on scroll
// ===============================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = getComputedStyle(document.documentElement)
      .getPropertyValue('--background')
      .trim();
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(18, 18, 18, 0.85)';
    navbar.style.boxShadow = 'none';
  }
});

// ===============================
// Intersection Observer for Fade-In Animations
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});

// ===============================
// Smooth Scrolling for Anchor Links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
