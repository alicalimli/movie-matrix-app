import mainView from "./mainView";
import othersView from "./othersView";

/**
 * Handle's the rendering of filtered movie/tv show cards and the genre filter buttons in the page.
 *
 * Extends of {@link mainView}
 */
class genreCardsView extends mainView {
  _filterButtonsParent = document.querySelector(".filters-btns");
  _genreParentEl = document.querySelector(".filters-btns");

  _headerFilterIconBtn = document.querySelector(".filter-icon-btn");
  _headerFilterBtn = document.querySelector(".header-filter-btn");

  _errorMsg =
    "Unfortunately, this feature is not available yet in this section.";

  /**
   * Attach event listeners in the buttons.
   * @param {Function} handle - Function that controls the buttons functionality.
   */
  // prettier-ignore
  addEventHandler(handle) {
    this._filterButtonsParent.addEventListener("click", handle);
    this._headerFilterBtn.addEventListener("click",this._showGenres.bind(this));
    this._headerFilterIconBtn.addEventListener("click",this._showGenres.bind(this));
  }

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
    this._scrollToTop();
  }

  /**
   * Generates the genre filter buttons
   * @param {Array} genreData - Array of objects that contains the id and title of available genres.
   */
  renderGenreTags(genreData) {
    console.log(genreData)
    this._genreParentEl.innerHTML = "";
    genreData.forEach((genre) => {
      const genreMarkup = `
      <li data-genre-id="${genre.id}" class="filters-btn">${genre.name}</li>
      `;
      this._genreParentEl.insertAdjacentHTML("beforeend", genreMarkup);
    });
  }

  /**
   * Generates error HTML and renders it inside the genre filter buttons container.
   * @param {String} errorMsg - Error message to be displayed.
   */
  renderGenreErrorMsg(errorMsg = this._errorMsg) {
    const errorMarkup = `
    <div class="error-msg">
      <i class="ph-icon ph-warning"></i>
      <span class="img-unavailable-text">${errorMsg}</span>
    </div>
    `;

    this._genreParentEl.innerHTML = "";
    this._genreParentEl.insertAdjacentHTML("beforeend", errorMarkup);
  }

  /**
   * Shows the genre filter buttons.
   */
  _showGenres() {
    othersView.sidebarBtnPointerEvent("none");
    othersView.sidebarPointerEvent("none");
    othersView.showGenreButtons("add");
    othersView.showOverlay("add");
  }
}

export default new genreCardsView();
