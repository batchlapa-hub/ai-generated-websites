const modal = document.createElement("div");
modal.style.position = "fixed";
modal.style.top = "50%";
modal.style.left = "50%";
modal.style.transform = "translate(-50%, -50%)";
modal.style.backgroundColor = "#fff";
modal.style.padding = "30px 40px";
modal.style.borderRadius = "12px";
modal.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
modal.style.zIndex = "1000";
modal.style.display = "none";
modal.style.maxWidth = "500px";
modal.style.width = "90%";
modal.style.textAlign = "center";

const modalContent = document.createElement("div");
modal.appendChild(modalContent);

const closeModalBtn = document.createElement("button");
closeModalBtn.textContent = "Close";
closeModalBtn.style.marginTop = "30px";
closeModalBtn.style.padding = "10px 20px";
closeModalBtn.style.fontSize = "16px";
closeModalBtn.style.borderRadius = "8px";
closeModalBtn.style.backgroundColor = "#2B4A6C";
closeModalBtn.style.color = "#fff";
closeModalBtn.style.border = "none";
closeModalBtn.style.cursor = "pointer";

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
modal.appendChild(closeModalBtn);

document.body.appendChild(modal);

const links = document.querySelectorAll("a");
links.forEach(link => {
  if (link.textContent.trim() === "Join the Elite Today" || 
      link.textContent.trim() === "View Class Schedule" ||
      link.textContent.trim() === "Explore Our Team" ||
      link.textContent.trim() === "See Pricing Plans" ||
      link.textContent.trim() === "Book Now") {
    
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      let message;
      switch(link.textContent.trim()) {
        case "Join the Elite Today":
          message = "Thank you for joining Aura Fit! Your transformation begins now.";
          break;
        case "View Class Schedule":
          message = "Our elite classes include HIIT, Yoga, Strength Training & more. View full schedule below.";
          break;
        case "Explore Our Team":
          message = "Meet our internationally certified trainers who specialize in functional fitness and holistic wellness.";
          break;
        case "See Pricing Plans":
          message