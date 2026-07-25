document.addEventListener('DOMContentLoaded', () => {  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav.menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
      }
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
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;

      const nameField = document.querySelector('#name');
      const emailField = document.querySelector('#email');

      if (!nameField.value.trim()) {
        alert('Please enter your name.');
        valid = false;
      }

      if (emailField && !emailField.value.trim()) {
        alert('Please enter your email address.');
        valid = false;
      } else if (emailField && !isValidEmail(emailField.value)) {
        alert('Please enter a valid email address.');
        valid = false;
      }

      if (valid) {
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
      }
    });

    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  }

  // Lazy loading images
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => {
            img.removeAttribute('data-src');
            observer.unobserve(img);
          };
        }
      });
    }, { threshold: 0.1 });

    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  }

  // Scroll highlight
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
});