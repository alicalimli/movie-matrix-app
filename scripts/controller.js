import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

import * as model from "./model.js";
import { DEFAULT_PAGE } from "./config.js";
import sideBarBtnsView from "./views/sideBarBtnsView.js";
import discoverMoviesView from "./views/discoverView.js";
import popularMoviesView from "./views/popularMoviesView.js";
import trendingView from "./views/trendingView.js";
import popularTVsView from "./views/popularTVsView.js";
import searchResultsView from "./views/searchResultsView.js";

const controlDiscoverMovies = async function () {
  try {
    await model.createDiscoverCards(DEFAULT_PAGE);
    discoverMoviesView.renderHTML(model.data.discoverMovies);
  } catch (error) {
    console.log(error);
  }
};

const controlNavBtns = async function (event) {
  try {
    if (sideBarBtnsView.buttonPage === "home") {
      console.log("discover");
      await model.createDiscoverCards("home");
      discoverMoviesView.renderHTML(model.data.discoverMovies);
    }
    if (sideBarBtnsView.buttonPage === "movies-pop") {
      console.log("Popular Movies");
      await model.createDiscoverCards("movies-pop");
      popularMoviesView.renderHTML(model.data.popularMovies);
    }
    if (sideBarBtnsView.buttonPage === "trending") {
      console.log("Trending");
      await model.createDiscoverCards("trending");
      trendingView.renderHTML(model.data.trendingMovies);
    }
    if (sideBarBtnsView.buttonPage === "tvs-pop") {
      console.log("Popular TV Shows");
      await model.createDiscoverCards("tvs-pop");
      popularTVsView.renderHTML(model.data.popularTVS);
    }
    sideBarBtnsView._renderActive(event);
  } catch (error) {
    console.log(error);
  }
};

const controlSearchResults = async function () {
  try {
    const searchVal = searchResultsView.getInputValue();
    await model.createSearchResults(searchVal);
    searchResultsView.renderHTML(model.data.searchResults);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  controlDiscoverMovies();

  // Event Handlers
  sideBarBtnsView.addHandlerEvent(controlNavBtns);
  searchResultsView.addHandlerEvent(controlSearchResults);
};

init();
