const sideBar = document.querySelector(".movie-sidebar-nav");
const navBtns = document.querySelectorAll(".nav-btn");

sideBar.addEventListener("click", function (e) {
  const btn = e.target.closest(".nav-btn");

  if (!btn) return;

  // Removes the active classes to all buttons
  // except the btn that has been clicked

  navBtns.forEach((el) => {
    if (el !== btn) el.classList.remove("active");
  });

  // Creates ripple effect for the buttons

  const x = e.clientX - btn.offsetLeft;
  const y = e.clientY - btn.offsetTop;

  const ripple = document.createElement("span");
  ripple.classList.add("btn-ripple");
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  btn.appendChild(ripple);

  setTimeout(() => ripple.remove(), 1000);

  // Toggles active class to the buttons

  btn.classList.toggle("active");
});
