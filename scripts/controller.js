import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

import * as model from "./model.js";
import sideBarBtnsView from "./views/sideBarBtnsView.js";
import movieCardsView from "./views/movieCardsView.js";

const controlHomepageMovies = async function () {
  try {
    await model.createPosterCard();
    movieCardsView.renderHTML(model.data.homePageMovies);
  } catch (error) {
    console.log(error);
  }
};

controlHomepageMovies();
