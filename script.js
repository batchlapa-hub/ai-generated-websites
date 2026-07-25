const init = () => {  
  const form = document.getElementById('contactForm');  
  const emailInput = document.getElementById('email');  
  const messageContainer = document.getElementById('message');  
  const toggleBtn = document.getElementById('toggleBtn');  
  const contentBox = document.getElementById('contentBox');  

  // Form validation  
  form.addEventListener('submit', (e) => {  
    e.preventDefault();  
    if (validateEmail(emailInput.value)) {  
      messageContainer.textContent = 'Form submitted successfully!';  
      messageContainer.style.color = 'green';  
    } else {  
      messageContainer.textContent = 'Please enter a valid email address';  
      messageContainer.style.color = 'red';  
    }  
  });  

  // Real-time email validation  
  emailInput.addEventListener('input', () => {  
    const isValid = validateEmail(emailInput.value);  
    emailInput.classList.toggle('invalid', !isValid);  
  });  

  // Dynamic content toggle  
  toggleBtn.addEventListener('click', () => {  
    contentBox.textContent = contentBox.textContent === 'Hidden Content' ? 'Visible Content' : 'Hidden Content';  
  });  

  // Utility function for email validation  
  function validateEmail(email) {  
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return re.test(String(email).toLowerCase());  
  }  
};  

document.addEventListener('DOMContentLoaded', init);