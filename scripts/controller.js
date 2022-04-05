import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import { DEFAULT_PAGE, MOVIES_FIRST_PAGE, MOVIES_MAX_PAGE } from "./config.js";
import sideBarBtnsView from "./views/sideBarBtnsView.js";
import discoverMoviesView from "./views/discoverView.js";
import popularMoviesView from "./views/popularMoviesView.js";
import trendingView from "./views/trendingView.js";
import popularTVsView from "./views/popularTVsView.js";
import searchResultsView from "./views/searchResultsView.js";
import paginationView from "./views/paginationView.js";
import expansionView from "./views/expansionView.js";
import bookmarksView from "./views/bookmarksView.js";
import {
  cardSizePos,
  controlMovieCards,
  showExpandOverlay,
} from "./helpers.js";

let expandSecIsActive = false;

// prettier-ignore
const controlDiscoverMovies = async function () {
  try {
    // Movie Card's Controller
    controlMovieCards(discoverMoviesView, "discoverMovies", "home");
    // Update's Sidebar Buttons
    sideBarBtnsView.updateBtn();
  } catch (error) {
    console.log(error);
  }
};

const controlNavBtns = async function (event) {
  try {
    await sideBarBtnsView.renderActive(event);
    // Prevents the data to be rendered again everytime user clicks the same button;
    if (sideBarBtnsView.buttonPage === model.data.pages.currentPageType) return;

    // Prevents HTML from rendering when expand button has been clicked
    if (sideBarBtnsView.buttonPage === "expand") return;

    // Render HTML cards and paginations buttons
    if (sideBarBtnsView.buttonPage === "home") {
      controlMovieCards(discoverMoviesView, "discoverMovies", "home");
    }
    if (sideBarBtnsView.buttonPage === "movies-pop") {
      controlMovieCards(popularMoviesView, "popularMovies", "movies-pop");
    }
    if (sideBarBtnsView.buttonPage === "trending") {
      controlMovieCards(trendingView, "trendingMovies", "trending");
    }
    if (sideBarBtnsView.buttonPage === "tvs-pop") {
      controlMovieCards(popularTVsView, "popularTVS", "tvs-pop");
    }
    if (sideBarBtnsView.buttonPage === "bookmarks") {
      controlMovieCards(bookmarksView, "userBookMarks", "bookmarks");
    }
  } catch (error) {
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    sideBarBtnsView.updateBtn("search-res");
    sideBarBtnsView.buttonPage = "search";
    // Takes Search Input Value
    const searchVal = searchResultsView.getInputValue();
    // Render's Loading Spinner
    searchResultsView.renderLoading();
    // Creates Result's Data
    await model.createSearchResults(searchVal);
    // Renders HTML Card's
    searchResultsView.renderHTML(model.data.searchResults);
  } catch (error) {
    console.log(error);
  }
};

// prettier-ignore
const controlPagination = async function (event) {
  try {
    // Starts the function when one of the buttons has been clicked
    paginationView.buttonClicked(event);

    // Stops the function if btn Type is nothing
    if (paginationView.btnType === "") return;

    // Stops the function if user clicks back and the page is number 1
    if (paginationView.btnType === "back" && model.data.pages.currentPage === MOVIES_FIRST_PAGE) return;

    // Stops the function if user clicks next and the page is the last page
    if (paginationView.btnType === "next" && model.data.pages.currentPage === MOVIES_MAX_PAGE) return;

    // Renders Loading Spinner
    paginationView.renderLoading();

    // Fetches PageResults Data
    await model.createPageResults(paginationView.btnType, paginationView.pageNum);

    // Render's Pagination buttons and HTML Card's
    paginationView.renderHTML(model.data.pages.pageResults);
    paginationView.renderPagination(model.data.pages.currentPageLast);
  } catch (error) {
    console.log(error);
  }
};

