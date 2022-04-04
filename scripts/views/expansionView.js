import { IMG_PATH } from "../config";

class paginationView {
  _parentEl = document.querySelector(".video-overview-container");
  _expandVideoDetails;
  _expandVideoData;
  _expandVideoCasts;
  _bookmarked;
  btnType = "";
  pageNum = 1;

  constructor() {
    // if (window.location.pathname !== "/expand-page.html") return;
    // const backBtn = document.querySelector(".back-btn");
    // backBtn.addEventListener("click", function (e) {
    //   const btn = e.target.closest(".back-btn");
    //   if (!btn) return;
    //   // Shrinks the body and fade's When back button is clicked
    //   document.body.style.transform = "scale(0)";
    //   document.body.style.opacity = "0";
    //   // Take's the user to index.html after 400ms
    //   setTimeout(() => {
    //     window.location.href = `/index.html`;
    //   }, 400);
    // });
  }

  addEventHandler(handle) {
    const trailerContainer = document.querySelector(".trailer-container");
    const closeVideoBtn = document.querySelector(".close-video");
    const watchBtn = document.querySelector(".watch-poster-btn");

    watchBtn.addEventListener("click", function () {
      trailerContainer.classList.toggle("active");
      closeVideoBtn.classList.add("active");
    });

    closeVideoBtn.addEventListener("click", function () {
      trailerContainer.classList.remove("active");
      closeVideoBtn.classList.remove("active");
    });

    const bmBtn = document.querySelector(".bookmark-btn");
    const bmTxt = document.querySelector(".bookmark-text");
    let act = this._bookmarked;

    bmBtn.addEventListener("click", function () {
      console.log(act);
      if (!act) {
        act = true;
        bmTxt.textContent = "bookmarked";
        bmBtn.classList.toggle("active");

        handle(act);
        return;
      }
      if (act) {
        act = false;
        bmTxt.textContent = "bookmark";
        bmBtn.classList.toggle("active");

        handle(act);
        return;
      }
    });
  }
  renderLoading() {
    const loadingHTML = `
    <div class="placeholder"></div>
    <div class="loading-spinner"></div>
    <div class="loading-spinner2"></div>
     `;
    this._clearHTML();
    this._parentEl.insertAdjacentHTML("beforeend", loadingHTML);
  }

  _clearHTML() {
    this._parentEl.innerHTML = "";
  }

  renderHTML(videoData, videoDetails, videoCasts, bookmarked) {
    this._expandVideoData = videoData;
    this._expandVideoDetails = videoDetails;
    this._expandVideoCasts = videoCasts;
    this._bookmarked = bookmarked;
    this._clearHTML();
    this._generateHTML(bookmarked);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  _generateHTML(bookmarked) {
    const expandHTML = `
    <div class="video-section">
            <div class="expand-sec video-trailer-container">
            <button class="close-video">x</button>
              <div class="trailer-container">
                <div class="poster-container">
                  <img
                    class="video-poster-path"
                    src="${IMG_PATH}${this._expandVideoDetails.backdrop_path}"
                    alt="${
                      this._expandVideoDetails.name ??
                      this._expandVideoDetails.original_title
                    }"
                  />
                  <div class="poster-overview">
                    <div class="poster-desc-container">
                      <h1 class="poster-title">${
                        this._expandVideoDetails.name ??
                        this._expandVideoDetails.original_title
                      }</h1>
                      <div class="poster-btn-container">
                        <button class="poster-btn watch-poster-btn">
                          <i class="bx bx-play"></i>
                          <span class="btn-title">Watch Trailer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="overlay-poster"></div>
                </div>
                <iframe
                  class="trailer-video"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/${
                    this._expandVideoData[0].key
                  }"
                  title="YouTube video player"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>

          <div class="expand-sec movie-stats">
            <div class="rating-container">
              <span class="rating-text">${
                this._expandVideoDetails.vote_average
              }</span>
              <span class="rating-count">${
                this._expandVideoDetails.vote_count
              }</span>
            </div>
            <div class="other-details">
              <p class="other-detail date-detail"><span>Release Date:</span> ${
                this._expandVideoDetails.release_date ??
                this._expandVideoDetails.first_air_date
              }</p>
              <p class="other-detail duration-detail"><span>Duration:</span> ${
                this._expandVideoDetails.runtime ??
                this._expandVideoDetails.episode_run_time
              }min</p>
              <p class="other-detail status-detail"><span>Status:</span> ${
                this._expandVideoDetails.status
              }</p>
            </div>
            ${
              bookmarked
                ? `
             <button class="bookmark-btn active">
              <div class="container-bookmark">
                  <i class="icon-bm bx bx-book-bookmark"></i>
                  <span class="bookmark-text">bookmarked</span>
              </div>
            </button>
             `
                : `
            <button class="bookmark-btn">
              <div class="container-bookmark">
                  <i class="icon-bm bx bx-book-bookmark"></i>
                  <span class="bookmark-text">bookmark</span>
              </div>
            </button>
            `
            }
          </div>
          <div class="expand-sec trailer-overview">
            <div class="trailer-desc-container">
              <p class="trailer-desc">
              ${this._expandVideoDetails.overview}
              </p>
          </div>
          <section class="casts-section">
            <h2 class="cast-sec-title">Casts</h2>
            <div class="casts-container">
            ${this._createCastCircle(this._expandVideoCasts)}
            </div>
          </section>
          `;
    this._parentEl.insertAdjacentHTML("beforeend", expandHTML);
  }

  _createCastCircle(castData) {
    let castsMarkUp = ``;
    castData.forEach((cast, i) => {
      // Returns after hitting index 10 in the array
      if (i > 20) return;
      return (castsMarkUp += `
        <div class="cast-container">
          <div class="picture-cicle">
          ${
            cast.profile_path
              ? `
            <img class="cast-picture" src="${IMG_PATH}${cast.profile_path}" alt="">
            `
              : `
            <i class="ph-icon ph-warning"></i>
            <span class="img-unavailable-text">Image <br> Unavailable</span>
            `
          }
          </div>
          <span class="cast-name">${cast.name}</span>
        </div>
        `);
    });
    return castsMarkUp;
  }
}

export default new paginationView();
