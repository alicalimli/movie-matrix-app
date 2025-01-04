import { API_KEY, API_URL, FIRST_PAGE } from "./config";
import * as model from "./model.js";
import bookmarksView from "./views/bookmarksView";
import genreCardsView from "./views/genreCardsView";
import othersView from "./views/othersView";
import paginationView from "./views/paginationView";

/**
 * This function is responsible for rendering the cards in the page
 * as well as the genre buttons, pagination buttons, and the error message.
 * @function
 * @param {Object} viewType - The view that will be rendered [discoverView.js, trendingView.js, and etc.].
 * @param {String} viewName - The name of the view to be rendered in the page.
 * @param {String} [pageType=home] - The page type to be rendered in the page [home,trending,movies-pop,tvs-pop ].
 * @param {Boolean} filtering - If genre filtering is available in that type of page.
 * @param {Number} [pageNum=1] - The page number of the movie cards to be displayed.
 */ // prettier-ignore
export const controlMovieCards = async function (viewType, viewName, pageType = "home", filtering = true, pageNum = FIRST_PAGE) {
  try {
    if(pageType === "bookmark"){
      controlBookmarks();
      return
    }
    
    model.data.genre.genreArr = [];

    viewType.renderLoading();

    await model.createDiscoverCards(pageType,pageNum);
    await viewType.renderHTML(model.data[viewName], model.data.bookMarksData);

    paginationView.pageNum = pageNum;
    paginationView.renderPagination(model.data.pages.currentPageLast);

    !filtering ? genreCardsView.renderGenreErrorMsg() : genreCardsView.renderGenreTags(model.data.genre.genresData);

  } catch (error) {
    console.error(error)
    viewType.renderErrorMsg(error.message)
  }
};

/**
 * Controls the rendering of bookmarks movie/tv show cards.
 */ // prettier-ignore
const controlBookmarks = function () {
  try {
    model.data.pages.currentPageType = "bookmark";

    bookmarksView.updateTitle();

    genreCardsView.renderGenreErrorMsg();

    if (model.data.bookMarksData.length === 0) throw new Error("You dont have any bookmarks yet.");

    bookmarksView.renderLoading();

    bookmarksView.renderHTML(model.data.bookMarksData, model.data.bookMarksData);
  } catch (error) {
    throw error;
  }
};

/**
 * Unexpand the sidebar navigation.
 */
export const unExpandSidebar = function () {
  const sidebar = document.querySelector(".movie-sidebar-nav");
  if (sidebar.classList.contains("active")) {
    othersView.shrinkSections("remove");
    othersView.expandSidebar("remove");
    othersView.showOverlay("remove");
    othersView.hideToolTip("hidden");
    setTimeout(() => othersView.hideToolTip("visible"), 2000);
  }
};

/**
 * @function
 * @param {string} url - URL of the api to be fetched
 * @param {string} pageName - The title of the page ex[discoverMovies,popularMovies]
 * @returns The results of the fetched data.
 */ //prettier-ignore
export const apiFetch = async function (url,pageName = model.data.pages.pageName) {
  try {
    const data = await fetch(url);

    if (!data.ok) throw new Error(data.statusText);

    const dataResults = await data.json();
    model.data.pages.currentUrl = url;
    model.data.pages.pageName = pageName;

    console.log('data', dataResults)

    return dataResults;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @function
 * Creates a new array of objects that only contains the title,image and the id.
 * @param {Array} movieData - Array of Objects that contains the data's of movie/tv show
 * @returns The new array of objects that only contains the title,image and the id.
 */
export const createMovieObj = function (movieData) {
  // Returns an Object that contains only Image and Title
  return movieData.map((data) => {
    return {
      title:
        data.title ?? data.name ?? data.original_title ?? data.original_name,
      img: data.poster_path,
      id: data.id,
    };
  });
};

/**
 * @function
 * @param {number} videoId - id of the movie/tv show
 * @param {string} detailType - type of the data to be searched ex.[videos,credits]
 * @returns The results of the fetched data
 */ // prettier-ignore
export const getMovieTvData = async function (videoId, detailType = "") {
  try {
    const movieData = await fetch(`${API_URL}movie/${videoId}${detailType}?api_key=${API_KEY}&language=en-US`);
    const tvData = await fetch(`${API_URL}tv/${videoId}${detailType}?api_key=${API_KEY}&language=en-US`);

    if (!movieData.ok && !tvData.ok) throw new Error("eeeee");

    const movieDataRes = await movieData.json();
    const tvDataRes = await tvData.json();

    // Only fires when TMDB sends back a data with a results object.
    if(movieDataRes.results ?? tvDataRes.results){ 
      const finalRes = [tvDataRes.results ?? movieDataRes.results]
      .concat(tvDataRes.results ?? movieDataRes.results)
      .filter(val => val !== undefined);
      return finalRes;
    }
  
    // Merges the two objects
    const finalRes = Object.assign(movieDataRes,tvDataRes)
    
    return finalRes;
  } catch (error) {
    throw error;
  }
};
