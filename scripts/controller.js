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

// prettier-ignore
const controlMovieCards = async function (viewType, viewName, pageType = "home") {
  try {
    console.log(model.data)
    // Render's Loading Spinner
    viewType.renderLoading();
    
    // Create's Movie Data
    await model.createDiscoverCards(pageType);

    // Render's HTML Cards
    viewType.renderHTML(model.data[viewName]);

    // Render's pagination
    paginationView.renderPagination(model.data.pages.currentPageLast);

    // Takes movieScrollY Data in the local storage and scroll to it when movie's is loaded
    const scrollY = JSON.parse(localStorage.getItem("movieScrollY")) || 0;

    window.scrollTo({
       top: scrollY,
       behavior: "smooth"
     });
     
    //  Deletes the movieScrollY data in the localStorage
    localStorage.removeItem('movieScrollY')
  

    // Reset's the pageNum back to 1
    paginationView.pageNum = 1;
  } catch (error) {
    console.log(error);
  }
};

const controlDiscoverMovies = async function () {
  try {
    // Movie Card's Controller
    controlMovieCards(discoverMoviesView, "discoverMovies");
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
  } catch (error) {
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
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

console.log("sdadadada  ");

const controlMovieSection = async function () {
  document.querySelector(".movie-main").addEventListener("click", function (e) {
    const sidebar = document.querySelector(".movie-sidebar-nav");
    const btn = e.target.closest(".expand-btn");
    const movieCard = e.target.closest(".movie-card");
    const cardOverlay = movieCard.querySelector(".overlay-card");
    if (!btn) return;
    const movieCardClone = movieCard.cloneNode(true);

    // Takes the position of movieCard
    const { top, left, width, height } = movieCard.getBoundingClientRect();
    // Sets the position of movieCardClone in the movieCards position
    movieCardClone.style.position = "fixed";
    movieCardClone.style.top = `${top}px`;
    movieCardClone.style.left = `${left}px`;
    movieCardClone.style.width = `${width}px`;
    movieCardClone.style.height = `${height}px`;

    // Some styling in movieCardClone
    movieCardClone.style.backgroundColor = "var(--background-dark)";
    movieCardClone.style.zIndex = "99";
    movieCardClone.innerHTML = "";

    // Shrink's every sections in the html
    document.querySelector(".movie-main").style.transform = "scale(0.9)";
    document.querySelector(".movie-sidebar-nav").style.transform = "scale(0.9)";
    document.querySelector(".section-header").style.transform = "scale(0.9)";
    document.querySelector(".movie-pagination").style.transform = "scale(0.9)";
    document.querySelector(".overlay-main").classList.add("active");
    // hide the original card with opacity
    // add card to the same container
    movieCardClone.innerHTML = "";
    document.body.appendChild(movieCardClone);

    // Animates the movieCardClone and delay's abit because without delay animation wont work
    setTimeout(() => {
      requestAnimationFrame(() => {
        movieCardClone.style.transition = `all 0.3s ease-in-out`;
        movieCardClone.style.borderRadius = "24px";
        movieCardClone.style.top = "50%";
        movieCardClone.style.left = "50%";
        movieCardClone.style.transform = "translate(-50%,-50%)";
        movieCardClone.style.height = "105vh";
        movieCardClone.style.width = "105vw";
      });
    }, 5);

    // Sets window scroll Y to the local storage
    localStorage.setItem("movieScrollY", JSON.stringify(window.scrollY));

    // Take's the user to expand-page after 400ms
    setTimeout(() => {
      window.location.href = `/expand-page.html#${btn.dataset.cardId}`;
    }, 400);
  });
};

const controlExpansionSection = async function () {
  // Only runs the function when page is expand-page.html
  if (window.location.pathname === "/expand-page.html") {
    const movieCard = document.querySelector(".movie-card");
    const videoId = window.location.hash.slice(1);
    expansionView.addEventHandler();
    expansionView.renderLoading();
    await model.createExpandPage(videoId);

    if (!model.data.expansion.videoData) return;
    await expansionView.renderHTML(
      model.data.expansion.videoData,
      model.data.expansion.videoDetails
    );
    console.log(model.data.expansion.videoDetails);
  }
};

const init = function () {
  controlExpansionSection();
  // Stops the function when the pathname is not the index.html
  if (window.location.pathname !== "/index.html") return;
  // Loads Discover Movie Card's when page is loaded
  controlDiscoverMovies();
  controlMovieSection();

  // Attach Event Handlers
  sideBarBtnsView.addHandlerEvent(controlNavBtns);
  paginationView.addHandlerEvent(controlPagination);
  searchResultsView.addHandlerEvent(controlSearchResults);
};

init();

window.addEventListener("load", function () {
  // Takes the darkmode data in the local storage
  const darkMode = JSON.parse(localStorage.getItem("darkmode"));
  // Makes a fade transition when user enters the page
  setTimeout(() => document.body.classList.add("active"), 400);
  if (!darkMode) return;
  // Toggles the darkMode button if DarkMode in localStorage is true and when page is in index.html
  const darkModeBtn = document?.querySelector(".dark-list");
  darkModeBtn?.classList.toggle("active");
  document.body.classList.toggle("darkmode");
});
