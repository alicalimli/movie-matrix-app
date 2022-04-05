import { IMG_PATH } from "../config";
import mainView from "./mainView";

class bookmarksView extends mainView {
  _title = "Bookmarks";
  viewName = "bookmarksView";

  _generateHTML() {
    this._movieData.forEach((movie) => {
      const markupHTML = `
          <div class="movie-card">
          ${
            movie.poster_path !== null
              ? `
            <img
            class="movie-img"
            src="${IMG_PATH + movie.poster_path}"
            alt="${
              movie.title ?? movie.original_title ?? movie.original_name
            }"/>
            `
              : `
            <div class="card img-card">
              <i class="ph-icon ph-warning"></i>
              <span class="img-unavailable-text">Image <br> Unavailable</span>
            </div>
            `
          }
          <div class="overlay-card"></div>

          <button data-card-id="${movie.id}" class="expand-btn">
          <span class="movie-expand"></span>
          <i class="bx bx-expand expand-icon"></i>Expand</span>
          </button>
          <div class="movie-info">
            <span class="movie-title">${
              movie.title ?? movie.original_title ?? movie.original_name
            }</span>
          </div>
        </div>
          `;
      this._parentEl.insertAdjacentHTML("beforeend", markupHTML);
    });
  }
}

export default new bookmarksView();
