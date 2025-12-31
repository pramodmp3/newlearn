// =========================================
// JavaScript for Scroll-to-Reveal Animation
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the item is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the visible class to trigger CSS transition
        entry.target.classList.add("reveal-visible");
        // Stop observing once it's revealed
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements with the 'reveal-item' class
  // This applies to the main footer container and its internal sections
  document.querySelectorAll(".reveal-item").forEach((item) => {
    observer.observe(item);
  });
});
