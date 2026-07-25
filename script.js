document.addEventListener('DOMContentLoaded', () => {  
  // Mobile Navigation Toggle  
  const menuToggle = document.querySelector('[data-menu-toggle]');  
  const mobileNav = document.querySelector('[data-mobile-nav]');  
  if (menuToggle && mobileNav) {  
    menuToggle.addEventListener('click', () => {  
      mobileNav.classList.toggle('active');  
      menuToggle.setAttribute('aria-expanded', mobileNav.classList.contains('active'));  
    });  
  }  

  // Hero Section CTA Interactions  
  const primaryCTA = document.querySelector('[data-primary-cta]');  
  const secondaryCTA = document.querySelector('[data-secondary-cta]');  
  if (primaryCTA) {  
    primaryCTA.addEventListener('click', (e) => {  
      e.preventDefault();  
      document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });  
    });  
  }  
  if (secondaryCTA) {  
    secondaryCTA.addEventListener('click', (e) => {  
      e.preventDefault();  
      alert('Enquiry form not implemented in this demo');  
    });  
  }  

  // Portfolio Section Hover Effects  
  const portfolioItems = document.querySelectorAll('[data-portfolio-item]');  
  portfolioItems.forEach(item => {  
    item.addEventListener('mouseenter', () => {  
      item.style.transform = 'scale(1.02)';  
    });  
    item.addEventListener('mouseleave', () => {  
      item.style.transform = 'scale(1)';  
    });  
  });  

  // Spec Matrix Tab Switching  
  const specTabs = document.querySelectorAll('[data-spec-tab]');  
  const specPanels = document.querySelectorAll('[data-spec-panel]');  
  if (specTabs.length > 0 && specPanels.length > 0) {  
    specTabs.forEach(tab => {  
      tab.addEventListener('click', (e) => {  
        e.preventDefault();  
        const targetPanelId = e.target.getAttribute('href').substring(1);  
        specPanels.forEach(panel => {  
          panel.classList.remove('active');  
        });  
        document.getElementById(targetPanelId).classList.add('active');  
        specTabs.forEach(t => t.classList.remove('active'));  
        tab.classList.add('active');  
      });  
    });  
  }  

  // Video Background Pause on Interaction (Hero Section)  
  const heroVideo = document.querySelector('[data-hero-video]');  
  if (heroVideo) {  
    heroVideo.addEventListener('click', () => {  
      heroVideo.pause();  
    });  
  }  
});