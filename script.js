(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.getElementById('site-nav');

    if (navToggle && siteNav) {
      navToggle.addEventListener('click', function() {
        siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', siteNav.classList.contains('is-open'));
      });
    }

    // Scroll-reveal with IntersectionObserver
    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length > 0) {
      const observerOptions = {
        threshold: 0.1
      };

      const observerCallback = function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      revealElements.forEach(function(el) {
        observer.observe(el);
      });
    }

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });

    // Contact form validation and confirmation
    const contactForm = document.querySelector('.section-contact_form form');

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.section-contact_form .error').forEach(el => el.textContent = '');

        // Validate required fields
        const requiredFields = this.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('invalid');
            const errorEl = field.nextElementSibling;
            if (errorEl && errorEl.classList.contains('error')) {
              errorEl.textContent = 'This field is required.';
              isValid = false;
            }
          } else {
            field.classList.remove('invalid');
          }
        });

        // Validate email format
        const emailField = this.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('invalid');
            const errorEl = emailField.nextElementSibling;
            if (errorEl && errorEl.classList.contains('error')) {
              errorEl.textContent = 'Please enter a valid email address.';
              isValid = false;
            }
          } else {
            emailField.classList.remove('invalid');
          }
        }

        if (isValid) {
          // Show confirmation message
          const formContainer = this.closest('.section-contact_form');
          if (formContainer) {
            formContainer.innerHTML = '<p class="confirmation">Thank you! Your message has been sent.</p>';
          }
        }
      });
    }
  });
})();