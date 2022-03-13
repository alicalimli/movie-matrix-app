import { IMG_PATH } from "../config";
import mainView from "./mainView";

export default class mainView {
  _parentEl = document.querySelector(".movie-main");
  _movieData;
  _headTitle = document.querySelector(".header-title");
  _title = "Discover Movies";

  renderHTML(movieData) {
    this._movieData = movieData;
    this._clearHTML();
    this._generateHTML();
    this._updateTitle();
    this._scrollToTop();
  }

  renderLoading() {
    console.log("as");
    const loadingHTML = `
    <div class="placeholder"></div>
    <div class="loading-spinner"></div>
     `;
    this._clearHTML();
    this._parentEl.insertAdjacentHTML("beforeend", loadingHTML);
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
  }

  _generateHTML() {
    this._movieData.forEach((movie) => {
      const markupHTML = `
            <div class="movie-card">
            ${
              movie.img !== null
                ? `
              <img
              class="movie-img"
              src="${IMG_PATH + movie.img}"
              alt="${movie.title}"/>
              `
                : `
              <div class="card img-card">
              <span class="card-text text-unavailable">Image <br/>unavailable</span>
              </div>
              `
            }
                <div class="movie-info">
                    <span class="movie-title">${movie.title}</span>
                    <button class="expand-btn">expand</button>
                </div>
            </div>
          `;
      this._parentEl.insertAdjacentHTML("beforeend", markupHTML);
    });
  }
}
