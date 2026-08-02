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
(function() {
  // Ensure base script hasn't broken the DOM structure by checking existence of required selectors
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Only add single-open-at-a-time behavior if we have FAQ items and they use <details>
  if (faqItems.length > 0 && window.getComputedStyle(faqItems[0]).getPropertyValue('display') !== 'none' || 
      faqItems[0].tagName.toLowerCase() === 'details') {
    
    // Wait for base scripts to finish initializing before adding listeners
    document.addEventListener('DOMContentLoaded', function() {
      
      // Prevent multiple open FAQ items by closing others when one is opened
      const handleFaqToggle = (event) => {
        if (!event.target.matches('.faq-item')) return;

        // Close all other details elements in the same parent container
        const parentContainer = event.target.closest('section, .faq-container');
        if (parentContainer) {
          const openDetails = parentContainer.querySelectorAll('details[open]');
          
          openDetails.forEach((detail) => {
            if (detail !== event.currentTarget) {
              detail.removeAttribute('open');
            }
          });
        }
      };

      // Attach listener to the details element itself, not the summary or container
      faqItems.forEach(item => {
        const detailsEl = item.querySelector('details');
        if (detailsEl) {
          detailsEl.addEventListener('click', handleFaqToggle);
          
          // Also listen for 'toggle' event to ensure it works even if user clicks outside first
          detailsEl.addEventListener('toggle', () => {
            const openDetails = document.querySelectorAll('.faq-item details[open]');
            
            openDetails.forEach((detail) => {
              if (detail !== detailsEl) {
                detail.removeAttribute('open');
              }
            });
          });
        }
      });

    });
  }
})();