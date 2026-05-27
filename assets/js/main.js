'use strict';

/* ─────────────────────────────────────────────────────────────────
   1. Smooth scroll for all anchor links
───────────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─────────────────────────────────────────────────────────────────
   2. Close Bootstrap mobile navbar after a nav-link is clicked
───────────────────────────────────────────────────────────────── */
const navMenu = document.getElementById('navMenu');
if (navMenu) {
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   3. IntersectionObserver — scroll reveal
   Adds class 'visible' to every .reveal element when it enters viewport
───────────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────────────────────────
   Bonus: animate skill progress bars when the Skills section scrolls in
───────────────────────────────────────────────────────────────── */
const skillSection = document.getElementById('skills');
if (skillSection) {
  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = (bar.dataset.width || 0) + '%';
        });
        skillBarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  skillBarObserver.observe(skillSection);
}
