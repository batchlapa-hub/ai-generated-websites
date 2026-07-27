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
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Validate name
        const nameInput = this.querySelector('[name="name"]');
        if (!nameInput.value.trim()) {
          showError(nameInput, 'Name is required');
          isValid = false;
        }

        // Validate email
        const emailInput = this.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
          showError(emailInput, 'Valid email is required');
          isValid = false;
        }

        // Validate message
        const messageInput = this.querySelector('[name="message"]');
        if (!messageInput.value.trim()) {
          showError(messageInput, 'Message is required');
          isValid = false;
        }

        if (isValid) {
          // Replace form with success message
          const formContainer = this.closest('.section-contact_form');
          formContainer.innerHTML = '<p class="success-message">Thank you! Your message has been sent.</p>';
        }
      });
    }

    function showError(input, message) {
      let errorElement = input.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
      }
    }
  });
})();