// Peinture Vaudreuil — interactions fraîches
(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  var details = document.querySelectorAll('.faq-list details');
  details.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        details.forEach(function (other) { if (other !== d) other.open = false; });
      }
    });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    var stagger = function (selector, step) {
      document.querySelectorAll(selector).forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i * step) + 'ms';
        io.observe(el);
      });
    };

    document.querySelectorAll('.section-title').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
    stagger('.tl-track .tl-step', 130);
    stagger('.services-grid .svc', 90);
    stagger('.galerie-grid figure', 100);
    stagger('.check-grid .check-card', 120);
    stagger('.zones-grid .zone-block', 100);
    stagger('.temoignages-grid blockquote', 130);
  }
})();
