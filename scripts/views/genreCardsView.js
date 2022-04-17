import mainView from "./mainView";
import othersView from "./othersView";

class genreCardsView extends mainView {
  _filterButtonsParent = document.querySelector(".filters-btns");
  _genreParentEl = document.querySelector(".filters-btns");

  _headerFilterBtn = document.querySelector(".header-filter-btn");

  _isGenresHidden = true;

  _errorMsg =
    "Unfortunately, this feature is not available yet in this section.";

  // prettier-ignore
  addEventHandler(handle) {
    this._filterButtonsParent.addEventListener("click", handle);
    this._headerFilterBtn.addEventListener("click",this._showGenres.bind(this));
  }

  renderHTML(movieData) {
    this._movieData = movieData;
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
    if (this._isGenresHidden === true) {
      this._isGenresHidden = false;
      othersView.sidebarBtnPointerEvent("none");
      othersView.sidebarPointerEvent("none");
      othersView.showGenreButtons("add");
      othersView.showOverlay("add");
      return;
    }

    if (this._isGenresHidden === false) {
      this._isGenresHidden = true;
      othersView.sidebarBtnPointerEvent("auto");
      othersView.sidebarPointerEvent("auto");
      othersView.showGenreButtons("remove");
      othersView.showOverlay("remove");
      return;
    }
  }
}

export default new genreCardsView();
