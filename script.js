document.addEventListener('DOMContentLoaded', () => {  
  // Age verification overlay  
  const ageOverlay = document.getElementById('age-verification');  
  const enterBtn = document.querySelector('#age-verification [data-action="enter"]');  
  const exitBtn = document.querySelector('#age-verification [data-action="exit"]');  
  
  if (ageOverlay) {  
    // Check localStorage for prior verification  
    if (!localStorage.getItem('ageVerified')) {  
      ageOverlay.style.display = 'flex';  
    }  
  
    enterBtn.addEventListener('click', () => {  
      localStorage.setItem('ageVerified', 'true');  
      ageOverlay.style.display = 'none';  
    });  
  
    exitBtn.addEventListener('click', () => {  
      ageOverlay.style.display = 'none';  
    });  
  }  
  
  // Mobile navigation toggle  
  const mobileMenuBtn = document.querySelector('[data-mobile-menu]');  
  const navDrawer = document.querySelector('[data-nav-drawer]');  
  
  if (mobileMenuBtn && navDrawer) {  
    mobileMenuBtn.addEventListener('click', () => {  
      navDrawer.classList.toggle('active');  
    });  
  
    // Close drawer on outside click  
    document.addEventListener('click', (e) => {  
      if (!navDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {  
        navDrawer.classList.remove('active');  
      }  
    });  
  }  
  
  // Services pricing filter tabs  
  const serviceFilters = document.querySelectorAll('[data-service-filter]');  
  const serviceCards = document.querySelectorAll('[data-service-card]');  
  
  if (serviceFilters.length > 0 && serviceCards.length > 0) {  
    serviceFilters.forEach(filter => {  
      filter.addEventListener('click', (e) => {  
        const category = e.target.dataset.serviceFilter;  
        serviceCards.forEach(card => {  
          card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none';  
        });  
      });  
    });  
  }  
  
  // Modal form handler (enquiry form)  
  const enquiryBtns = document.querySelectorAll('[data-open-modal="enquiry"]');  
  const modalOverlay = document.querySelector('[data-modal-overlay]');  
  const closeModalBtn = document.querySelector('[data-close-modal]');  
  const formSubmit = document.querySelector('[data-form-submit]');  
  
  if (modalOverlay && enquiryBtns.length > 0) {  
    // Open modal on button click  
    enquiryBtns.forEach(btn => {  
      btn.addEventListener('click', () => {  
        modalOverlay.style.display = 'flex';  
      });  
    });  
  
    // Close modal on overlay click or close button  
    closeModalBtn.addEventListener('click', () => {  
      modalOverlay.style.display = 'none';  
    });  
  
    modalOverlay.addEventListener('click', (e) => {  
      if (e.target === modalOverlay) {  
        modalOverlay.style.display = 'none';  
      }  
    });  
  
    // Form submission handler  
    formSubmit.addEventListener('submit', (e) => {  
      e.preventDefault();  
      const fields = document.querySelectorAll('[data-form-field]');  
      let isValid = true;  
  
      fields.forEach(field => {  
        if (!field.value.trim()) {  
          field.classList.add('error');  
          isValid = false;  
        } else {  
          field.classList.remove('error');  
        }  
      });  
  
      if (isValid) {  
        modalOverlay.style.display = 'none';  
        alert('Thank you for your interest. We\'ll contact you shortly.');  
      }  
    });  
  }  
  
  // Gallery lightbox (about venue images)  
  const galleryImages = document.querySelectorAll('[data-gallery-image]');  
  
  if (galleryImages.length > 0) {  
    const lightboxOverlay = document.createElement('div');  
    lightboxOverlay.className = 'lightbox-overlay';  
    lightboxOverlay.style.display = 'none';  
    document.body.appendChild(lightboxOverlay);  
  
    const lightboxImage = document.createElement('img');  
    lightboxImage.className = 'lightbox-image';  
    lightboxOverlay.appendChild(lightboxImage);  
  
    const closeLightboxBtn = document.createElement('button');  
    closeLightboxBtn.textContent = '×';  
    closeLightboxBtn.className = 'lightbox-close';  
    lightboxOverlay.appendChild(closeLightboxBtn);  
  
    galleryImages.forEach(img => {  
      img.addEventListener('click', () => {  
        lightboxImage.src = img.dataset.galleryImage;  
        lightboxOverlay.style.display = 'flex';  
      });  
    });  
  
    closeLightboxBtn.addEventListener('click', () => {  
      lightboxOverlay.style.display = 'none';  
    });  
  
    // Close on outside click  
    lightboxOverlay.addEventListener('click', (e) => {  
      if (e.target === lightboxOverlay) {  
        lightboxOverlay.style.display = 'none';  
      }  
    });  
  }  
  
  // Smooth scrolling for anchor links  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {  
    anchor.addEventListener('click', function(e) {  
      e.preventDefault();  
      const targetId = this.getAttribute('href');  
      const targetElement = document.querySelector(targetId);  
  
      if (targetElement) {  
        window.scrollTo({  
          top: targetElement.offsetTop - 60, // Adjust for header height  
          behavior: 'smooth'  
        });  
      }  
    });  
  });  
});