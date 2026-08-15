/* Montaro — shared interactions */
(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Product filters (collection pages) ---- */
  var pills = document.querySelectorAll('.filter-pill');
  var cards = document.querySelectorAll('.product-card');
  if (pills.length && cards.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var filter = pill.dataset.filter;
        cards.forEach(function (card) {
          var match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? 'flex' : 'none';
        });
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealEls.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Simple form feedback (no backend) ---- */
  document.querySelectorAll('form[data-mock]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-status');
      if (note) {
        note.textContent = form.dataset.mock || 'Thanks — we’ll be in touch shortly.';
        note.style.display = 'block';
      }
      form.reset();
    });
  });
})();
