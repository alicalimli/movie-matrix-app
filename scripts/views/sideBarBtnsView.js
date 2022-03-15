import DEFAULT_PAGE from "../config.js";

class SideBarBtnView {
  _parentEl = document.querySelector(".movie-sidebar-nav");
  _navBtns = document.querySelectorAll(".nav-btn");
  buttonPage;

  addHandlerEvent(handle) {
    this.toggler();
    this._parentEl.addEventListener("click", function (event) {
      handle(event);
    });
  }

  toggler() {
    const overlay = document.querySelector(".overlay-main");
    const mainMovieSection = document.querySelector(".movie-main");
    const headerSection = document.querySelector(".section-header");
    const paginationSection = document.querySelector(".movie-pagination");
    this._parentEl.addEventListener("mouseover", function () {
      overlay.classList.add("active");
      mainMovieSection.classList.add("active");
      headerSection.classList.add("active");
      paginationSection.classList.add("active");
    });
    this._parentEl.addEventListener("mouseout", function () {
      overlay.classList.remove("active");
      mainMovieSection.classList.remove("active");
      headerSection.classList.remove("active");
      paginationSection.classList.remove("active");
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

    // Unexpand the sidebar navigation

    this._parentEl.classList.add("unexpand");

    // Removes unexpand class after 500ms

    setTimeout(() => this._parentEl.classList.remove("unexpand"), 500);
  }
}

export default new SideBarBtnView();
