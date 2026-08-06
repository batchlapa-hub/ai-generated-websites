document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile nav toggle ----
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---- Mega-menu dropdown (e-commerce archetype only; no-op when absent) ----
  // Hover already shows the panel via CSS alone with no JS needed. This adds
  // click/tap support for touch devices where hover doesn't apply, and lets
  // the same button close it again on a second tap.
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var dropdown = btn.closest('.nav-dropdown');
      if (!dropdown) return;
      var isOpen = dropdown.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-dropdown.is-open').forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        var toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Contact form validation (static site, no backend -- wire a real
  // endpoint like Formspree or Netlify Forms into the form's action/fetch call
  // when one is available) ----
  var contactForm = document.querySelector('.section-contact_form form');
  if (contactForm) {
    var fields = {
      name: contactForm.querySelector('[name="name"]'),
      email: contactForm.querySelector('[name="email"]'),
      message: contactForm.querySelector('[name="message"]')
    };

    function setError(fieldName, message) {
      var input = fields[fieldName];
      var errorEl = contactForm.querySelector('[data-error-for="' + fieldName + '"]');
      if (errorEl) errorEl.textContent = message || '';
      if (input) input.classList.toggle('is-invalid', !!message);
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      if (fields.name && !fields.name.value.trim()) {
        setError('name', 'Please enter your name.');
        valid = false;
      } else {
        setError('name', '');
      }

      if (fields.email && !isValidEmail(fields.email.value.trim())) {
        setError('email', 'Please enter a valid email address.');
        valid = false;
      } else {
        setError('email', '');
      }

      if (fields.message && !fields.message.value.trim()) {
        setError('message', 'Please enter a message.');
        valid = false;
      } else {
        setError('message', '');
      }

      if (!valid) return;

      var successEl = document.createElement('div');
      successEl.className = 'form-success';
      successEl.setAttribute('role', 'status');
      successEl.textContent = "Thanks! Your message has been received -- we'll be in touch soon.";
      contactForm.replaceWith(successEl);
    });
  }
});


/* ---- Optional enhancements ---- */
""