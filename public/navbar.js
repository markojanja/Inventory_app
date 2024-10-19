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

const closeSidebarMain = () => {
  const mainSidebar = document.querySelector(".sidebar-main");
  const closeBtn = document.querySelector(".close-btn");

  closeBtn.addEventListener("click", () => {
    console.log("click");
    mainSidebar.classList.remove("show");
  });
};

const toggleSidebarMain = () => {
  const mainSidebar = document.querySelector(".sidebar-main");
  const closeBtn = document.querySelector(".opn-btn");

  closeBtn.addEventListener("click", () => {
    console.log("click");
    mainSidebar.classList.add("show");
  });
};

toggleSidebarMain();
closeSidebarMain();
