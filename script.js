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
  // FAQ: Single-open-at-a-time behavior for '.faq-item' details elements
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      const target = this.querySelector('summary');
      
      if (target) {
        // Close all other open items in the same parent container
        const siblings = item.parentElement.children;
        for (let sibling of siblings) {
          if (sibling !== item && sibling.classList.contains('faq-item')) {
            const summarySibling = sibling.querySelector('summary');
            if (summarySibling) {
              summarySibling.setAttribute('aria-expanded', 'false');
              summarySibling.nextElementSibling.style.maxHeight = null;
            }
          }
        }
      }
    });
  });

  // Testimonial Grid: Simple rotation for '.testimonial-grid' with 3+ items
  const testimonialGrid = document.querySelector('.testimonial-grid');
  
  if (testimonialGrid && testimonialGrid.children.length >= 3) {
    let currentIndex = 0;
    const testimonials = Array.from(testimonialGrid.children);
    
    // Fade out current, then fade in next after delay
    setInterval(() => {
      const currentItem = testimonials[currentIndex];
      
      if (currentItem) {
        currentItem.style.opacity = '0';
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          const nextItem = testimonials[currentIndex];
          
          if (nextItem) {
            nextItem.style.opacity = '1';
          }
        }, 300); // Match fade-out duration
      }
    }, 5000); // Rotate every 5 seconds
  }
});