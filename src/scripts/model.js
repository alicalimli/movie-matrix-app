import { async } from "regenerator-runtime";

import {
  DISCOVER_API_URL,
  POPULAR_MOVIES_API_URL,
  TRENDING_API_URL,
  POPULAR_TVS_API_URL,
  SEARCH_API_URL,
  MAX_PAGE,
  API_KEY,
  API_URL,
  FIRST_PAGE,
} from "./config";
import { apiFetch, createMovieObj, getMovieTvData } from "./helpers";

export const data = {
  movie: {},
  discoverMovies: [],
  popularMovies: [],
  trendingMovies: [],
  popularTVS: [],
  searchResults: [],
  bookMarksData: [],
  pages: {
    currentUrl: "",
    pageResults: [],
    currentPage: 1,
    currentPageLast: 1,
    currentPageType: "",
    pageName: "",
  },
  expansion: {
    videoData: "",
    videoDetails: {},
    videoCasts: [],
  },
  genre: {
    genresData: [],
    genresResult: [],
    genreArr: [],
  },
  settings: {
    cardZooming: true,
    darkMode: false,
    cardZooming: false,
    disableTransitions: false,
    enableZoom: false,
  },
};

/**
 * Fetches the data's from the API to be rendered in the page.
 * @function
 * @param {string} pageName - Name of the page to be rendered.
 * @param {number} pageNum - Number of the page to be rendered.
 */ // prettier-ignore
export const createDiscoverCards = async function (pageName = "home",pageNum = FIRST_PAGE) {
  try {
    let movieData;
    let tvOrMovie;
    if (pageName === "home") {
      movieData = await apiFetch(`${DISCOVER_API_URL}&page=${pageNum}`, "discoverMovies");
      tvOrMovie = "movie";
    }
    if (pageName === "movies-pop") {
      movieData = await apiFetch(`${POPULAR_MOVIES_API_URL}&page=${pageNum}`,"popularMovies");
      tvOrMovie = "movie";
    }
    if (pageName === "trending") {
      movieData = await apiFetch(`${TRENDING_API_URL}&page=${pageNum}`, "trendingMovies");
      tvOrMovie = "movie";
    }
    if (pageName === "tvs-pop") {
      movieData = await apiFetch(`${POPULAR_TVS_API_URL}&page=${pageNum}`, "popularTVS");
      tvOrMovie = "tv";
    }

    const genreURL = `${API_URL}genre/${tvOrMovie}/list?api_key=${API_KEY}&language=en-US`
    const genreData = await fetch(genreURL);
    const genreRes = await genreData.json();

    console.log('Genres',genreRes, genreURL)
    data.genre.genresData = genreRes.genres;

    //Always Sets the current page to 1
    data.pages.currentPage = movieData.page;

    data.pages.currentPageType = pageName;

    data.pages.currentPageLast = MAX_PAGE;

    data[data.pages.pageName] = createMovieObj(movieData.results);
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the data that the user searched from the TMDB Api.
 * @function
 * @param {string} searchVal - string to search in the api
 */ // prettier-ignore
export const createSearchResults = async function (searchVal) {
  try {
    const searchData = await apiFetch(`${SEARCH_API_URL}&query=` + searchVal);

    const searchDataResults = await searchData.results.filter(data => data.media_type !== "person");

    data.pages.currentPageType = "search";

    if(searchDataResults.length === 0) throw new Error("Sorry, We can't find what you're looking for.")

    data.searchResults = createMovieObj(searchDataResults);
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the data of page results from the TMD API.
 * @function
 * @param {string} btnType - type of the button that the user clicked
 * @param {number} pageNum - number of the page to fetch
 */ // prettier-ignore
export const createPageResults = async function (btnType, pageNum = FIRST_PAGE) {
  try {
    // Copies currentPage to be able to compare it later
    const currentPage = data.pages.currentPage;
    if (!btnType) return;

    // Decrement and increment the currentPage number
    if (btnType === "next") data.pages.currentPage++;
    if (btnType === "back" && pageNum > 0) data.pages.currentPage--;
    if (btnType === "first") data.pages.currentPage = FIRST_PAGE;
    if (btnType === "last") data.pages.currentPage = data.pages.currentPageLast;
    if (btnType === "page-num") data.pages.currentPage = pageNum;

    // If currentpage didnt change the function Stops
    if (currentPage === data.pages.currentPage) return;

    // Fetches the data
    const pageData = await apiFetch(`${data.pages.currentUrl}&page=${data.pages.currentPage}`)

    // Create's Movie
    data.pages.pageResults = createMovieObj(pageData.results);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetches the data's of the movie/tv show that has been expanded from TMDB API.
 * @function
 * @param {number} videoId - movie/tv show id  -
 */ //prettier-ignore
export const createExpandPage = async function (videoId) {
  try {
    const videoData = await getMovieTvData(videoId, "/videos");
    const videoDetails = await getMovieTvData(videoId);
    const videoCasts = await getMovieTvData(videoId, "/credits");
    
    data.expansion.videoDetails = await videoDetails;
    data.expansion.videoData = await videoData
      .filter((val) => val.type === "Trailer")
      .map((data) => {
        return { key: data.key };
      });

    data.expansion.videoCasts = await videoCasts.cast;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetch filtered genre movie/tv show cards data in the API to be rendered in the page.
 * @function
 */
// prettier-ignore
export const createGenreCards = async function () {
  try{
    const genreData = await fetch( `${data.pages.currentUrl}/&with_genres=${data.genre.genreArr}`);
    data.pages.currentUrl = `${data.pages.currentUrl}/&with_genres=${data.genre.genreArr}`;
  
    if (!genreData) return;
  
    const genreRes = await genreData.json();

    if(genreRes.results.length === 0) throw new Error("Sorry, We can't find any results with the given genre.")

    data.genre.genresResult = await createMovieObj(genreRes.results);
  
    //Always Sets the current page to 1
    data.pages.currentPage = genreRes.page;
  }catch(error){
    console.error(error);
    throw error;
  }
};
