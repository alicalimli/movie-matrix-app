import { IMG_PATH } from "../config";

class movieCardsView {
  _parentEl = document.querySelector(".movie-main");
  _movieData;

  renderHTML(movieData) {
    this._movieData = movieData;
    this._clearHTML();
    this._generateHTML();
    this._generateShowAllHTML();
  }

  _clearHTML() {
    this._parentEl.innerHTML = "";
  }

  _generateHTML() {
    this._movieData.forEach((movie) => {
      const markupHTML = `
            <div class="movie-card">
                <img
                    class="movie-img"
                    src="${IMG_PATH + movie.img}"
                    alt="${movie.title}"
                />
                <div class="movie-info">
                    <span class="movie-title">${movie.title}</span>
                    <button class="expand-btn">expand</button>
                </div>
            </div>
          `;
      this._parentEl.insertAdjacentHTML("beforeend", markupHTML);
    });
  }

  _generateShowAllHTML() {
    const showAllHTML = `
      <button class="showall-card-btn">
        <span class="showall-btn">Show All <span class="right-arrow">&rightarrow;</span></span>
      </button>
      `;
    this._parentEl.insertAdjacentHTML("beforeend", showAllHTML);
  }
}

export default new movieCardsView();
