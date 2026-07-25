const initEtherealExperience = () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  
  let ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  
  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Create particles
  for(let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: `hsl(${Math.random()*360}, 70%, 80%)`,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
  
  // Animate particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let p of particles) {
      // Attract to mouse
      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      if(dist < 150) {
        p.vx += dx * 0.005;
        p.vy += dy * 0.005;
      }
      
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off edges
      if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }
    
    for(let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  // Handle mouse movement
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  // Transform section on scroll
  const sections = document.querySelectorAll('section');
  
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      
      if(rect.top < window.innerHeight * 0.75 && 
         rect.bottom > window.innerHeight * 0.25) {
        // Apply transformation
        section.style.transform = `scale(${1 + index*0.1})`;
        section.style.transition = 'transform 0.8s ease-in-out';
      } else {
        section.style.transform = 'scale(1)';
      }
    });
    
    lastScrollY = currentScrollY;
  });
  
  // Interactive button
  const transformButton = document.createElement('button');
  transformButton.textContent = 'Transform Me';
  transformButton.style.position = 'fixed';
  transformButton.style.bottom = '20px';
  transformButton.style.right = '20px';
  transformButton.style.padding = '15px 30px';
  transformButton.style.fontSize = '18px';
  transformButton.style.borderRadius = '50px';
  transformButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  transformButton.style.color = 'white';
  document.body.appendChild(transformButton);
  
  transformButton.addEventListener('click', () => {
    document.body.style.transition = 'background-color 2s ease-in-out';
    document.body.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 95%)`;
    
    particles.forEach(p => {
      p.color = `hsl(${Math.random()*360}, 70%, 80%)`;
    });
  });
};

initEtherealExperience();