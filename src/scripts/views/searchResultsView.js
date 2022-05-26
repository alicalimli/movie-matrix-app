import othersView from "./othersView";
import mainView from "./mainView";

/**
 * Handle's the rendering of movie/tv show cards that the user searched.
 *
 * Extends of {@link mainView}
 */
class searchResultsView extends mainView {
  _inputForm;
  _inputSearch;
  _title = "";

  constructor() {
    super();
    this._inputForm = document.querySelector(".sidebar-form");
    this._inputSearch = this._inputForm.querySelector(".sidebar-search-input");
  }

  renderHTML(movieData, bmData) {
    this._movieData = movieData;
    this._bmData = bmData;
    this._clearHTML();
    this._generateHTML();
    this._scrollToTop();
  }

  // prettier-ignore
  addEventHandler(handle) {
    const sidebar = document.querySelector(".movie-sidebar-nav");
    const searchInput = document.querySelector(".sidebar-search-input");

    this._inputForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // this function would only work if sidebar is expanded
      if (sidebar.classList.contains("active") && searchInput.value !== "") {
        sidebar.classList.remove("active");
        othersView.shrinkSections('remove');
        othersView.hideToolTip('hidden');

        setTimeout(() => othersView.hideToolTip('visible'), 500)
        handle();
      } 
      else {
        sidebar.classList.add("active");
        // Focus doesnt work without a little delay
        setTimeout(() => searchInput.focus(), 100);
      }
    });
  }

  updateTitle(title){
    this._headTitle.textContent = title;
  }

  getInputValue() {
    const val = this._inputSearch.value;
    this._title = val;
    this._clearInput();
    return val;
  }

  _clearInput() {
    this._inputSearch.value = "";
  }
}

export default new searchResultsView();
