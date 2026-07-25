document.addEventListener('DOMContentLoaded', () => {  
  // Hero Section Interactions  
  const hero = document.getElementById('hero');  
  if (hero) {  
    // Animated gradient overlay  
    const gradientOverlay = hero.querySelector('.gradient-overlay');  
    if (gradientOverlay) {  
      let lastScrollY = window.scrollY;  
      window.addEventListener('scroll', () => {  
        const scrollDiff = window.scrollY - lastScrollY;  
        gradientOverlay.style.backgroundPosition = `50% ${window.scrollY * 0.5}px`;  
        lastScrollY = window.scrollY;  
      });  

      // Light trail animation on scroll direction  
      let lightTrailTimeout;  
      window.addEventListener('scroll', () => {  
        clearTimeout(lightTrailTimeout);  
        lightTrailTimeout = setTimeout(() => {  
          const trail = document.createElement('div');  
          trail.classList.add('light-trail');  
          trail.style.left = `${window.scrollX + window.innerWidth / 2}px`;  
          hero.appendChild(trail);  
          setTimeout(() => trail.remove(), 1000);  
        }, 50);  
      });  

      // CTA button hover effect  
      const ctaButtons = hero.querySelectorAll('.cta-button');  
      ctaButtons.forEach(btn => {  
        btn.addEventListener('mouseenter', () => {  
          btn.style.transform = 'scale(1.05)';  
          btn.style.boxShadow = '0 0 20px rgba(255,215,0,0.3)';  
        });  
        btn.addEventListener('mouseleave', () => {  
          btn.style.transform = '';  
          btn.style.boxShadow = '';  
        });  
      });  
    }  
  }  

  // Core Offering - Service Cards & Tabs  
  const coreSection = document.getElementById('core_offering_or_features');  
  if (coreSection) {  
    // Tab switching  
    const tabs = coreSection.querySelectorAll('.tab-button');  
    const tabContents = coreSection.querySelectorAll('.tab-content');  
    tabs.forEach(tab => {  
      tab.addEventListener('click', () => {  
        const target = tab.getAttribute('data-tab');  
        tabContents.forEach(content => {  
          content.classList.remove('active');  
        });  
        document.querySelector(`.tab-content[data-tab="${target}"]`).classList.add('active');  
        tabs.forEach(t => t.classList.remove('active'));  
        tab.classList.add('active');  
      });  
    });  

    // 3D tilt effect on card hover  
    const cards = coreSection.querySelectorAll('.service-card');  
    cards.forEach(card => {  
      card.addEventListener('mousemove', e => {  
        const rect = card.getBoundingClientRect();  
        const x = e.clientX - rect.left;  
        const y = e.clientY - rect.top;  
        card.style.transform = `perspective(1000px) rotateX(${y / 20}deg) rotateY(${-x / 20}deg)`;  
      });  
      card.addEventListener('mouseleave', () => {  
        card.style.transform = '';  
      });  
    });  

    // Price tooltips on hover  
    const priceTooltips = coreSection.querySelectorAll('.price-tooltip');  
    priceTooltips.forEach(tooltip => {  
      tooltip.addEventListener('mouseenter', () => {  
        tooltip.classList.add('visible');  
      });  
      tooltip.addEventListener('mouseleave', () => {  
        tooltip.classList.remove('visible');  
      });  
    });  
  }  

  // Immersive Showcase - Horizontal Scroll & Spotlight Navigation  
  const showcaseSection = document.getElementById('immersive_showcase');  
  if (showcaseSection) {  
    let isDragging = false;  
    let startX, scrollLeft;  

    // Touch/mouse drag navigation  
    showcaseSection.addEventListener('mousedown', e => {  
      isDragging = true;  
      startX = e.pageX - showcaseSection.offsetLeft;  
      scrollLeft = showcaseSection.scrollLeft;  
    });  

    showcaseSection.addEventListener('mouseleave', () => {  
      isDragging = false;  
    });  

    showcaseSection.addEventListener('mousemove', e => {  
      if (!isDragging) return;  
      const x = e.pageX - showcaseSection.offsetLeft;  
      const walk = (x - startX) * 2;  
      showcaseSection.scrollLeft = scrollLeft - walk;  
    });  

    // Dynamic shadow transitions between content blocks  
    const contentBlocks = showcaseSection.querySelectorAll('.content-block');  
    contentBlocks.forEach(block => {  
      block.addEventListener('mouseenter', () => {  
        block.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';  
      });  
      block.addEventListener('mouseleave', () => {  
        block.style.boxShadow = '';  
      });  
    });  
  }  

  // Conversion Form - Real-time Validation & Success Animation  
  const contactForm = document.getElementById('conversion_or_contact');  
  if (contactForm) {  
    const formFields = contactForm.querySelectorAll('input, select');  
    formFields.forEach(field => {  
      field.addEventListener('input', () => {  
        if (field.checkValidity()) {  
          field.classList.remove('invalid');  
          field.nextElementSibling?.classList.remove('error-message');  
        } else {  
          field.classList.add('invalid');  
          field.nextElementSibling?.classList.add('error-message');  
        }  
      });  
    });  

    contactForm.addEventListener('submit', e => {  
      e.preventDefault();  
      // Simulate form submission  
      setTimeout(() => {  
        const successMessage = document.createElement('div');  
        successMessage.classList.add('success-animation');  
        successMessage.innerHTML = `  
          <svg viewBox="0 0 24 24" width="50" height="50">  
            <path fill="#FFD700" d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M12,22c-5.523,0-10-4.477-10-10s4.477-10,10-10s10,4.477,10,10S17.523,22,12,22z"/>  
            <path fill="#FFD700" d="M9.93,13l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-3,3c-0.39,0.39-0.39,1.02,0,1.41l3,3c0.39,0.39,1.02,0.39,1.41,0l2.34-2.34c0.39-0.39,0.39-1.02,0-1.41L9.93,13z"/>  
          </svg>  
          <span>Your reservation is confirmed!</span>  
        `;  
        contactForm.appendChild(successMessage);  
        setTimeout(() => successMessage.remove(), 3000);  
      }, 500);  
    });  
  }  

  // Micro-Interactions: Glassmorphic Card Hover & Scroll Light Trail  
  document.querySelectorAll('.glassmorphic-card').forEach(card => {  
    card.addEventListener('mouseenter', () => {  
      card.style.backdropFilter = 'blur(12px)';  
      card.style.transform = 'translateY(-4px)';  
    });  
    card.addEventListener('mouseleave', () => {  
      card.style.backdropFilter = 'blur(8px)';  
      card.style.transform = '';  
    });  
  });  

  // Scroll-triggered ambient light trail (Intersection Observer)  
  const lightTrailObserver = new IntersectionObserver(entries => {  
    entries.forEach(entry => {  
      if (entry.isIntersecting) {  
        entry.target.classList.add('light-trail-active');  
      } else {  
        entry.target.classList.remove('light-trail-active');  
      }  
    });  
  }, { threshold: 0.1 });  

  document.querySelectorAll('.section-with-light-trail').forEach(section => {  
    lightTrailObserver.observe(section);  
  });  
});