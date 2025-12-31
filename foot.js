document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  initParticles();
  initScrollAnimations();
  initNewsCarousel();
  initNewsletter();

  // Back to Top functionality
  const btt = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      gsap.to(btt, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(btt, { autoAlpha: 0, y: 20, duration: 0.4 });
    }
  });
  btt.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
});

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cols = document.querySelectorAll(".footer-col");

  // Entrance Animations for Cards
  ScrollTrigger.batch(cols, {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "expo.out",
      }),
    start: "top 88%",
  });

  // Logo Light Sweep
  gsap.to(".light-sweep", {
    left: "150%",
    duration: 2.5,
    repeat: -1,
    repeatDelay: 2,
    ease: "power2.inOut",
  });

  // Internal Parallax for elements
  cols.forEach((col) => {
    gsap.to(col.querySelectorAll("h2, .logo-area, .contact-link"), {
      y: -15,
      scrollTrigger: {
        trigger: col,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  // Footer Background Parallax
  gsap.to("footer", {
    backgroundPosition: "50% 110%",
    ease: "none",
    scrollTrigger: {
      trigger: "footer",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

function initNewsCarousel() {
  const newsItems = document.querySelectorAll(".news-item");
  let current = 0;
  gsap.set(newsItems[0], { opacity: 1 });

  setInterval(() => {
    const next = (current + 1) % newsItems.length;

    // Out
    gsap.to(newsItems[current], {
      opacity: 0,
      scale: 0.95,
      y: -30,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // In
    gsap.fromTo(
      newsItems[next],
      { opacity: 0, scale: 1.05, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    current = next;
  }, 6000);
}

//   function initNewsletter() {
//     const form = document.getElementById("newsletter-form");
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const btn = document.getElementById("sub-btn");
//       const input = document.getElementById("email-input");

//       btn.disabled = true;
//       btn.textContent = "Processing...";

//       setTimeout(() => {
//         gsap.to(btn, {
//           background: "#28a745",
//           textContent: "Welcome to the Tribe",
//           duration: 0.4,
//         });
//         input.value = "";
//       }, 1200);
//     });
//   }

function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById("main-footer").offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedY = Math.random() * 0.4 + 0.1;
      this.opacity = Math.random() * 0.4;
    }
    update() {
      this.y -= this.speedY;
      if (this.y < 0) this.reset();
    }
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
