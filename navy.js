// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Custom Cursor Follower
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Mobile Menu Logic
const hamburger = document.getElementById("hamburger");
const mobileClose = document.getElementById("mobileClose");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

mobileClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});

function toggleMobileDropdown(element) {
  const dropdown = element.nextElementSibling;
  dropdown.classList.toggle("open");
  element.style.color = dropdown.classList.contains("open")
    ? "var(--accent-secondary)"
    : "#fff";
}
