// DEVELOPER NOTES:
// 1. Swap Lottie URLs in HTML if you want specific custom animations.
// 2. Adjust background-image in CSS .main-footer.
// 3. Testing Checklist: Resize to 320px, Tab through inputs, Toggle Reduced Motion.

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const isReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 1. Cinematic "Film Lead" Entrance
  if (!isReducedMotion) {
    gsap.from("#footer", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: "#footer",
        start: "top bottom",
      },
    });

    // Staggered reveal for footer sections
    gsap.from(".footer-grid > section, .footer-grid > nav", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer-grid",
        start: "top 85%",
      },
    });
  }

  // 2. Bokeh Particles Animation
  const createParticles = () => {
    if (isReducedMotion) return;
    const container = document.getElementById("bokeh");
    for (let i = 0; i < 6; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = Math.random() * 200 + 100;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      container.appendChild(p);

      // Float them around
      gsap.to(p, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  };
  createParticles();

  // 3. Newsletter Logic
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("email");
  const statusMsg = document.getElementById("statusMsg");
  const submitBtn = document.getElementById("submitBtn");
  const confetti = document.getElementById("success-animation");
  const lottiePlayer = document.getElementById("confettiLottie");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      statusMsg.textContent = "Please enter a valid neural address.";
      statusMsg.style.color = "#ff4d4d";
      gsap.fromTo(
        statusMsg,
        { x: -5 },
        { x: 5, duration: 0.1, repeat: 5, yoyo: true }
      );
      return;
    }

    // Fake Async Submission
    submitBtn.disabled = true;
    submitBtn.textContent = "PROCESSING...";
    statusMsg.textContent = "";

    setTimeout(() => {
      submitBtn.style.display = "none";
      emailInput.style.opacity = "0.3";
      emailInput.disabled = true;

      statusMsg.textContent = "TRANSMISSION SUCCESSFUL. WELCOME TO STACKLY.";
      statusMsg.style.color = "var(--gold)";

      // Trigger Lottie Confetti
      confetti.style.display = "block";
      lottiePlayer.play();

      if (!isReducedMotion) {
        gsap.from(statusMsg, { scale: 0.8, opacity: 0, duration: 0.5 });
      }
    }, 1500);
  });

  // 4. Marquee Hover Pause
  const marquee = document.getElementById("news-marquee");
  marquee.addEventListener("mouseenter", () => {
    // In a real implementation with GSAP marquee, we would pause the timeline here
    marquee.style.opacity = "0.8";
  });
  marquee.addEventListener("mouseleave", () => {
    marquee.style.opacity = "1";
  });

  // 5. Link Hover Glows (GSAP)
  if (!isReducedMotion) {
    const links = document.querySelectorAll(".footer-nav a, .social-icon");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, { scale: 1.05, duration: 0.3 });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, { scale: 1, duration: 0.3 });
      });
    });
  }
});
