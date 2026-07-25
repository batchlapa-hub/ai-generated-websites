document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Form validation
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;

      const nameInput = this.querySelector('[name="name"]');
      const emailInput = this.querySelector('[name="email"]');

      // Name validation
      if (!nameInput.value.trim()) {
        alert('Name is required');
        valid = false;
      }

      // Email validation
      if (emailInput && !isValidEmail(emailInput.value)) {
        alert('Valid email is required');
        valid = false;
      }

      if (valid) {
        this.submit();
      }
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Lazy loading images
  document.querySelectorAll('img').forEach(img => {
    if (img.src && img.src.includes('data:image')) {
      img.loading = 'lazy';
    }
  });
});