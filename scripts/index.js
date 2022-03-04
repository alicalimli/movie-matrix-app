const sideBar = document.querySelector(".movie-sidebar-nav");
const navBtns = document.querySelectorAll(".nav-btn");

sideBar.addEventListener("click", function (e) {
  const btn = e.target.closest(".nav-btn");

  if (!btn) return;

  navBtns.forEach((el) => {
    if (el !== btn) el.classList.remove("active");
  });

  btn.classList.toggle("active");
});
