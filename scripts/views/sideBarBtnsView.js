import DEFAULT_PAGE from "../config.js";

class SideBarBtnView {
  _parentEl = document.body;
  _navBtns = document.querySelectorAll(".nav-btn");
  buttonPage = DEFAULT_PAGE;

  addHandlerEvent(handle) {
    this._parentEl.addEventListener("click", function (event) {
      handle(event);
    });
  }

  _renderActive(event) {
    const btn =
      event.target.closest(".nav-btn") ||
      event.target.closest(".showall-card-btn");

    if (!btn) return;

    // Removes the active classes to all buttons
    // except the btn that has been clicked

    this._navBtns.forEach((el) => {
      if (el !== btn) el.classList.remove("active");
    });

    // Creates the ripple effect for the buttons

    const x = event.clientX - btn.offsetLeft;
    const y = event.clientY - btn.offsetTop;

    this._renderRipple(btn, x, y);

    // Toggles active class to the buttons

    btn.classList.toggle("active");
    this._parentEl.classList.add("unexpand");
    this.buttonPage = btn.dataset.page;
    console.log(this.buttonPage);

    setTimeout(() => this._parentEl.classList.remove("unexpand"), 500);
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
