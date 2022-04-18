import mainView from "./mainView.js";
import othersView from "./othersView.js";

class SideBarBtnView extends mainView {
  _settingsContainer = document.querySelector(".settings-container");
  _parentEl = document.querySelector(".sidebar-lists-btn");
  _sidebar = document.querySelector(".movie-sidebar-nav");
  _navBtns = document.querySelectorAll(".nav-btn");
  _icons = this._parentEl.querySelectorAll(".bx");
  _menuBtn = document.querySelector(".menu-btn");

  buttonPage = "home";

  _shrinkSections(type) {
    othersView.shrinkSections("add");
    othersView.showOverlay("add");
  }

  _unShrinkSections() {
    if (this._settingsContainer.classList.contains("show")) return;

    othersView.shrinkSections("remove");
    othersView.showOverlay("remove");
    othersView.expandSidebar("remove");
  }

  // prettier-ignore
  addHandlerEvent(handle) {
    // Attach Hover event listener in sidebar
    this._sidebar.addEventListener("mouseover", this._shrinkSections);

    this._sidebar.addEventListener("mouseleave", this._unShrinkSections.bind(this));

    // Attach click event listener
    this._parentEl.addEventListener("click", function (event) {
      event.preventDefault();
      handle(event);
    });


    this._menuBtn.addEventListener("click", function () {
      othersView.shrinkSections("add")
      othersView.showOverlay('add')
      othersView.expandSidebar("add")
    });
  }

  updateBtn(btnType) {
    this._icons.forEach((el) => {
      const elParent = el.closest(".nav-btn");

      if (btnType === "search-res") {
        elParent.classList.remove("active");
        elParent.querySelector(".bx").classList.remove("active");
        return;
      }

      // Stops the function when pageType isn't home
      if (elParent.dataset.page !== "home" || !elParent) return;
      // sets active class to buttons
      elParent.classList.toggle("active");
      elParent.querySelector(".bx").classList.toggle("active");
    });
  }

  renderActive(event) {
    const btn = event.target.closest(".nav-btn");

    if (!btn) return;

    // Toggles active class to sidebar if expand button is clicked and stops the function

    if (btn.dataset.typeBtn === "expand") {
      othersView.expandSidebar("add");
      return;
    }

    if (btn.dataset.page !== this.buttonPage) {
      // Removes the active classes to all buttons
      // except the btn that has been clicked
      this._navBtns.forEach((el) => {
        if (el !== btn) el.classList.remove("active");
      });

      this._icons.forEach((el) => {
        el.classList.remove("active");
      });

      // Toggles active class to the buttons
      btn.querySelector(".bx").classList.toggle("active");
      btn.classList.toggle("active");
    }

    this.buttonPage = btn.dataset.page;
  }
}

export default new SideBarBtnView();
