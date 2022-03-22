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

// prettier-ignore
const controlMovieCards = async function (viewType, viewName, pageType = "home") {
  try {
    // Render's Loading Spinner
    viewType.renderLoading();
    
    // Create's Movie Data
    await model.createDiscoverCards(pageType);

    // Render's HTML Cards
    viewType.renderHTML(model.data[viewName]);

    // Render's pagination
    paginationView.renderPagination(model.data.pages.currentPageLast);

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

const init = function () {
  // Loads Discover Movie Card's when page is loaded
  controlDiscoverMovies();

  // Attach Event Handlers
  sideBarBtnsView.addHandlerEvent(controlNavBtns);
  searchResultsView.addHandlerEvent(controlSearchResults);
  paginationView.addHandlerEvent(controlPagination);
};

init();
const darkBtn = document.querySelector(".dark-list");

darkBtn.addEventListener("click", function (e) {
  darkBtn.classList.toggle("active");
  document.body.classList.toggle("darkmode");
});
