import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import sideBarBtnsView from "./views/sideBarBtnsView.js";
import discoverMoviesView from "./views/discoverView.js";
import popularMoviesView from "./views/popularMoviesView.js";
import trendingView from "./views/trendingView.js";
import popularTVsView from "./views/popularTVsView.js";
import searchResultsView from "./views/searchResultsView.js";
import paginationView from "./views/paginationView.js";
import expansionView from "./views/expansionView.js";
import bookmarksView from "./views/bookmarksView.js";
import settingsView from "./views/settingsView.js";
import {
  controlMovieCards,
  createMovieObj,
  unExpandSidebar,
} from "./helpers.js";
import genreCardsView from "./views/genreCardsView.js";
import cardZoomingView from "./views/movieSectionView.js";
import othersView from "./views/othersView.js";
import movieSectionView from "./views/movieSectionView.js";

import {
  EXPAND_CARD_DURATION,
  FIRST_PAGE,
  MAX_PAGE,
  UNEXPAND_CARD_DURATION,
} from "./config.js";

/**
 * Controls the rendering of the home page.
 */ // prettier-ignore
const controlDiscoverMovies = async function () {
  try {
    controlMovieCards(discoverMoviesView, "discoverMovies", "home");
    sideBarBtnsView.updateBtn();
  } catch (error) {
    console.log(error);
  }
};

// prettier-ignore
const pageObj = {
  "home": [discoverMoviesView, "discoverMovies", "home"],
  "trending": [trendingView, "trendingMovies", "trending", false],
  "movies-pop": [popularMoviesView, "popularMovies", "movies-pop"],
  "tvs-pop": [popularTVsView, "popularTVS", "tvs-pop"],
  "bookmarks": [bookmarksView, "bookMarksData", "bookmark"],
};

/**
 * Controls the sidebar buttons functionality.
 * @param {event} event - Event that fires when a button has been clicked in the sidebar.
 */
const controlNavBtns = async function (event) {
  try {
    othersView.showExpandSection('remove');
    othersView.hideToolTip("visible");

    unExpandSidebar();

    sideBarBtnsView.renderActive(event);

    // Prevents data from being rendered again when same button has been clicked.
    if (sideBarBtnsView.buttonPage === model.data.pages.currentPageType) return;

    controlMovieCards(...pageObj[sideBarBtnsView.buttonPage]);
  } catch (error) {
    bookmarksView.renderErrorMsg(error.message);
  }
};

/**
 * Controls the search bar functionality.
 */ // prettier-ignore
const controlSearchResults = async function () {
  try {
    genreCardsView.renderGenreErrorMsg();

    sideBarBtnsView.updateBtn("search-res");
    sideBarBtnsView.buttonPage = "search";

    const searchVal = searchResultsView.getInputValue();

    searchResultsView.updateTitle(searchVal)
    searchResultsView.renderLoading();
    await model.createSearchResults(searchVal);
    searchResultsView.renderHTML(model.data.searchResults, model.data.bookMarksData);
  } catch (error) {
    searchResultsView.renderErrorMsg(error.message);
  }
};

/**
 * Controls pagination buttons functionality.
 * @param {event} event - Event that fires when user clicked the button.
 */ // prettier-ignore
const controlPagination = async function (event) {
  try {
    paginationView.buttonClicked(event);

    if (paginationView.btnType === "") return;

    // Prevents data from rendering when user clicks back on the first page.
    if (paginationView.btnType === "back" && model.data.pages.currentPage === FIRST_PAGE
    || paginationView.btnType === "first" && model.data.pages.currentPage === FIRST_PAGE) return;
    
    // Prevents data from rendering when user clicks next on the last page.
    if (paginationView.btnType === "next" && model.data.pages.currentPage === MAX_PAGE
    || paginationView.btnType === "last" && model.data.pages.currentPage === MAX_PAGE) return;

    paginationView.renderLoading();

    await model.createPageResults(paginationView.btnType, paginationView.pageNum);

    paginationView.renderHTML(model.data.pages.pageResults, model.data.bookMarksData);
    paginationView.renderPagination(model.data.pages.currentPageLast);
  } catch (error) {
    console.log(error);
    paginationView.renderErrorMsg(error.message);
  }
};

/**
 * Controls the expand button functionality of movie/tv show cards in the page.
 * @param {event} event - Event that fires when user clicked the button.
 */
const controlMovieSection = async function (event) {
  let expandDuration;

  const btn = event.target.closest(".expand-btn");

  if (!btn) return;

  const movieCard = event.target.closest(".movie-card");
  const btnId = btn.dataset.cardId;

  window.location.hash = btnId;

  if (model.data.settings.cardZooming) {
    expandDuration = EXPAND_CARD_DURATION;
    cardZoomingView.renderCardZoom(movieCard);
  }

  movieSectionView.shrinkSections();

  setTimeout(() => {
    controlExpansionSection();
    othersView.showExpandSection("add");
  }, expandDuration);
};

/**
 * Controls the back button functionality in the expansion page.
 */
const controlExpandBackButton = function () {
  const trailerVideo = document?.querySelector(".trailer-video");
  const cardClone = document?.querySelector(".movie-card-clone");

  if (expansionView.isAllCastsSectionActive) {
    controlExpansionSection();
    expansionView.isAllCastsSectionActive = false;
    return;
  }

  let expandDuration;

  window.location.hash = "";

  othersView.showExpandSection("remove");

  if (model.data.settings.cardZooming && cardClone) {
    cardZoomingView.renderCardShrink();
    expandDuration = UNEXPAND_CARD_DURATION;
  }

  setTimeout(() => {
    movieSectionView.unShrinkSections();
    trailerVideo?.remove();
  }, expandDuration / 2);
};

