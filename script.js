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
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      });
    });

    // Contact form validation
    const contactForm = document.querySelector('.section-contact_form form');

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Reset previous errors
        document.querySelectorAll('.section-contact_form .error').forEach(el => el.remove());

        // Validate name
        const nameField = contactForm.querySelector('[name="name"]');
        if (!nameField.value.trim()) {
          showError(nameField, 'Name is required');
          isValid = false;
        }

        // Validate email
        const emailField = contactForm.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
          showError(emailField, 'Valid email is required');
          isValid = false;
        }

        // Validate message
        const messageField = contactForm.querySelector('[name="message"]');
        if (!messageField.value.trim()) {
          showError(messageField, 'Message is required');
          isValid = false;
        }

        if (isValid) {
          // Replace form with confirmation message
          contactForm.innerHTML = '<p class="success">Thank you! Your message has been sent.</p>';
        }
      });
    }

    function showError(field, message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error';
      errorDiv.textContent = message;
      field.parentNode.appendChild(errorDiv);
    }
  });
})();