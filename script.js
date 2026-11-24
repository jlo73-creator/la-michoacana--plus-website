// Add a mobile menu button to the existing header.
const header = document.querySelector("body > header");
const navigation = header?.querySelector("nav");

if (header && navigation) {
  const menuButton = document.createElement("button");
  const mobileScreen = window.matchMedia"(max-width: 767px)";

navigation.id = "main-navigation";

menuButton.type = "button";
menuButton.className = "menu-toggle";
menuButton.setAttribute("aria-controls", navigation.id);
menuButton.setAttribute("aria-expanded", "false");
menuButton.textContent = "☰ Menu";

header.insertBefore(menuButton, navigation);

// Keep the botton, menu visibility, and accessibility state together.
function setMenuOpen(isOpen) {
  navigation.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "X Close" : "☰ Menu";
  navigation.inert = mobileScreen.matches && !isOpen;
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

// Close the mobile menu after selecting a page.
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && mobileScreen.matches) {
    setMenuOpen(false);
  }
});

// Escape closes the menu and returns focus to its button.
header.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileScreen.matches) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

// Reset the menu when switching between mobile and desktop.
mobileScreen.addEventListener("change", () => {
  setMenuOpen(false);
});

header.classList.add("menu-ready");
setMenuOpen(false);
}
