let lastScrollY = window.scrollY;
const scrollThreshold = 200;

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const currentScrollY = window.scrollY;

  if (currentScrollY > scrollThreshold) {
    if (currentScrollY > lastScrollY) {
      navbar.classList.add("hidden");
    } else if (currentScrollY < lastScrollY) {
      navbar.classList.remove("hidden");
    }
  }

  lastScrollY = currentScrollY;
});
