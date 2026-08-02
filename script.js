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
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  // Single-open-at-a-time behavior for FAQ details elements
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const currentOpenItem = document.querySelector('.faq-item[open]');
      if (currentOpenItem && currentOpenItem !== item) {
        currentOpenItem.removeAttribute('open');
      }
    });
  });

  // Autoplay/rotation for testimonial grid with 3+ items
  const testimonialGrid = document.querySelector('.testimonial-grid');
  if (testimonialGrid && testimonialGrid.children.length >= 3) {
    let currentIndex = 0;
    const intervalTime = 5000;

    setInterval(() => {
      const testimonials = Array.from(testimonialGrid.children);
      const nextIndex = (currentIndex + 1) % testimonials.length;
      
      // Fade out current
      testimonials[currentIndex].style.opacity = '0';
      
      setTimeout(() => {
        testimonials[currentIndex].style.display = 'none';
        testimonials[nextIndex].style.display = 'block';
        
        // Small delay to allow display:block to apply before opacity change
        setTimeout(() => {
          testimonials[nextIndex].style.opacity = '1';
          currentIndex = nextIndex;
        }, 50);
      }, intervalTime / 2);
    }, intervalTime);
  }
});