const menuButton = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");
const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
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
