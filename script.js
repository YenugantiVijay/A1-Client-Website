const menuButton = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");
const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");
const reviewTrack = document.querySelector("#review-track");
const reviewDialog = document.querySelector("#review-dialog");
const reviewForm = document.querySelector("#review-form");
const reviewEmpty = document.querySelector("#review-empty");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let reviewScrollTimer;
let reviewPaused = false;

if (!reduceMotion.matches && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  document
    .querySelectorAll("main > section, .site-footer")
    .forEach((section) => {
      section.classList.add("scroll-reveal");
      revealObserver.observe(section);
    });
}

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
  menuButton.firstElementChild.className = isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
  siteMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

siteMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (
    window.innerWidth > 900 &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
  }
});

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  formStatus.textContent =
    "Your details have not been sent or saved because this form is not connected. Please call +91 97016 90602 to make your enquiry.";
});

document.querySelector("#current-year").textContent = String(
  new Date().getFullYear(),
);

function openReviewDialog() {
  reviewDialog.showModal();
}

document
  .querySelector("#open-review")
  .addEventListener("click", openReviewDialog);
document.querySelectorAll("[data-open-review]").forEach((button) => {
  button.addEventListener("click", openReviewDialog);
});

document.querySelectorAll("[data-close-review]").forEach((button) => {
  button.addEventListener("click", () => reviewDialog.close());
});

reviewDialog.addEventListener("click", (event) => {
  if (event.target === reviewDialog) reviewDialog.close();
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reviewForm.reportValidity()) return;

  const reviewData = new FormData(reviewForm);
  const card = document.createElement("article");
  const stars = document.createElement("span");
  const message = document.createElement("p");
  const author = document.createElement("strong");
  const rating = Number(reviewData.get("rating"));
  const name = String(reviewData.get("name")).trim();

  card.className = "review-card";
  stars.className = "review-stars";
  stars.setAttribute("role", "img");
  stars.setAttribute("aria-label", `${rating} out of 5 stars`);
  for (let index = 0; index < 5; index += 1) {
    const star = document.createElement("i");
    star.className = index < rating ? "fa-solid fa-star" : "fa-regular fa-star";
    star.setAttribute("aria-hidden", "true");
    stars.append(star);
  }
  message.textContent = String(reviewData.get("review")).trim();
  author.textContent = name || "A learner's family";
  card.append(stars, message, author);
  reviewTrack.append(card);
  reviewEmpty.hidden = true;
  reviewForm.reset();
  reviewDialog.close();
  reviewTrack.scrollTo({ left: reviewTrack.scrollWidth, behavior: "smooth" });
});

document.querySelectorAll("[data-review-direction]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.reviewDirection === "next" ? 1 : -1;
    reviewTrack.scrollBy({
      left: direction * reviewTrack.clientWidth * 0.8,
      behavior: "smooth",
    });
  });
});

reviewTrack.addEventListener("mouseenter", () => {
  reviewPaused = true;
});
reviewTrack.addEventListener("mouseleave", () => {
  reviewPaused = false;
});
reviewTrack.addEventListener("focusin", () => {
  reviewPaused = true;
});
reviewTrack.addEventListener("focusout", () => {
  reviewPaused = false;
});

if (!reduceMotion.matches) {
  reviewScrollTimer = window.setInterval(() => {
    if (
      reviewPaused ||
      document.hidden ||
      reviewTrack.scrollWidth <= reviewTrack.clientWidth
    )
      return;
    const atEnd =
      reviewTrack.scrollLeft + reviewTrack.clientWidth >=
      reviewTrack.scrollWidth - 2;
    reviewTrack.scrollTo({
      left: atEnd ? 0 : reviewTrack.scrollLeft + reviewTrack.clientWidth * 0.8,
      behavior: "smooth",
    });
  }, 4500);
}
