const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu.querySelectorAll("a");

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const openGalleryBtn = document.getElementById("openGalleryBtn");
const closeGalleryBtn = document.getElementById("closeGalleryBtn");
const fullGallery = document.getElementById("fullGallery");
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".full-gallery-item");

if (openGalleryBtn && fullGallery) {
  openGalleryBtn.addEventListener("click", () => {
    fullGallery.classList.add("open");
    fullGallery.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (closeGalleryBtn && fullGallery) {
  closeGalleryBtn.addEventListener("click", () => {
    fullGallery.classList.remove("open");
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});