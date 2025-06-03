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
// Smooth Scrolling for Anchor Links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      // We still let the browser do smooth scroll here,
      // but only on explicit “click” anchors. Automatic snapping is in the SectionSnapper below.
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});



// ===============================
// SECTIONSNAPPER MODULE (custom, slower snap)
// ===============================

(function () {
  const allSections = Array.from(document.querySelectorAll('.section'));
  if (allSections.length === 0) return;

  let isAnimating = false;            // Prevent overlapping animations
  let currentSectionIndex = 0;        // We'll track which section we're on

  // On page load, figure out which section is closest to top
  function findCurrentSectionIndex() {
    const scrollY = window.scrollY;
    // Find the section whose top is closest to scrollY
    let closestIdx = 0;
    let minDistance = Math.abs(allSections[0].offsetTop - scrollY);

    for (let i = 1; i < allSections.length; i++) {
      const distance = Math.abs(allSections[i].offsetTop - scrollY);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = i;
      }
    }
    return closestIdx;
  }

  // Animate scroll from startY → endY over duration (ms) using requestAnimationFrame
  function animateScroll(startY, endY, duration) {
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1); // clamp [0,1]

      // easeInOutQuad
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const currentY = startY + (endY - startY) * ease;
      window.scrollTo(0, currentY);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Animation done; allow next wheel event
        isAnimating = false;
        currentSectionIndex = findCurrentSectionIndex();
      }
    }

    requestAnimationFrame(tick);
  }

  // Handler for wheel events
  function onWheel(e) {
    if (isAnimating) {
      e.preventDefault();
      return;
    }

    const deltaY = e.deltaY;
    if (Math.abs(deltaY) < 10) return;  // ignore tiny “micro” scrolls

    const oldIndex = findCurrentSectionIndex();
    let newIndex = oldIndex;

    if (deltaY > 0) {
      // Scrolling down → next section
      newIndex = Math.min(oldIndex + 1, allSections.length - 1);
    } else {
      // Scrolling up → previous section
      newIndex = Math.max(oldIndex - 1, 0);
    }

    // If no change in index, let browser handle normal scroll
    if (newIndex === oldIndex) return;

    e.preventDefault();
    isAnimating = true;

    const startY = window.scrollY;
    const endY = allSections[newIndex].offsetTop;

    // Animate scroll over 800ms (adjust if you want it slower/faster)
    animateScroll(startY, endY, 800);
  }

  // Listen with `{ passive: false }` so we can call preventDefault()
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchmove', onWheel, { passive: false });

  // On resize/orientation change, re-calc current index
  window.addEventListener('resize', () => {
    currentSectionIndex = findCurrentSectionIndex();
  });

  // Set initial index on load
  window.addEventListener('load', () => {
    currentSectionIndex = findCurrentSectionIndex();
  });
})();
