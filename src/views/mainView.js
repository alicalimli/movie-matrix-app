import { IMG_PATH } from "../config";

/**
 * The main view
 */
export default class mainView {
  _paginationSection = document.querySelector(".movie-pagination");
  _parentEl = document.querySelector(".movie-cards");
  _movieData;
  _bmData;

  _headTitle = document.querySelector(".header-title");
  _mainMovieSection = document.querySelector(".movie-main");
  _headerSection = document.querySelector(".section-header");
  _paginationSection = document.querySelector(".movie-pagination");
  _sidebar = document.querySelector(".movie-sidebar-nav");

  _title = "Discover Movies";
  viewName = "discoverMoviesView";

  /**
   * Renders the generated movie/tv show cards in the page.
   * @param {Array} movieData - Array of objects that contains the id,image and title of the movie/tv show.
   * @param {Array} bmData - Array that contains all the user bookmarked movies/tv shows data.
   */
  renderHTML(movieData, bmData) {
    this._movieData = movieData;
    this._bmData = bmData;
    this._clearHTML();
    this._generateHTML();
    this._updateTitle();
    this._scrollToTop();
  }

  /**
   * Generates error HTML and renders it in the page.
   * @param {String} errorMsg - Error message to be rendered in the page.
   */
  renderErrorMsg(errorMsg) {
    const errorMarkup = `
    <div class="error-msg">
      <i class="ph-icon ph-warning"></i>
      <span class="img-unavailable-text">${errorMsg}</span>
    </div>
    `;

    this._clearHTML();
    this._paginationSection.insertAdjacentHTML("beforeend", errorMarkup);
  }

  /**
   * Renders loading spinner in the page.
   */
  renderLoading() {
    const loadingHTML = `
    <div class="placeholder"></div>
    <div class="loading-spinner"></div>
    <div class="loading-spinner2"></div>
    `;

    this._clearHTML();
    this._parentEl.insertAdjacentHTML("beforeend", loadingHTML);
  }

  /**
   * Scrolls the view to the very top of the page.
   */
  _scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  /**
   * Updates the page title.
   */
  _updateTitle() {
    this._headTitle.textContent = this._title;
  }

  /**
   * Clears the innerHTML of the parent element.
   */
  _clearHTML() {
    this._parentEl.innerHTML = "";
    this._paginationSection.innerHTML = "";
  }

  // prettier-ignore
  /**
   * Generates movie/tv show cards and render it in the page once done.
   */
  _generateHTML() {
    this._movieData.forEach((movie) => {
      const markupHTML = `
          <div id="movie-${movie.id}"class="movie-card">
          ${movie.img !== null ? `
            <img
            class="movie-img"
            src="${IMG_PATH + movie.img}"
            alt="${movie.title}"/>
            ` : `
            <div class="card img-card">
              <i class="ph-icon ph-warning"></i>
              <p class="img-unavailable-text">Image <br> Unavailable</p>
            </div>
            `
          }
          <div class="overlay-card"></div>
          ${this._checkBookMarked(movie, this._bmData)}
          
          <button data-card-id="${movie.id}" class="expand-btn">
            <i class="bx bx-expand expand-icon"></i>
            <p>Expand</p>
          </button>
          <div class="movie-info">
            <p class="movie-title">${movie.title}</p>
          </div>
        </div>
          `;
      this._parentEl.insertAdjacentHTML("beforeend", markupHTML);
    });
  }

  /**
   * Checks if the movie/tv show is bookmarked and if bookmarked then the card would be generated with a bookmark icon.
   * @param {Object} data - Contains the title,image and id of the movie/tv show.
   * @param {Array} bmData - Contains all the user bookmarks data.
   * @returns The bookmark icon element.
   */
  _checkBookMarked(data, bmData) {
    const isBookMarked = bmData.some((bmData) => bmData.id === data.id);

    return isBookMarked
      ? `<i class="bm-icon active bx bxs-bookmark"></i>`
      : `<i class="bm-icon bx bxs-bookmark"></i>`;
  }
}
