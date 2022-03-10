import { async } from "regenerator-runtime";

import {
  DISCOVER_API_URL,
  POPULAR_MOVIES_API_URL,
  TRENDING_API_URL,
  POPULAR_TVS_API_URL,
  SEARCH_API_URL,
  SEARCH_TVS_API_URL,
} from "./config";

export const data = {
  movie: {},
  discoverMovies: [],
  popularMovies: [],
  trendingMovies: [],
  popularTVS: [],
  searchResults: [],
};

export const createDiscoverCards = async function (pageName = "home") {
  try {
    let movieData;
    let obj;
    if (pageName === "home") {
      movieData = await fetch(DISCOVER_API_URL);
      obj = "discoverMovies";
    }
    if (pageName === "movies-pop") {
      movieData = await fetch(POPULAR_MOVIES_API_URL);
      obj = "popularMovies";
    }
    if (pageName === "trending") {
      movieData = await fetch(TRENDING_API_URL);
      obj = "trendingMovies";
    }
    if (pageName === "tvs-pop") {
      movieData = await fetch(POPULAR_TVS_API_URL);
      obj = "popularTVS";
    }

    const res = await movieData.json();
    console.log(res);

    if (!movieData.ok) throw new Error();

    // Returns when the response fails

    data[obj] = res.results.map((data) => {
      return {
        title: data.title || data.name,
        img: data.poster_path,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export const createSearchResults = async function (searchVal) {
  try {
    // Fetches Search API
    const resultData = await fetch(SEARCH_API_URL + searchVal);
    const resultTVData = await fetch(SEARCH_TVS_API_URL + searchVal);
    const res = await resultData.json();
    const resTv = await resultTVData.json();

    const finalResults = res.results.concat(resTv.results);

    console.log(finalResults);

    if (!resultData.ok) throw new Error();

    data.searchResults = finalResults.map((data) => {
      return {
        title: data.title || data.name,
        img: data.poster_path,
      };
    });
  } catch (error) {
    console.log(error);
  }
};