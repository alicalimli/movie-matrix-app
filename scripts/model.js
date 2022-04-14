import { async } from "regenerator-runtime";

import {
  DISCOVER_API_URL,
  POPULAR_MOVIES_API_URL,
  TRENDING_API_URL,
  POPULAR_TVS_API_URL,
  SEARCH_API_URL,
  SEARCH_TVS_API_URL,
  MOVIES_MAX_PAGE,
  API_KEY,
  MOVIES_API_URL,
  DISCOVER_URL_FIRST,
  DISCOVER_URL_SECOND,
} from "./config";
import { apiFetch, createMovieObj, getMovieTvData } from "./helpers";

// This object is the overall data

export const data = {
  movie: {},
  discoverMovies: [],
  popularMovies: [],
  trendingMovies: [],
  genresData: [],
  genresResult: [],
  genreArr: [],
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
};

// prettier-ignore
export const createDiscoverCards = async function (pageName = "home",pageNum = 1) {
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

    const genreData = await fetch(`${MOVIES_API_URL}/genre/${tvOrMovie}/list?api_key=${API_KEY}&language=en-US`);
    const genreRes = await genreData.json();

    console.log(movieData)

    data.genresData = genreRes.genres;
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

// This function is for creating search results when user search something
// prettier-ignore
export const createSearchResults = async function (searchVal) {
  try {
    // Fetches Search Data's and convert it to JSON
    const resultMovieData = await apiFetch(`${SEARCH_API_URL}&query=` + searchVal);
    const resultTVData = await apiFetch(`${SEARCH_TVS_API_URL}&query=` + searchVal);

    // Merges TvResults and Movie Results and returns the data
    const finalRes = resultMovieData.results.concat(resultTVData.results);

    // Create's Movie Object
    data.searchResults = createMovieObj(finalRes);
    data.pages.currentPageType = "search";
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
    const pageData = await apiFetch(`${data.pages.currentUrl}&page=${data.pages.currentPage}`)

    console.log(data.pages.currentUrl)

    // Create's Movie
    data.pages.pageResults = createMovieObj(pageData.results);
  } catch (error) {
    console.log(error);
  }
};

export const createExpandPage = async function (videoId) {
  try {
    const videoData = await getMovieTvData(videoId, "/videos");
    const videoDetails = await getMovieTvData(videoId);
    const videoCasts = await getMovieTvData(videoId, "/credits");
    data.expansion.videoDetails = await videoDetails;
    data.expansion.videoData = await videoData
      .filter((val) => val.type === "Trailer")
      .map((data) => {
        return {
          key: data.key,
        };
      });
    data.expansion.videoCasts = await videoCasts.cast;
  } catch (error) {
    console.log(error);
  }
};

export const createGenreCards = async function () {
  const genreData = await fetch(
    `${data.pages.currentUrl}/&with_genres=${data.genreArr}`
  );
  data.pages.currentUrl = `${data.pages.currentUrl}/&with_genres=${data.genreArr}`;

  console.log(genreData);
  if (!genreData) return;
  const genreRes = await genreData.json();
  data.genresResult = await createMovieObj(genreRes.results);
  console.log(genreRes.results);

  //Always Sets the current page to 1
  data.pages.currentPage = genreRes.page;
};
