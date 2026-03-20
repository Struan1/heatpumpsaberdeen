/* ============================================================
   HEAT PUMPS ABERDEEN — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* --- Hamburger menu ---------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const body      = document.body;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on overlay click
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  /* --- FAQ arrow injection ----------------------------------- */
  document.querySelectorAll('summary').forEach(function (summary) {
    // Avoid injecting arrow if already present
    if (!summary.querySelector('.faq-arrow')) {
      const arrow = document.createElement('span');
      arrow.className = 'faq-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '▾';
      summary.appendChild(arrow);
    }
  });

  /* --- Contact form handler ---------------------------------- */
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = document.getElementById('form-success');
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }

  /* --- Sticky nav shadow on scroll -------------------------- */
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    window.addEventListener('scroll', function () {
      siteNav.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.10)'
        : '';
    }, { passive: true });
  }

  /* --- Active nav link --------------------------------------- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    }
  });

})();