const controlMovieSection = async function () {
  let topCopy, leftCopy, widthCopy, heightCopy;
  let cardClone;
  document.querySelector(".movie-main").addEventListener("click", function (e) {
    // This function wont work if expand section is already active
    if (expandSecIsActive) return;
    expandSecIsActive = true;
    const sidebar = document.querySelector(".movie-sidebar-nav");
    const btn = e.target.closest(".expand-btn");
    if (!btn) return;
    const btnId = btn.dataset.cardId;
    const movieCard = e.target.closest(".movie-card");
    const cardOverlay = movieCard.querySelector(".overlay-card");
    const movieCardClone = movieCard.cloneNode(true);

    cardClone = movieCardClone;
    window.location.hash = btnId;

    // Takes the position of movieCard
    const { top, left, width, height } = movieCard.getBoundingClientRect();
    topCopy = top;
    leftCopy = left;
    widthCopy = width;
    heightCopy = height;
    // Sets the position of movieCardClone in the movieCards position
    movieCardClone.style.position = "fixed";
    movieCardClone.style.top = `${top}px`;
    movieCardClone.style.left = `${left}px`;
    movieCardClone.style.width = `${width}px`;
    movieCardClone.style.height = `${height}px`;

    // Some styling in movieCardClone
    movieCardClone.style.backgroundColor = "var(--tertiary-bg-color)";
    movieCardClone.style.borderRadius = "18px";
    movieCardClone.style.zIndex = "99";
    movieCardClone.style.pointerEvents = "none";

    // Shrink's sections in the html and disable sidebar buttons pointer event
    showExpandOverlay("add", "none");

    // add card to the same container
    document.body.appendChild(movieCardClone);

    // Animates the movieCardClone and delay's abit because without delay animation wont work
    // prettier-ignore
    setTimeout(() => {
      requestAnimationFrame(() => {
        movieCardClone.style.transition = `all 0.3s ease-in-out`;
        movieCardClone.style.borderRadius = "24px";
        movieCardClone.style.transform = "translate(-50%,-50%)";
        // Position and Size of the card
        cardSizePos(movieCardClone,"105vw","105vh","50%","50%")
      });
    }, 5);

    // Take's the user to expand-page after 400ms
    setTimeout(() => {
      controlExpansionSection();
      document.querySelector(".expansion-section").classList.add("active");
    }, 400);
  });

  // Click Listener for the back-button in the expand page
  document.querySelector(".back-btn").addEventListener("click", function (e) {
    window.location.hash = "";
    document.querySelector(".expansion-section").classList.remove("active");

    console.log(expandSecIsActive);
    if (cardClone) {
      cardClone.style.transition = `all 0.5s ease`;
      cardClone.style.borderRadius = "5px";
      cardClone.style.transform = "unset";
      // Position and Size of the card
      // prettier-ignore
      cardSizePos(cardClone,`${widthCopy}px`,`${heightCopy}px`,`${topCopy}px`,`${leftCopy}px`)
    }

    setTimeout(() => {
      if (cardClone) cardClone.style.opacity = "0";

      // Scale's sections in the html back to normal and enable sidebar buttons pointer event
      showExpandOverlay("remove", "auto");
    }, 300);

    setTimeout(() => {
      if (cardClone) {
        cardClone.remove();
        document.querySelector(".video-section")?.remove();
      }

      expandSecIsActive = false;
      console.log(expandSecIsActive);
    }, 600);
  });
};

// prettier-ignore
const controlBookmarkBtn = async function (isActive) {
  try {
    const id = window.location.hash.slice(1);
    
    if (!id) return;

    // Inserts the bookmarked id in the data.
    if (isActive) model.data.bookMarksData.push(id);

     // Removes the bookmarked id in the data.
    if (!isActive) {
      const newBookmarkData = model.data.bookMarksData.filter((val) => val !== id);
      model.data.bookMarksData = newBookmarkData;
    }
    console.log(model.data.bookMarksData);
  } catch (error) {
    console.log(error);
  }
};

// prettier-ignore
const controlExpansionSection = async function () {
  try {
    const movieCard = document.querySelector(".movie-card");
    const videoId = window.location.hash.slice(1);

    expansionView.renderLoading();

    await model.createExpandPage(videoId);

    const isBookMarked = model.data.bookMarksData.includes(videoId) ? true : false;
    console.log(isBookMarked);

    if (!model.data.expansion.videoData) return;
    await expansionView.renderHTML(
      model.data.expansion.videoData,
      model.data.expansion.videoDetails,
      model.data.expansion.videoCasts,
      isBookMarked
    );

    expansionView.addEventHandler(controlBookmarkBtn);
    console.log(model.data.expansion.videoDetails);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  // Take's bookmark data in the localstorage.
  const bookMarksData = JSON.parse(localStorage.getItem("bookmarksData"));
  model.data.bookMarksData = [...new Set(bookMarksData)];
  console.log(model.data.bookMarksData);
  // Loads Discover Movie Card's when page is loaded.
  controlDiscoverMovies();
  controlMovieSection();

  // Attach Event Handlers
  sideBarBtnsView.addHandlerEvent(controlNavBtns);
  paginationView.addHandlerEvent(controlPagination);
  searchResultsView.addHandlerEvent(controlSearchResults);

  // Takes the darkmode data in the local storage
  const darkMode = JSON.parse(localStorage.getItem("darkmode"));

  if (!darkMode) return;
  // Toggles the darkMode button if DarkMode in localStorage is true and when page is in index.html
  const darkModeBtn = document?.querySelector(".dark-list");
  darkModeBtn?.classList.toggle("active");
  document.body.classList.toggle("darkmode");
};

init();

window.addEventListener("load", function () {
  if (this.window.location.hash) {
    expandSecIsActive = true;
    // Shrink's sections in the html and disable sidebar buttons pointer event
    showExpandOverlay("add", "none");

    document.querySelector(".expansion-section").classList.add("active");
    controlExpansionSection();
  }
});

// prettier-ignore
// Saves Bookmarks Data to the localstorage.
window.onbeforeunload = () => localStorage.setItem("bookmarksData",JSON.stringify(model.data.bookMarksData));
