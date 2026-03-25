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

function openGallery() {
  fullGallery.classList.add("open");
  fullGallery.style.maxHeight = fullGallery.scrollHeight + "px";

  openGalleryBtn.textContent = "Fechar galeria";

  setTimeout(() => {
    fullGallery.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
}

function closeGallery() {
  fullGallery.style.maxHeight = fullGallery.scrollHeight + "px";

  requestAnimationFrame(() => {
    fullGallery.style.maxHeight = "0px";
    fullGallery.classList.remove("open");
  });

  openGalleryBtn.textContent = "Ver galeria completa";
}

if (openGalleryBtn && fullGallery) {
  openGalleryBtn.addEventListener("click", () => {
    const isOpen = fullGallery.classList.contains("open");

    if (isOpen) {
      closeGallery();
    } else {
      openGallery();
    }
  });
}

if (closeGalleryBtn && fullGallery) {
  closeGalleryBtn.addEventListener("click", () => {
    closeGallery();
  });
}

window.addEventListener("resize", () => {
  if (fullGallery.classList.contains("open")) {
    fullGallery.style.maxHeight = fullGallery.scrollHeight + "px";
  }
});

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

    if (fullGallery.classList.contains("open")) {
      fullGallery.style.maxHeight = fullGallery.scrollHeight + "px";
    }
  });
});