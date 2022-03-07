import mainView from "./mainView";

class discoverMoviesView extends mainView {
  _title = "Discover Movies";

  renderHTML(movieData) {
    this._movieData = movieData;
    this._clearHTML();
    this._generateHTML();
    this._updateTitle();
    this._generateShowAllHTML();
  }

  _generateShowAllHTML() {
    const showAllHTML = `
      <button data-page="movies-pop" class="card showall-card-btn">
        <span class="card-text showall-btn">Show All <span class="right-arrow">&rightarrow;</span></span>
      </button>
      `;
    this._parentEl.insertAdjacentHTML("beforeend", showAllHTML);
  }
}

export default new discoverMoviesView();
