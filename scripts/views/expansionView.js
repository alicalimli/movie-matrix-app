import { IMG_PATH } from "../config";

class paginationView {
  _parentEl = document.querySelector(".video-section");
  _expandVideoDetails;
  _expandVideoData;
  btnType = "";
  pageNum = 1;

  addEventHandler() {
    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener("click", function (e) {
      const btn = e.target.closest(".back-btn");
      if (!btn) return;
      // Shrinks the body and fade's When back button is clicked
      document.body.style.transform = "scale(0)";
      document.body.style.opacity = "0";
      // Take's the user to index.html after 400ms
      setTimeout(() => {
        window.location.href = `/index.html`;
      }, 400);
    });
  }
  renderHTML(movieData) {
    this._movieData = movieData;
    this._clearHTML();
    this._generateHTML();
    this._updateTitle();
    this._scrollToTop();
  }

  renderLoading() {
    const loadingHTML = `
    <div class="placeholder"></div>
    <div class="loading-spinner"></div>
     `;
    this._clearHTML();
    this._parentEl.insertAdjacentHTML("beforeend", loadingHTML);
  }

  _clearHTML() {
    this._parentEl.innerHTML = "";
  }

  renderHTML(videoData, videoDetails) {
    this._expandVideoData = videoData;
    this._expandVideoDetails = videoDetails;
    this._clearHTML();
    this._generateHTML();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  _generateHTML() {
    const expandHTML = `
      <div class="trailer-container">
        <iframe
          class="trailer-video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${
            this._expandVideoData[0].key
          }?rel=0"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div class="trailer-overview">
        <div class="trailer-card">
          <img
            class="trailer-poster"
            src="${IMG_PATH + this._expandVideoDetails.poster_path}"
            alt="${
              this._expandVideoDetails.title || this._expandVideoDetails.name
            }"
          />
        </div>
        <div class="trailer-desc-container">
          <h1 class="trailer-title">${
            this._expandVideoDetails.title || this._expandVideoDetails.name
          }</h1>
          <p class="trailer-desc">
            ${this._expandVideoDetails.overview}
          </p>
        </div>
      </div>
      `;
    this._parentEl.insertAdjacentHTML("beforeend", expandHTML);
  }
}

export default new paginationView();
