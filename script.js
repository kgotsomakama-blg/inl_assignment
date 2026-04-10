// ============================================
// SECTION 1: TYPING EFFECT
// ============================================
(function typingEffect() {
  const words = ["Mr Edward ", "A Lecturer ", "A Mentor ", "Code Alchemist "];
  let wordIndex = 0, charIndex = 0;
  const typingElement = document.getElementById("typing");
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.innerText = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.innerText = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 300);
      return;
    }
    const speed = isDeleting ? 45 : 95;
    setTimeout(typeEffect, speed);
  }
  typeEffect();
})();

// ============================================
// SECTION 2: QUOTE CAROUSEL
// ============================================
(function quoteCarousel() {
  const quotes = [
    " Education is the most powerful weapon.", 
    " Code your future, one line at a time.",
    " Inspire. Teach. Lead. Innovate.",
    " Curiosity is the engine of achievement."
  ];
  let quoteIdx = 0;
  const quoteSpan = document.getElementById("quote");
  setInterval(() => {
    quoteIdx = (quoteIdx + 1) % quotes.length;
    quoteSpan.style.opacity = "0";
    setTimeout(() => {
      quoteSpan.innerText = quotes[quoteIdx];
      quoteSpan.style.opacity = "1";
    }, 150);
  }, 3200);
})();

// ============================================
// SECTION 3: FLIP CARDS TOGGLE
// ============================================
(function flipCards() {
  document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.toggle("flip");
    });
  });
})();

// ============================================
// SECTION 4: CONTACT BUTTON INTERACTION
// ============================================
(function contactHandler() {
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      alert(" Email feature ready! Copy the address: Edward.belgiumcampus.ac.za");
      const emailDiv = document.getElementById("emailDisplay");
      emailDiv.style.transform = "scale(1.02)";
      setTimeout(() => { emailDiv.style.transform = ""; }, 300);
    });
  }
})();

// ============================================
// SECTION 5: SCROLL REVEAL (Intersection Observer)
// ============================================
(function scrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -60px 0px" });
  revealElements.forEach(el => observer.observe(el));
})();

// ============================================
// SECTION 6: SMOOTH SCROLL FOR NAV LINKS
// ============================================
(function smoothScroll() {
  document.querySelectorAll(".nav-links a, a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const hash = this.getAttribute("href");
      if (hash && hash !== "#" && hash !== "") {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
})();

// ============================================
// SECTION 7: PARTICLES BACKGROUND
// ============================================
(function particleBackground() {
  const canvas = document.getElementById("particle-canvas");
  let ctx = canvas.getContext("2d");
  let particles = [];
  let particleCount = 100;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1.2;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.color = `rgba(255, ${Math.floor(100 + Math.random() * 100)}, ${Math.floor(50 + Math.random() * 70)}, ${Math.random() * 0.5 + 0.2})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 140, 70, ${0.12 * (1 - dist/100)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();
})();

// ============================================
// SECTION 8: AVATAR 3D TILT & INTERACTION
// ============================================
(function avatarEnhancements() {
  const avatarCircleElem = document.querySelector('.avatar-circle');
  const avatarImgElem = document.getElementById('profileAvatar');
  
  if (avatarCircleElem) {
    // 3D tilt effect for interactive avatar
    avatarCircleElem.addEventListener('mousemove', (e) => {
      const rect = avatarCircleElem.getBoundingClientRect();
      const centerX = rect.left + rect.width/2;
      const centerY = rect.top + rect.height/2;
      const deltaX = (e.clientX - centerX) / 18;
      const deltaY = (e.clientY - centerY) / 18;
      avatarCircleElem.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.02)`;
      avatarCircleElem.style.transition = 'transform 0.1s ease-out';
    });
    avatarCircleElem.addEventListener('mouseleave', () => {
      avatarCircleElem.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
      avatarCircleElem.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
  }
  
  // Graceful fallback if image missing - keeps avatar animated
  if (avatarImgElem) {
    avatarImgElem.addEventListener('error', () => {
      avatarImgElem.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle fill="%23ff7b2c" cx="50" cy="50" r="50"/%3E%3Ctext fill="white" x="50" y="67" text-anchor="middle" font-size="40" dy=".3em"%3EE%3C/text%3E%3C/svg%3E';
    });
  }
})();

// ============================================
// SECTION 9: NAVBAR DYNAMIC SCROLL EFFECT
// ============================================
(function dynamicNavbar() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 30) {
      nav.style.background = 'rgba(8, 12, 24, 0.9)';
      nav.style.backdropFilter = 'blur(16px)';
    } else {
      nav.style.background = 'rgba(10, 20, 35, 0.75)';
    }
  });
})();