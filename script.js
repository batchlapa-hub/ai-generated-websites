const goals = ['Weight Loss', 'Stress Relief', 'Energy Boost', 'Sleep Improvement'];
const tips = {
  'Weight Loss': ['Eat more vegetables', 'Stay hydrated', '15 minutes of daily exercise'],
  'Stress Relief': ['Practice deep breathing', 'Take short walks', 'Meditate for 10 minutes'],
  'Energy Boost': ['Get 7 hours of sleep', 'Drink green tea', 'Stretch every hour'],
  'Sleep Improvement': ['Avoid screens before bed', 'Keep a consistent bedtime', 'Use blackout curtains']
};

const goalButtons = document.querySelectorAll('.goal-btn');
const tipContainer = document.querySelector('#tips');
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const progressSlider = document.getElementById('progress');
const progressValue = document.getElementById('progress-value');

function updateTips(selectedGoal) {
  tipContainer.innerHTML = '';
  tips[selectedGoal].forEach(tip => {
    const p = document.createElement('p');
    p.textContent = tip;
    tipContainer.appendChild(p);
  });
}

goalButtons.forEach(button => {
  button.addEventListener('click', () => {
    goals.forEach(goal => {
      document.querySelector(`.goal-btn[data-goal="${goal}"]`).classList.remove('selected');
    });
    button.classList.add('selected');
    updateTips(button.dataset.goal);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  
  if (!name || !email) {
    alert('Please fill in all fields');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  alert(`Thank you, ${name}! You're subscribed to Aura Fit updates.`);
  form.reset();
});

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

progressSlider.addEventListener('input', () => {
  progressValue.textContent = `${progressSlider.value}%`;
});