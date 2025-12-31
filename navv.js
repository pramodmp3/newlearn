function toggleMobileDropdown(e) {
  e.preventDefault();
  const parent = e.currentTarget.parentElement;
  const dropdown = parent.querySelector(".mobile-dropdown");
  const chevron = e.currentTarget.querySelector(".chevron");

  if (dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px") {
    dropdown.style.maxHeight = "0px";
    gsap.to(chevron, { rotate: 45, y: -2 });
  } else {
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    gsap.to(chevron, { rotate: -135, y: 1 });
  }
}

window.addEventListener("load", () => {
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("logo");
  const navItems = document.querySelectorAll(".nav-item");
  const loginBtn = document.getElementById("loginBtn");
  const cursor = document.getElementById("cursor");

  // 1. Entrance Sequence
  const tl = gsap.timeline({
    defaults: { ease: "expo.out", duration: 1.2 },
  });
  tl.fromTo(navbar, { y: -100, opacity: 0 }, { y: 0, opacity: 1 })
    .from(logo, { x: -30, opacity: 0 }, "-=0.8")
    .from(navItems, { y: 20, opacity: 0, stagger: 0.08 }, "-=1")
    .fromTo(
      loginBtn,
      { scale: 0.5, opacity: 0, x: 50 },
      { scale: 1, opacity: 1, x: 0, ease: "back.out(1.7)", duration: 1 },
      "-=0.6"
    );

  // 2. Logo Glow
  gsap.to(".logo-box", {
    boxShadow: "0 0 25px #39FF14, 0 0 5px #39FF14",
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
  });

  // 3. Desktop Dropdown Logic
  document.querySelectorAll(".dropdown-trigger").forEach((trigger) => {
    const dropdown = trigger.querySelector(".dropdown");
    const items = dropdown.querySelectorAll(".dropdown-item");
    const chevron = trigger.querySelector(".chevron");

    let dropdownTl = gsap.timeline({ paused: true });
    dropdownTl
      .to(dropdown, {
        visibility: "visible",
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        duration: 0.4,
        pointerEvents: "auto",
      })
      .to(items, { opacity: 1, y: 0, stagger: 0.05, duration: 0.3 }, "-=0.2")
      .to(chevron, { rotate: -135, y: 1, duration: 0.3 }, 0);

    trigger.addEventListener("mouseenter", () => dropdownTl.play());
    trigger.addEventListener("mouseleave", () => dropdownTl.reverse());
  });

  // 4. Magnetic Effects
  document.querySelectorAll(".magnetic, .nav-link, .logo").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      gsap.to(el, { x, y, duration: 0.4 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });

  // 5. Scroll Background
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // 6. Mobile Menu Logic
  const hamburger = document.getElementById("hamburger");
  const mobileClose = document.getElementById("mobileClose");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const mobileItems = document.querySelectorAll(".mobile-nav-item");

  const menuTl = gsap.timeline({ paused: true });
  menuTl
    .to(mobileOverlay, { x: 0, duration: 0.8, ease: "expo.inOut" })
    .to(
      mobileClose,
      { opacity: 1, pointerEvents: "auto", duration: 0.4 },
      "-=0.4"
    )
    .to(
      mobileItems,
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
      "-=0.4"
    );

  hamburger.addEventListener("click", () => {
    menuTl.play();
    document.body.style.overflow = "hidden";
  });

  mobileClose.addEventListener("click", () => {
    menuTl.reverse();
    document.body.style.overflow = "auto";
  });

  // 7. Custom Cursor
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX - 6,
      y: e.clientY - 6,
      duration: 0.2,
    });
  });
  document
    .querySelectorAll("a, button, .hamburger, .mobile-close")
    .forEach((item) => {
      item.addEventListener("mouseenter", () =>
        gsap.to(cursor, { scale: 4, opacity: 0.2, duration: 0.3 })
      );
      item.addEventListener("mouseleave", () =>
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      );
    });
});
