import DEFAULT_PAGE from "../config.js";

class SideBarBtnView {
  _parentEl = document.querySelector(".movie-sidebar-nav");
  _navBtns = document.querySelectorAll(".nav-btn");
  buttonPage;

  addHandlerEvent(handle) {
    this._parentEl.addEventListener("click", function (event) {
      handle(event);
    });
  }

  renderActive(event) {
    const btn = event.target.closest(".nav-btn");

    if (!btn) return;

    if (btn.dataset.page !== this.buttonPage) {
      // Removes the active classes to all buttons
      // except the btn that has been clicked

      this._navBtns.forEach((el) => {
        if (el !== btn) el.classList.remove("active");
      });

      // Toggles active class to the buttons

      btn.classList.toggle("active");
    }

    this.buttonPage = btn.dataset.page;
    console.log(this.buttonPage);

    // Unexpand the sidebar navigation

    this._parentEl.classList.add("unexpand");

    // Removes unexpand class after 500ms

    setTimeout(() => this._parentEl.classList.remove("unexpand"), 500);
  }
}

export default new SideBarBtnView();
