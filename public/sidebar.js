const toggleSidebar = () => {
  const menuBtn = document.querySelector(".menu-btn");
  const sidebar = document.querySelector(".sidebar");

  menuBtn.addEventListener("click", () => {
    console.log("btn clicked");

    sidebar.classList.toggle("hidden");
  });
};

toggleSidebar();
