const navbarToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
navbarToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.getElementById('discoverMoreBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
});

const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
if (testimonials.length > 0) {
  setInterval(() => {
    testimonials.forEach((t, index) => {
      t.style.display = index === currentIndex ? 'block' : 'none';
    });
    currentIndex = (currentIndex + 1) % testimonials.length;
  }, 5000);
}

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});