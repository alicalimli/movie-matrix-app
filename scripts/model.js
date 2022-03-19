import { async } from "regenerator-runtime";

import {
  DISCOVER_API_URL,
  POPULAR_MOVIES_API_URL,
  TRENDING_API_URL,
  POPULAR_TVS_API_URL,
  SEARCH_API_URL,
  SEARCH_TVS_API_URL,
  MOVIES_MAX_PAGE,
} from "./config";

// This object is the overall data

export const data = {
  movie: {},
  discoverMovies: [],
  popularMovies: [],
  trendingMovies: [],
  popularTVS: [],
  searchResults: [],
  pages: {
    currentUrl: "",
    pageResults: [],
    currentPage: 1,
    currentPageLast: 1,
    currentPageType: "",
    pageName: "",
  },
};

// this function is for creating moviecards

const apiFetch = async function (url, pageNum, pageName = data.pages.pageName) {
  try {
    // Fetches the data
    const movieData = await fetch(url + pageNum);

    // Throws an error when the response fails
    if (!movieData.ok) throw new Error();

    // Takes the response and convert it to JSON
    const movieDataResults = await movieData.json();

    // Sets the current URL to fetched URL
    data.pages.currentUrl = url;

    // Sets the obj to which type of page has been clicked
    data.pages.pageName = pageName;

    return movieDataResults;
  } catch (error) {
    console.log(error);
  }
};

const apiFetchSearch = async function (apiMovieUrl, apiTvUrl, searchValue) {
  try {
    // Fetches Search Data's and convert it to JSON
    const resultMovieData = await fetch(apiMovieUrl + searchValue);
    const resultTVData = await fetch(apiTvUrl + searchValue);

    if (!resultMovieData.ok && !resultTVData.ok) throw new Error();

    // Converts Data's to JSON
    const moviesResultData = await resultMovieData.json();
    const tvResultData = await resultTVData.json();

    // Merges TvResults and Movie Results and returns the data
    return moviesResultData.results.concat(tvResultData.results);
  } catch (error) {
    console.log(error);
  }
};

const createMovieObj = function (movieData) {
  // Returns an Object that contains only Image and Title
  return movieData.map((data) => {
    return {
      title: data.title || data.name,
      img: data.poster_path,
    };
  });
};

// prettier-ignore
export const createDiscoverCards = async function (pageName = "home",pageNum = 1) {
  try {
    let movieData;
    if (pageName === "home") {
      movieData = await apiFetch(DISCOVER_API_URL, pageNum, "discoverMovies");
    }
    if (pageName === "movies-pop") {
      movieData = await apiFetch(POPULAR_MOVIES_API_URL,pageNum,"popularMovies");
    }
    if (pageName === "trending") {
      movieData = await apiFetch(TRENDING_API_URL, pageNum, "trendingMovies");
    }
    if (pageName === "tvs-pop") {
      movieData = await apiFetch(POPULAR_TVS_API_URL, pageNum, "popularTVS");
    }

    //Always Sets the current page to 1
    data.pages.currentPage = movieData.page;

    // Sets the currentPageType to which button has been click(ex.Movies)
    data.pages.currentPageType = pageName;

    // Always sets the currentpagelast to lastpage
    data.pages.currentPageLast = MOVIES_MAX_PAGE; // TMDB returns an error when page is above 500

    // Creates Movie Object
    data[data.pages.pageName] = createMovieObj(movieData.results);
  } catch (error) {
    console.error(error);
  }
};

// this functions is for creating search results when user search something

export const createSearchResults = async function (searchVal) {
  try {
    // Fetches Search API
    const searchResultsData = await apiFetchSearch(
      SEARCH_API_URL,
      SEARCH_TVS_API_URL,
      searchVal
    );

    // Create's Movie Object
    data.searchResults = createMovieObj(searchResultsData);
  } catch (error) {
    console.log(error);
  }
};

// This function is for creating page results when pagination buttons is clicked
// prettier-ignore
export const createPageResults = async function (btnType, pageNum = 1) {
  try {
    // Copie's currentPage to be able to compare it later
    const currentPage = data.pages.currentPage;
    if (!btnType) return;

    // Decrement and increment the currentPage number
    if (btnType === "next") data.pages.currentPage++;
    if (btnType === "back" && pageNum > 0) data.pages.currentPage--;
    if (btnType === "first") data.pages.currentPage = 1;
    if (btnType === "last") data.pages.currentPage = data.pages.currentPageLast;
    if (btnType === "page-num") data.pages.currentPage = pageNum;

    // If currentpage didnt change the function Stops
    if (currentPage === data.pages.currentPage) return;

    // Fetches the data
    const pageData = await apiFetch(data.pages.currentUrl,data.pages.currentPage)

    // Create's Movie
    data.pages.pageResults = createMovieObj(pageData.results);
  } catch (error) {
    console.log(error);
  }
};
