class SideBarBtnView {
  _parentEl = document.querySelector(".movie-sidebar-nav");
  _navBtns = document.querySelectorAll(".nav-btn");

  constructor() {
    this._parentEl.addEventListener("click", this._renderActive.bind(this));
  }

  _renderActive(e) {
    const btn = e.target.closest(".nav-btn");

    if (!btn) return;

    // Removes the active classes to all buttons
    // except the btn that has been clicked

    this._navBtns.forEach((el) => {
      if (el !== btn) el.classList.remove("active");
    });

    // Creates the ripple effect for the buttons

    const x = e.clientX - btn.offsetLeft;
    const y = e.clientY - btn.offsetTop;

    this._renderRipple(btn, x, y);

    // Toggles active class to the buttons

    btn.classList.toggle("active");
  }

  _renderRipple(parent, x, y) {
    const ripple = document.createElement("span");
    ripple.classList.add("btn-ripple");
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    parent.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  }
}

export default new SideBarBtnView();
