import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

import * as model from "./model.js";
import { DEFAULT_PAGE } from "./config.js";
import sideBarBtnsView from "./views/sideBarBtnsView.js";
import discoverMoviesView from "./views/discoverView.js";
import popularMoviesView from "./views/popularMoviesView.js";

const controlDiscoverMovies = async function () {
  try {
    await model.createDiscoverCards(DEFAULT_PAGE);
    discoverMoviesView.renderHTML(model.data.discoverMovies);
  } catch (error) {
    console.log(error);
  }
};

const controlNavBtns = async function (event) {
  sideBarBtnsView._renderActive(event);
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
};

const init = function () {
  controlDiscoverMovies();

  // Event Handlers
  sideBarBtnsView.addHandlerEvent(controlNavBtns);
};

init();
