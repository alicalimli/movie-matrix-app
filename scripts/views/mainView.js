import { IMG_PATH } from "../config";

export default class mainView {
  _parentEl = document.querySelector(".movie-cards");
  _genreParentEl = document.querySelector(".filters-btns");
  _paginationSection = document.querySelector(".movie-pagination");
  _movieData;

  _headTitle = document.querySelector(".header-title");
  _title = "Discover Movies";
  viewName = "discoverMoviesView";

  _overlay = document.querySelector(".overlay-main");
  _mainMovieSection = document.querySelector(".movie-main");
  _headerSection = document.querySelector(".section-header");
  _paginationSection = document.querySelector(".movie-pagination");
  _sidebar = document.querySelector(".movie-sidebar-nav");

  renderHTML(movieData) {
    console.log(movieData);
    this._movieData = movieData;
    this._clearHTML();
    this._generateHTML();
    this._updateTitle();
    this._scrollToTop();
  }

  renderGenreTags(genreData) {
    this._genreParentEl.innerHTML = "";
    genreData.forEach((genre) => {
      const genreMarkup = `
      <li data-genre-id="${genre.id}" class="filters-btn">${genre.name}</li>
      `;
      this._genreParentEl.insertAdjacentHTML("beforeend", genreMarkup);
    });
  }

  renderLoading() {
    const loadingHTML = `
    <div class="placeholder"></div>
    <div class="loading-spinner"></div>
    <div class="loading-spinner2"></div>
     `;
    this._clearHTML();
    this._parentEl.insertAdjacentHTML("beforeend", loadingHTML);
  }

  // Toggles Overlay
  toggleOverlay(type, btnType = "none") {
    this._overlay.classList[type]("active");
    this._mainMovieSection.classList[type]("active");
    this._headerSection.classList[type]("active");
    this._paginationSection.classList[type]("active");
    if (type === "remove") this._sidebar.classList[type]("active");

    if (btnType !== "expand") return;
    this._sidebar.classList[type]("active");
  }

  _scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  _updateTitle() {
    this._headTitle.textContent = this._title;
  }

  _clearHTML() {
    this._parentEl.innerHTML = "";
    this._paginationSection.innerHTML = "";
  }

  // prettier-ignore
  _generateHTML() {
    this._movieData.forEach((movie) => {
      const markupHTML = `
          <div class="movie-card">
          ${movie.img !== null ? `
            <img
            class="movie-img"
            src="${IMG_PATH + movie.img}"
            alt="${movie.title}"/>
            ` : `
            <div class="card img-card">
              <i class="ph-icon ph-warning"></i>
              <span class="img-unavailable-text">Image <br> Unavailable</span>
            </div>
            `
          }
          <div class="overlay-card"></div>

          <button data-card-id="${movie.id}" class="expand-btn">
          <span class="movie-expand"></span>
          <i class="bx bx-expand expand-icon"></i>Expand</span>
          </button>
          <div class="movie-info">
            <span class="movie-title">${movie.title}</span>
          </div>
        </div>
          `;
      this._parentEl.insertAdjacentHTML("beforeend", markupHTML);
    });
  }
}
