import { IMG_PATH } from "../config";

/**
 * This class is responsible for pagination.
 */
class expansionView {
  _parentEl = document.querySelector(".video-overview-container");
  _expandVideoDetails;
  _expandVideoData;
  _expandVideoCasts;
  _bookmarked;
  btnType = "";
  pageNum = 1;

  /**
   * Listens to event when bookmark button has been clicked.
   * @param {Function} handle - the function that controls the button functionality.
   */
  // prettier-ignore
  addEventHandler(handle) {
    this._addBtnListeners();

    const bmBtn = document.querySelector(".bookmark-btn");
    const bmTxt = document.querySelector(".bookmark-text");
    let act = this._bookmarked;

    bmBtn.addEventListener("click", function () {
      if (!act) {
        act = true;
        bmTxt.textContent = "Bookmarked";
        bmBtn.classList.toggle("active");
        handle(act);
      } 
      else{
        act = false;
        bmTxt.textContent = "Bookmark";
        bmBtn.classList.toggle("active");
        handle(act);
      }
    });
  }

  /**
   * Add Event Listeners for Watch trailer button and close video button.
   */
  _addBtnListeners() {
    const trailerContainer = document.querySelector(".video-trailer-container");
    const trailerVideo = document.querySelector(".trailer-video");
    const closeVideoBtn = document.querySelector(".close-video");
    const watchBtn = document.querySelector(".watch-poster-btn");

    const source = trailerVideo.getAttribute("src");
    trailerVideo.setAttribute("src", "");

    watchBtn.addEventListener("click", function () {
      trailerContainer.classList.add("show-trailer");
      closeVideoBtn.classList.add("active");
      trailerVideo.setAttribute("src", source);
    });

    closeVideoBtn.addEventListener("click", function () {
      trailerContainer.classList.remove("show-trailer");
      closeVideoBtn.classList.remove("active");
      trailerVideo.setAttribute("src", "");
    });
  }

  /**
   * Renders loading spinner in the page.
   */
  renderLoading() {
    const loadingHTML = `
    <div class="placeholder"></div>
    <div class="loading-spinner"></div>
    <div class="loading-spinner2"></div>
    `;

    this._clearHTML();
    this._parentEl.insertAdjacentHTML("beforeend", loadingHTML);
  }

  /**
   * Renders the expanded movie or tv show page.
   * @param {Array} videoData - Array of objects that contains the key to fetch the video from youtube
   * @param {Object} videoDetails - Contains all the data about the expanded movie/tv show
   * @param {Array} videoCasts - Contains all the data about the casts of the movie/tv show
   * @param {boolean} bookmarked - bookmarked movie or not
   */
  renderHTML(videoData, videoDetails, videoCasts, bookmarked) {
    this._expandVideoData = videoData;
    this._expandVideoDetails = videoDetails;
    this._expandVideoCasts = videoCasts;
    this._bookmarked = bookmarked;
    this._clearHTML();
    this._generateHTML(bookmarked);
  }

  /**
   * Clears the parent element's HTML.
   */
  _clearHTML() {
    this._parentEl.innerHTML = "";
  }

