const goalForm = document.getElementById('goal-form');
const goalInput = document.getElementById('goal-input');
const goalList = document.getElementById('goal-list');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const quoteDisplay = document.getElementById('quote-display');
const quoteButton = document.getElementById('quote-button');

let goals = [];

function saveGoals() {
  localStorage.setItem('wellnessGoals', JSON.stringify(goals));
}

function loadGoals() {
  const savedGoals = localStorage.getItem('wellnessGoals');
  if (savedGoals) {
    goals = JSON.parse(savedGoals);
    renderGoals();
    updateProgress();
  }
}

function addGoal(text) {
  goals.push({ id: Date.now(), text, completed: false });
  saveGoals();
  renderGoals();
  updateProgress();
}

function toggleGoalCompletion(id) {
  goals = goals.map(goal => 
    goal.id === id ? { ...goal, completed: !goal.completed } : goal
  );
  saveGoals();
  renderGoals();
  updateProgress();
}

function renderGoals() {
  goalList.innerHTML = '';
  let completedCount = 0;
  
  goals.forEach(goal => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = goal.completed;
    checkbox.addEventListener('change', () => toggleGoalCompletion(goal.id));
    
    const span = document.createElement('span');
    span.textContent = goal.text;
    
    li.appendChild(checkbox);
    li.appendChild(span);
    goalList.appendChild(li);
    
    if (goal.completed) completedCount++;
  });
}

function updateProgress() {
  const total = goals.length;
  const completed = goals.filter(g => g.completed).length;
  
  progressContainer.style.display = total > 0 ? 'block' : 'none';
  progressBar.style.width = `${(completed / total) * 100}%`;
  progressBar.textContent = `${completed}/${total} Goals Completed`;
}

function getRandomQuote() {
  const quotes = [
    "Your health is your greatest wealth.",
    "Small steps today lead to big changes tomorrow.",
    "Wellness is a journey, not a destination.",
    "Take care of your body; it's the only one you have.",
    "Progress, not perfection."
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
}

goalForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = goalInput.value.trim();
  if (text && !goals.some(g => g.text === text)) {
    addGoal(text);
    goalInput.value = '';
  }
});

quoteButton.addEventListener('click', () => {
  quoteDisplay.textContent = getRandomQuote();
});

loadGoals();
quoteDisplay.textContent = getRandomQuote();