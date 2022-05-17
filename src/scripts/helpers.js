import { API_KEY, API_URL, FIRST_PAGE } from "./config";
import * as model from "./model.js";
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
 * @param {Number} [pageNum=1] - The page number of the movie cards to be displayed.
 */ // prettier-ignore
export const controlMovieCards = async function (viewType, viewName, pageType = "home",pageNum = FIRST_PAGE) {
  try {
    if(pageType === "bookmark"){
      model.data.pages.currentPageType = pageType;

      genreCardsView.renderGenreErrorMsg();

      if (model.data[viewName].length === 0)
        throw new Error("You dont have any bookmarks yet.");

      viewType.renderLoading();

      viewType.renderHTML(
        model.data[viewName],
        model.data[viewName]
      );
      console.log('sucess')
      return
    }
    model.data.genre.genreArr = [];

    viewType.renderLoading();

    await model.createDiscoverCards(pageType,pageNum);
    await viewType.renderHTML(model.data[viewName], model.data.bookMarksData);

    paginationView.pageNum = pageNum;
    paginationView.renderPagination(model.data.pages.currentPageLast);

    if(pageType === "trending"){
      genreCardsView.renderGenreErrorMsg();
    }else{
      genreCardsView.renderGenreTags(model.data.genre.genresData);
    }
  } catch (error) {
    viewType.renderErrorMsg(error.message)
  }
};

/**
 * Unexpand the sidebar navigation.
 */
export const unExpandSidebar = function () {
  othersView.shrinkSections("remove");
  othersView.expandSidebar("remove");
  othersView.showOverlay("remove");
  othersView.hideToolTip("hidden");
  setTimeout(() => othersView.hideToolTip("visible"), 2000);
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
  console.log(movieData);
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

    console.log(await tvDataRes.results ?? await movieData.results, "SRTHIWSIEDGSEK")

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
