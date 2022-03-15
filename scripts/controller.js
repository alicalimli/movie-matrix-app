import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

import * as model from "./model.js";
import { DEFAULT_PAGE, MOVIES_FIRST_PAGE, MOVIES_MAX_PAGE } from "./config.js";
import sideBarBtnsView from "./views/sideBarBtnsView.js";
import discoverMoviesView from "./views/discoverView.js";
import popularMoviesView from "./views/popularMoviesView.js";
import trendingView from "./views/trendingView.js";
import popularTVsView from "./views/popularTVsView.js";
import searchResultsView from "./views/searchResultsView.js";
import paginationView from "./views/paginationView.js";

const controlDiscoverMovies = async function () {
  try {
    discoverMoviesView.renderLoading();
    await model.createDiscoverCards();
    discoverMoviesView.renderHTML(model.data.discoverMovies);
    paginationView.renderPagination(model.data.pages.currentPageLast);
  } catch (error) {
    console.log(error);
  }
};

const controlNavBtns = async function (event) {
  try {
    await sideBarBtnsView.renderActive(event);
    if (sideBarBtnsView.buttonPage === "home") {
      discoverMoviesView.renderLoading();
      await model.createDiscoverCards("home");
      discoverMoviesView.renderHTML(model.data.discoverMovies);
      paginationView.renderPagination(model.data.pages.currentPageLast);
    }
    if (sideBarBtnsView.buttonPage === "movies-pop") {
      popularMoviesView.renderLoading();
      await model.createDiscoverCards("movies-pop");
      popularMoviesView.renderHTML(model.data.popularMovies);
      // Renders the pagination
      paginationView.renderPagination(model.data.pages.currentPageLast);
    }
    if (sideBarBtnsView.buttonPage === "trending") {
      trendingView.renderLoading();
      await model.createDiscoverCards("trending");
      trendingView.renderHTML(model.data.trendingMovies);
      paginationView.renderPagination(model.data.pages.currentPageLast);
    }
    if (sideBarBtnsView.buttonPage === "tvs-pop") {
      popularTVsView.renderLoading();
      await model.createDiscoverCards("tvs-pop");
      popularTVsView.renderHTML(model.data.popularTVS);
      paginationView.renderPagination(model.data.pages.currentPageLast);
    }
  } catch (error) {
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    const searchVal = searchResultsView.getInputValue();
    searchResultsView.renderLoading();
    await model.createSearchResults(searchVal);
    searchResultsView.renderHTML(model.data.searchResults);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = async function (event) {
  try {
    paginationView.buttonClicked(event);

    // Stops the function if btn Type is nothing
    if (paginationView.btnType === "") return;

    // Stops the function if user clicks back and the page is number 1
    if (
      paginationView.btnType === "back" &&
      model.data.pages.currentPage === MOVIES_FIRST_PAGE
    )
      return;

    // Stops the function if user clicks next and the page is the last page
    if (
      paginationView.btnType === "next" &&
      model.data.pages.currentPage === MOVIES_MAX_PAGE
    )
      return;

    // Renders Loading Spinner
    paginationView.renderLoading();

    // Fetches PageResults Data
    await model.createPageResults(
      paginationView.btnType,
      paginationView.pageNum
    );

    // HTML Rendering
    paginationView.renderHTML(model.data.pages.pageResults);
    paginationView.renderPagination(model.data.pages.currentPageLast);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  // Loads Discover Movies when page is loaded
  controlDiscoverMovies();

  // Event Handlers
  sideBarBtnsView.addHandlerEvent(controlNavBtns);
  searchResultsView.addHandlerEvent(controlSearchResults);
  paginationView.addHandlerEvent(controlPagination);
};

init();
