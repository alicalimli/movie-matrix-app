import mainView from "./mainView";

class popularMoviesView extends mainView {
  _title = "Popular Movies";
  _filterBtnsParent = document.querySelector(".filters-btns");

  constructor() {
    super();
    const headerFilterBtn = document.querySelector(".header-filter-btn");
    const headerSection = document.querySelector(".section-header");
    const filterBtnContainer = document.querySelector(".filter-btn-container");
    const movieSection = document.querySelector(".movie-main");
    const overlay = document.querySelector(".overlay-main");

    let isGenresHidden = true;
    headerFilterBtn.addEventListener("click", function () {
      if (isGenresHidden) {
        isGenresHidden = false;
        console.log("lala");
        filterBtnContainer.classList.add("active");
        document.querySelector(".movie-sidebar-nav").style.pointerEvents =
          "none";
        document.querySelector(".sidebar-buttons").style.pointerEvents = "none";
        movieSection.style.pointerEvents = "none";
        return;
      }
      if (!isGenresHidden) {
        isGenresHidden = true;
        console.log("lele");
        filterBtnContainer.classList.remove("active");
        document.querySelector(".movie-sidebar-nav").style.pointerEvents =
          "auto";
        document.querySelector(".sidebar-buttons").style.pointerEvents = "auto";
        movieSection.style.pointerEvents = "auto";
        return;
      }
    });
  }

  renderHTML(movieData) {
    this._movieData = movieData;
    this._clearHTML();
    this._generateHTML();
    this._scrollToTop();
  }

  addHandlerEvent(handle) {
    const genreArr = [];

    this._filterBtnsParent.addEventListener("click", function (e) {
      const btn = e.target.closest(".filters-btn");

      if (!btn) return;

      handle(btn);
    });
  }
}

export default new popularMoviesView();
