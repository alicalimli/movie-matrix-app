import mainView from "./mainView";

class discoverMoviesView extends mainView {
  _title = "Discover Movies";

  renderHTML(movieData) {
    this._movieData = movieData;
    this._clearHTML();
    this._generateHTML();
    this._updateTitle();
    this._scrollToTop();
  }
}

export default new discoverMoviesView();
