import mainView from "./mainView";
import othersView from "./othersView";

class genreCardsView extends mainView {
  _filterButtonsParent = document.querySelector(".filters-btns");
  _genreParentEl = document.querySelector(".filters-btns");

  _headerFilterIconBtn = document.querySelector(".filter-icon-btn");
  _headerFilterBtn = document.querySelector(".header-filter-btn");

  _errorMsg =
    "Unfortunately, this feature is not available yet in this section.";

  // prettier-ignore
  addEventHandler(handle) {
    this._filterButtonsParent.addEventListener("click", handle);
    this._headerFilterBtn.addEventListener("click",this._showGenres.bind(this));
    this._headerFilterIconBtn.addEventListener("click",this._showGenres.bind(this));
  }

  renderHTML(movieData, bmData) {
    this._movieData = movieData;
    this._bmData = bmData;
    this._clearHTML();
    this._generateHTML();
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

  _showGenres() {
    othersView.sidebarBtnPointerEvent("none");
    othersView.sidebarPointerEvent("none");
    othersView.showGenreButtons("add");
    othersView.showOverlay("add");
  }
}

export default new genreCardsView();
