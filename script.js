(function() {
  document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuButton = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuButton.setAttribute(
          'aria-expanded',
          mobileMenu.classList.contains('active')
        );
        document.body.classList.toggle('menu-open');
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
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Form validation
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Check required fields
        const requiredFields = this.querySelectorAll('[required]');
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          }
        });

        if (!isValid) {
          e.preventDefault();
          alert('Please fill out all required fields.');
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      const isMenuButton = e.target.closest('[data-menu-toggle]');
      const isMenuContent = e.target.closest('[data-mobile-menu]');

      if (!isMenuButton && !isMenuContent) {
        const activeMenu = document.querySelector('[data-mobile-menu].active');
        if (activeMenu) {
          activeMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
          menuButton.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
})();