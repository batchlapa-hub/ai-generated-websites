const navLinks = document.querySelectorAll('nav a');
const contactForm = document.querySelector('#contact-form');
const modalTrigger = document.querySelector('#learn-more');
const modal = document.querySelector('#wellness-modal');
const closeModalBtn = document.querySelector('.close-modal');

navLinks.forEach(link => {
 link.addEventListener('click', e => {
  e.preventDefault();
  const targetId = link.getAttribute('href').substring(1);
  document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
 });
});

contactForm.addEventListener('submit', e => {
 e.preventDefault();
 const name = contactForm.name.value.trim();
 const email = contactForm.email.value.trim();
 const message = contactForm.message.value.trim();
 
 if (!name || !email || !message) {
  alert('Please fill in all fields');
  return;
 }
 
 if (!isValidEmail(email)) {
  alert('Please enter a valid email address');
  return;
 }
 
 alert('Thank you for your message!');
 contactForm.reset();
});

modalTrigger.addEventListener('click', () => {
 modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
 modal.classList.remove('active');
});

window.addEventListener('click', e => {
 if (e.target === modal) {
  modal.classList.remove('active');
 }
});

function isValidEmail(email) {
 const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return re.test(email);
}