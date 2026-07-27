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
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(el => observer.observe(el));
    }

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Contact form validation and submission
    const contactForm = document.querySelector('.section-contact_form form');

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validate required fields
        const requiredFields = this.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            const errorEl = field.nextElementSibling;
            if (errorEl && errorEl.classList.contains('error-message')) {
              errorEl.textContent = 'This field is required.';
              isValid = false;
            }
          }
        });

        // Validate email format
        const emailField = this.querySelector('input[type="email"]');
        if (emailField) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailField.value.trim())) {
            const errorEl = emailField.nextElementSibling;
            if (errorEl && errorEl.classList.contains('error-message')) {
              errorEl.textContent = 'Please enter a valid email address.';
              isValid = false;
            }
          }
        }

        if (isValid) {
          // Show confirmation message
          this.style.display = 'none';
          const confirmationMessage = document.createElement('div');
          confirmationMessage.className = 'form-confirmation';
          confirmationMessage.textContent = 'Thank you! Your message has been sent.';
          this.parentNode.appendChild(confirmationMessage);
        }
      });
    }
  });
})();