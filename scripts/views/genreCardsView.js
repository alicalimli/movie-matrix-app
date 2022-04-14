import mainView from "./mainView";

class popularMoviesView extends mainView {
  _title = "Popular Movies";
  _filterBtnsParent = document.querySelector(".filters-btns");

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
