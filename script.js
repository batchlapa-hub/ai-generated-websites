(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Mobile nav toggle
    const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.getElementById("site-nav");

    if (navToggle && siteNav) {
      navToggle.addEventListener("click", function () {
        siteNav.classList.toggle("is-open");
        navToggle.setAttribute(
          "aria-expanded",
          siteNav.classList.contains("is-open")
        );
      });
    }

    // Scroll-reveal with IntersectionObserver
    const revealElements = document.querySelectorAll("[data-reveal]");

    if (revealElements.length > 0) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(el => observer.observe(el));
    }

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: "smooth"
          });
        }
      });
    });

    // Contact form validation
    const contactForm = document.querySelector(".section-contact_form form");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        // Reset previous errors
        document.querySelectorAll(".section-contact_form .error").forEach(el => {
          el.textContent = "";
        });

        const nameField = contactForm.querySelector("[name='name']");
        const emailField = contactForm.querySelector("[name='email']");

        if (!nameField.value.trim()) {
          isValid = false;
          nameField.nextElementSibling.textContent = "Name is required.";
        }

        if (!emailField.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
          isValid = false;
          emailField.nextElementSibling.textContent = "Valid email is required.";
        }

        if (isValid) {
          // Replace form with confirmation message
          contactForm.innerHTML = "<p>Thank you! Your message has been sent.</p>";
        }
      });
    }
  });
})();