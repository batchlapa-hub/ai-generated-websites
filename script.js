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

      revealElements.forEach(function(element) {
        observer.observe(element);
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

        // Reset previous error messages
        document.querySelectorAll('.section-contact_form .error').forEach(el => el.remove());

        // Validate required fields
        const requiredFields = this.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error';
            errorMsg.textContent = 'This field is required.';
            field.parentNode.appendChild(errorMsg);
            isValid = false;
          }
        });

        // Validate email format
        const emailField = this.querySelector('input[type="email"]');
        if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error';
          errorMsg.textContent = 'Please enter a valid email address.';
          emailField.parentNode.appendChild(errorMsg);
          isValid = false;
        }

        if (isValid) {
          // Replace form with confirmation message
          this.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
        }
      });
    }
  });
})();