/**
 * Controls the bookmark button functionality in the expand page.
 * @param {boolean} isActive - If the expanded movie/tv show has been bookmarked already.
 */ // prettier-ignore
const controlBookmarkBtn = async function (isActive) {
  try {
    const id = +window.location.hash.slice(1);
    const movieCard = document.querySelector(`#movie-${id}`)
    const bmIcon = movieCard?.querySelector('.bm-icon')
    
    if (!id) return;

    if (isActive) {
      const dataHolder = [];
      dataHolder.push(model.data.expansion.videoDetails)

      const bookMarkData = createMovieObj(dataHolder)
      model.data.bookMarksData.push(...bookMarkData);
      bmIcon?.classList.add('active')
    }
    else {
      const newBookmarkData = model.data.bookMarksData.filter((val) => val.id !== id);
      model.data.bookMarksData = newBookmarkData;
      bmIcon?.classList.remove('active')
    }

    if(model.data.pages.currentPageType === "bookmark") controlMovieCards(...pageObj.bookmarks);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Controls the rendering of the expansion page when a movie/tv show card has been clicked.
 */ // prettier-ignore
const controlExpansionSection = async function () {
  try {
    const videoId = +window.location.hash.slice(1);

    expansionView.renderLoading();

    await model.createExpandPage(videoId);

    // Check if the movie/tv show has been bookmarked already
    const isBookMarked = model.data.bookMarksData.some(data => data.id === videoId);

    if (!model.data.expansion.videoData) return;

    expansionView.renderHTML(
      model.data.expansion.videoData,
      model.data.expansion.videoDetails,
      model.data.expansion.videoCasts,
      isBookMarked
    );

    expansionView.addEventHandler(controlBookmarkBtn);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Controls the rendering of the filtered movies/tv shows in the page.
 */ // prettier-ignore
const renderGenreCards = async function () {
  try {
    paginationView.renderLoading();
    await model.createGenreCards();

    genreCardsView.renderHTML(model.data.genre.genresResult,model.data.bookMarksData);
    paginationView.renderPagination(model.data.pages.currentPageLast);
  } catch (error) {
    console.error(error);
    genreCardsView.renderErrorMsg(error.message);
  }
};

/**
 * Controls the genre filtering buttons.
 * @param {event} event - event fired when genre filter button has been clicked.
 */ // prettier-ignore
const controlGenreCards = async function (event) {
  try {
    const btn = event.target.closest(".filters-btn");
    const genreArr = model.data.genre.genreArr;

    if (!btn) return;

    paginationView.pageNum = 1;

    if (!btn.classList.contains("active")) {
      genreArr.push(btn.dataset.genreId);
      btn.classList.add("active");
    }
    else {
      genreArr.pop(btn.dataset.genreId);
      btn.classList.remove("active");
    }

    renderGenreCards();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Controls the settings panel buttons functionality.
 * @param {event} event - Event that fires when user clicks a button in the settings.
 */ // prettier-ignore
const controlSettings = function (event) {
  const btn = event.target.closest(".toggler-list");

  if (!btn) return;

  const settingType = btn.dataset.setting;

  btn.classList.toggle("active");

  if (settingType === "dark-mode") {
    model.data.settings.darkMode = !model.data.settings.darkMode;
    document.body.classList.toggle("darkmode");
  }

  if (settingType === "card-zooming") {
    model.data.settings.cardZooming = !model.data.settings.cardZooming;

    // If there is a cloneCard then it would be removed
    const clonedCard = document?.querySelector('.movie-card-clone')
    clonedCard?.remove();
  }  
  
  if (settingType === "disable-transition") {
    model.data.settings.disableTransitions = !model.data.settings.disableTransitions;
    document.body.classList.toggle("disable-transitions");
  }
  if (settingType === "disable-zooms") {
    othersView.shrinkSectionsCopy('toggle')
    model.data.settings.enableZoom = !model.data.settings.enableZoom;
    othersView.zoomEnabled = model.data.settings.enableZoom;
  }
};

/**
 * Shows the expanded page when a movie/tv show id has been detected in the URL.
 */
const showExpandSection = function () {
  if (window.location.hash) {
    movieSectionView.shrinkSections();
    document.querySelector(".expansion-section").classList.add("active");
    controlExpansionSection();
  }
};

/**
 * Fetch the data's from the user browser storage and set it in the data.
 */ // prettier-ignore
const loadDatas = function () {
  const bookMarksData = JSON.parse(localStorage.getItem("bookmarksData"));
  const settingsData = JSON.parse(localStorage.getItem("settingsData")) ?? model.data.settings;

  model.data.bookMarksData = [...new Set(bookMarksData)];
  model.data.settings = settingsData;

  settingsView.updateSettings(model.data.settings);
};

/**
 * Immediately invoked function,
 * this attaches event listeners, load data's, and loads the home page.
 */
const init = (function () {
  controlDiscoverMovies();
  showExpandSection();
  loadDatas();

  // Attach Event Handlers
  movieSectionView.addBackEventHandler(controlExpandBackButton);
  movieSectionView.addEventHandler(controlMovieSection);

  searchResultsView.addEventHandler(controlSearchResults);
  sideBarBtnsView.addEventHandler(controlNavBtns);
  settingsView.addEventHandler(controlSettings);

  genreCardsView.addEventHandler(controlGenreCards);
  paginationView.addEventHandler(controlPagination);
})();

/**
 * Saves the data's in the user browser storage.
 */ //prettier-ignore
const saveData = window.onbeforeunload = () => {
  localStorage.setItem("bookmarksData",JSON.stringify(model.data.bookMarksData))
  localStorage.setItem('settingsData', JSON.stringify(model.data.settings))
}
