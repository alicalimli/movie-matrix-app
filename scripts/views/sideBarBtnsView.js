import DEFAULT_PAGE from "../config.js";

class SideBarBtnView {
  _parentEl = document.querySelector(".movie-sidebar-nav");
  _navBtns = document.querySelectorAll(".nav-btn");
  _icons = document.querySelectorAll(".bx");
  buttonPage = "home";

  addHandlerEvent(handle) {
    this.toggler();
    this._parentEl.addEventListener("click", function (event) {
      event.preventDefault();
      handle(event);
    });
  }

  updateBtn() {
    this._icons.forEach((el) => {
      const elParent = el.closest(".nav-btn");
      // Stops the function when pageType isnt home
      if (elParent.dataset.page !== "home") return;

      // sets active class to home button
      el.closest(".nav-btn").classList.toggle("active");
      el.closest(".nav-btn").querySelector(".bx").classList.toggle("active");
    });
  }

  toggler() {
    const overlay = document.querySelector(".overlay-main");
    const mainMovieSection = document.querySelector(".movie-main");
    const headerSection = document.querySelector(".section-header");
    const paginationSection = document.querySelector(".movie-pagination");
    const sidebar = document.querySelector(".movie-sidebar-nav");
    this._parentEl.addEventListener("mouseover", function () {
      overlay.classList.add("active");
      mainMovieSection.classList.add("active");
      headerSection.classList.add("active");
      paginationSection.classList.add("active");
    });
    this._parentEl.addEventListener("mouseleave", function () {
      overlay.classList.remove("active");
      mainMovieSection.classList.remove("active");
      headerSection.classList.remove("active");
      paginationSection.classList.remove("active");
      sidebar.classList.remove("active");
    });
  }

  renderActive(event) {
    const btn = event.target.closest(".nav-btn");
    const sidebar = document.querySelector(".movie-sidebar-nav");
    const expandSideBtn = document.querySelector(".sidebar-expand-btn");
    const overlay = document.querySelector(".overlay-main");
    const mainMovieSection = document.querySelector(".movie-main");
    const headerSection = document.querySelector(".section-header");
    const paginationSection = document.querySelector(".movie-pagination");

    if (!btn) return;

    // Toggles active class to sidebar and stops the function

    if (btn.dataset.typeBtn === "expand") {
      sidebar.classList.toggle("active");
      this.buttonPage = btn.dataset.page;
      return;
    }

    if (btn.dataset.page !== this.buttonPage) {
      // Removes the active classes to all buttons
      // except the btn that has been clicked

      this._navBtns.forEach((el, i) => {
        this._icons[i].classList.remove("active");
        if (el !== btn) el.classList.remove("active");
      });

      // Toggles active class to the buttons

      btn.querySelector(".bx").classList.toggle("active");
      btn.classList.toggle("active");
    }

    this.buttonPage = btn.dataset.page;
  }
}

export default new SideBarBtnView();