  /**
   * Scrolls the view to the very top of the page.
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /**
   * Generates the HTML for the expansion page when a movie/tv card has been clicked.
   * @param {boolean} bookmarked - bookmarked movie or not
   */
  _generateHTML(bookmarked) {
    const expandHTML = `
        <section class="video-section">
            <div class="expand-sec video-trailer-container">
            <button class="close-video">x</button>
              <figure class="poster-container">
                <img
                  class="video-poster-path"
                  src="${IMG_PATH}${this._expandVideoDetails.backdrop_path}"
                  alt="${
                    this._expandVideoDetails.name ??
                    this._expandVideoDetails.title ??
                    this._expandVideoDetails.original_title
                  }"
                />

              <figure class="poster-desc-container">
                <h1 id="main-poster-title" class="poster-title">${
                  this._expandVideoDetails.name ??
                  this._expandVideoDetails.title ??
                  this._expandVideoDetails.original_title
                }</h1>

                  <button class="btn btn-hv poster-btn watch-poster-btn">
                    <i class="bx bx-play"></i>
                    <p class="btn-title">Watch Trailer</p>
                  </button>

                </figure>
                <div class="overlay-poster"></div>
                </figure>


                ${
                  this._expandVideoData[0]
                    ? `
                    <div class="loading-spinner"></div>
                    <div class="loading-spinner2"></div>

                    <iframe
                    class="trailer-video"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/${this._expandVideoData[0].key}"
                    title="YouTube video player"
                    frameborder="0"
                    allowfullscreen>
                    </iframe>
                  `
                    : `
                    <figure class="trailer-video error-msg">
                      <i class="ph-icon ph-warning"></i>
                      <figcaption class="img-unavailable-text">Unfortunately, we cant find the video trailer of this one.</figcaption>
                      <a class="btn btn-hv watch-yt" target="_blank" href="https://www.youtube.com/results?search_query=${
                        this._expandVideoDetails.name ??
                        this._expandVideoDetails.title ??
                        this._expandVideoDetails.original_title
                      } Trailer">Watch in youtube &#8594;</a>
                    </figure>
                    `
                }
              </div>
          </section>

          <ul class="poster-genre-tags">
              ${this._createGenreTags(this._expandVideoDetails.genres)}
          </ul>

          <section class="secondary-poster-overview">
              <h1 class="poster-title">${
                this._expandVideoDetails.name ??
                this._expandVideoDetails.title ??
                this._expandVideoDetails.original_title
              }</h1>
          </section>
          
          <section class="expand-sec movie-stats">
            <article class="rating-container 
            flx flx-clmn flx-cntr">
              <p class="rating-text">${
                this._expandVideoDetails.vote_average
              }</p>
              <span class="rating-count">${
                this._expandVideoDetails.vote_count
              }</span>
            </article>

            <article class="other-details">
              <time class="other-detail date-detail"><mark>Release Date:</mark> ${
                this._expandVideoDetails.release_date ??
                this._expandVideoDetails.first_air_date
              }</time>
              <time class="other-detail duration-detail"><mark>Duration:</mark> ${
                this._expandVideoDetails.runtime ??
                this._expandVideoDetails.episode_run_time
              }min</time>
              <p class="other-detail status-detail"><mark>Status:</mark> ${
                this._expandVideoDetails.status
              }</p>
            </article>

            ${
              bookmarked
                ? `
            <button class="btn btn-md flx flx-cntr bookmark-btn active">
              <figure class="container-bookmark flx flx-cntr flx-gap-md">
                  <i class="icon-bm bx bx-book-bookmark"></i>
                  <figcaption class="bookmark-text">Bookmarked</figcaption>
              </figure>
            </button>
            `
                : `
            <button class="btn btn-md flx flx-cntr bookmark-btn">
              <figure class="container-bookmark flx flx-cntr flx-gap-md">
                  <i class="icon-bm bx bx-book-bookmark"></i>
                  <figcaption class="bookmark-text">Bookmark</figcaption>
              </figure>
            </button>
            `
            }
          </section>

          <section class="expand-sec trailer-overview">
            <article class="trailer-desc-container">
              <p class="trailer-desc">
              ${this._expandVideoDetails.overview}
              </p>
            </article>
          </section>

          <section class="casts-section">
            <h2 class="cast-sec-title">Casts</h2>

            <div class="casts-container">
            ${this._createCastCircle(this._expandVideoCasts)}
            </div>
          </section>
          `;
    this._parentEl.insertAdjacentHTML("beforeend", expandHTML);
  }

  /**
   * Generate genre tags for the movie/tv show that has been expanded.
   * @param {Array} genreData - Array of objects that contains the movie/tv show genre data's.
   * @returns Genre tags markup HTML to be rendered in the page.
   */
  _createGenreTags(genreData) {
    console.log(genreData);
    let genreMarkup = ``;
    genreData.forEach((data) => {
      return (genreMarkup += `
      <li class="btn cursor-def active poster-genre-tag">${data.name}</li>    
      `);
    });
    return genreMarkup;
  }

  /**
   * Generates cast circles for the movie/tv show that has been expanded.
   * @param {castData} castData - Contains all the data about the casts of the movie/tv show.
   * @returns Cast circles markup HTML to be rendered in the page.
   */
  _createCastCircle(castData) {
    console.log(castData, "ASDASDASD");
    let castsMarkUp = ``;
    castData.forEach((cast, i) => {
      // Returns after hitting index 10 in the array
      if (i > 20) return;
      return (castsMarkUp += `
        <figure class="cast-container">
          ${
            cast.profile_path
              ? `
            <a class="flx flx-cntr flx-clmn picture-cicle" target="_blank" href="https://www.google.com/search?q=${cast.name}">
              <img class="cast-picture" src="${IMG_PATH}${cast.profile_path}" alt="${cast.name}">
            </a>
            `
              : `
            <div class="flx flx-cntr flx-clmn picture-cicle">
              <i class="ph-icon ph-warning"></i>
              <p class="img-unavailable-text">Image <br> Unavailable</p>
            </div>
            `
          }
          <figcaption class="cast-name">${cast.name}</figcaption>
        </figure>
        `);
    });
    return castsMarkUp;
  }
}

export default new expansionView();
