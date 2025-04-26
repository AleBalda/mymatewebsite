// FUNZIONE SFONDO VANTA //

VANTA.NET({
  el: "#vanta-bg",
  color: 0x2c3e50,
  backgroundColor: 0x000000,
  points: 12.0,
  maxDistance: 20.0,
  spacing: 18.0,
});

// FUNZIONE NAVBAR //

function initNavbar() {
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // DROPDOWN
  document.querySelectorAll(".nav-item").forEach((item) => {
    const span = item.querySelector("span");

    if (span) {
      span.addEventListener("click", (e) => {
        if (isMobile()) {
          e.stopPropagation();
          item.classList.toggle("active");
          document.querySelectorAll(".nav-item").forEach((el) => {
            if (el !== item) el.classList.remove("active");
          });
        }
      });
    }

    if (!isMobile()) {
      let timeout;
      item.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
        document
          .querySelectorAll(".nav-item")
          .forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
      });

      item.addEventListener("mouseleave", () => {
        timeout = setTimeout(() => {
          item.classList.remove("active");
        }, 300);
      });
    }
  });


  function showPopup() {
    const popup = document.getElementById('popupMessage');
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 2000); // Dopo 2 secondi sparisce
  }

  document.getElementById('loginBtn').addEventListener('click', showPopup);
  document.getElementById('registerBtn').addEventListener('click', showPopup);



// HAMBURGER MENU

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("show");
      hamburger.classList.toggle("open"); // cambia il simbolo
    });

    document.addEventListener("click", (e) => {
      if (
        isMobile() &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navLinks.classList.remove("show");
        hamburger.classList.remove("open");
        document
          .querySelectorAll(".nav-item")
          .forEach((el) => el.classList.remove("active"));
      }
    });
  }
}

// SEZIONE CAROSELLO //

const carousel = document.getElementById("carousel");
const container = document.getElementById("carousel-container");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

let cards = document.querySelectorAll(".carousel-card");
let index = 1;
let interval;

const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
firstClone.id = "first-clone";
lastClone.id = "last-clone";

carousel.appendChild(firstClone);
carousel.prepend(lastClone);

cards = document.querySelectorAll(".carousel-card"); // aggiorniamo dopo append
const slideWidth = container.offsetWidth;

carousel.style.transform = `translateX(-${slideWidth * index}px)`;

function updateCarousel() {
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(-${slideWidth * index}px)`;
}

function nextSlide() {
  if (index >= cards.length - 1) return;
  index++;
  updateCarousel();
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  updateCarousel();
}

carousel.addEventListener("transitionend", () => {
  if (cards[index].id === "first-clone") {
    carousel.style.transition = "none";
    index = 1;
    carousel.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  if (cards[index].id === "last-clone") {
    carousel.style.transition = "none";
    index = cards.length - 2;
    carousel.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", prevSlide);

function startAutoSlide() {
  interval = setInterval(() => {
    nextSlide();
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

container.addEventListener("mouseenter", stopAutoSlide);
container.addEventListener("mouseleave", startAutoSlide);

startAutoSlide();

window.addEventListener("resize", () => {
  const newWidth = container.offsetWidth;
  carousel.style.transition = "none";
  carousel.style.transform = `translateX(-${newWidth * index}px)`;
});



