import DEFAULT_PAGE from "../config.js";
import mainView from "./mainView.js";

class SideBarBtnView extends mainView {
  _parentEl;
  _navBtns;
  _icons;
  _sidebar;
  buttonPage = "home";

  constructor() {
    super();
    if (window.location.pathname !== "/index.html") return;
    this._parentEl = document.querySelector(".sidebar-lists-btn");
    this._navBtns = document.querySelectorAll(".nav-btn");
    this._icons = this._parentEl.querySelectorAll(".bx");
    this._sidebar = document.querySelector(".movie-sidebar-nav");
  }

  // prettier-ignore
  addHandlerEvent(handle) {
    const darkModeBtn = document.querySelector(".dark-list");
    // Attach Hover event listener in sidebar
    this._sidebar.addEventListener("mouseover", this.toggleOverlay.bind(this,"add"));
    this._sidebar.addEventListener("mouseleave", this.toggleOverlay.bind(this,"remove"));

    // Attach click event listener
    this._parentEl.addEventListener("click", function (event) {
      event.preventDefault();
      handle(event);
    });

    darkModeBtn.addEventListener('click',function(){
      darkModeBtn.classList.toggle("active");
      document.body.classList.toggle("darkmode");
    })
  }

  updateBtn() {
    this._icons.forEach((el) => {
      const elParent = el.closest(".nav-btn");
      // Stops the function when pageType isnt home
      if (elParent.dataset.page !== "home" || !elParent) return;

      // sets active class to home button
      elParent.classList.toggle("active");
      elParent.querySelector(".bx").classList.toggle("active");
    });
  }

  renderActive(event) {
    const btn = event.target.closest(".nav-btn");

    if (!btn) return;

    // Toggles active class to sidebar if expand button is clicked and stops the function

    if (btn.dataset.typeBtn === "expand") {
      this.buttonPage = btn.dataset.page;
      // Only works when sidebar does'nt contain active class
      if (!this._sidebar.classList.contains("active")) {
        this.toggleOverlay("add", "expand");
        return;
      }
      // Only works when sidebar contains active class
      if (this._sidebar.classList.contains("active")) {
        this.toggleOverlay("remove", "expand");
        return;
      }
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
