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

    // Contact form validation
    const contactForm = document.querySelector('.section-contact_form form');

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.section-contact_form .error').forEach(el => el.textContent = '');

        // Validate name field
        const nameField = contactForm.querySelector('[name="name"]');
        if (!nameField.value.trim()) {
          isValid = false;
          nameField.nextElementSibling.textContent = 'Name is required';
        }

        // Validate email field
        const emailField = contactForm.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailField.value.trim() || !emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.nextElementSibling.textContent = 'Valid email is required';
        }

        // Validate message field
        const messageField = contactForm.querySelector('[name="message"]');
        if (!messageField.value.trim()) {
          isValid = false;
          messageField.nextElementSibling.textContent = 'Message is required';
        }

        if (isValid) {
          // Show confirmation message
          const formContainer = contactForm.closest('.section-contact_form');
          formContainer.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
        }
      });
    }
  });
})();