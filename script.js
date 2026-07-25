const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
 link.addEventListener('click', e => {
 e.preventDefault();
 const targetId = link.getAttribute('href').substring(1);
 document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
 });
});

document.addEventListener('DOMContentLoaded', () => {
 const serviceCards = document.querySelectorAll('.service-card');
 serviceCards.forEach(card => {
 card.addEventListener('click', () => {
 const description = card.querySelector('.service-description');
 description.classList.toggle('active');
 });
 });

 const contactForm = document.getElementById('contact-form');
 contactForm.addEventListener('submit', e => {
 e.preventDefault();
 const name = document.getElementById('name').value.trim();
 const email = document.getElementById('email').value.trim();
 const message = document.getElementById('message').value.trim();
 
 if (!name || !email || !message) {
 alert('Please fill in all fields');
 return;
 }
 
 // Simulate form submission
 contactForm.reset();
 alert('Thank you for your message!');
 });
});

const goalButtons = document.querySelectorAll('.goal-btn');
const goalContent = document.getElementById('goal-content');

goalButtons.forEach(button => {
 button.addEventListener('click', () => {
 const goal = button.dataset.goal;
 let content = '';
 
 switch(goal) {
 case 'strength':
 content = 'Build muscle and increase strength with our personalized training programs.';
 break;
 case 'yoga':
 content = 'Find balance and flexibility through our mindful yoga sessions.';
 break;
 case 'cardio':
 content = 'Boost your heart health with high-energy cardio workouts.';
 break;
 }
 
 goalContent.textContent = content;
 });
});

let currentTestimonial = 0;
const testimonials = [
 "Aura Fit transformed my lifestyle - I've never felt better!",
 "The personalized approach made all the difference in my journey.",
 "Finally found a community that truly understands wellness."
];

function showTestimonial(index) {
 document.getElementById('testimonial-text').textContent = testimonials[index];
}

document.getElementById('next-testimonial').addEventListener('click', () => {
 currentTestimonial = (currentTestimonial + 1) % testimonials.length;
 showTestimonial(currentTestimonial);
});

document.getElementById('prev-testimonial').addEventListener('click', () => {
 currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
 showTestimonial(currentTestimonial);
});

showTestimonial(currentTestimonial);

const animatedSections = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries, observer) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 observer.unobserve(entry.target);
 }
 });
}, { threshold: 0.1 });

animatedSections.forEach(section => {
 observer.observe(section);
});