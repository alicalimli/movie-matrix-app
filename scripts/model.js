import { async } from "regenerator-runtime";

import { DISCOVER_API_URL, POPULAR_MOVIES_API_URL } from "./config";

export const data = {
  movie: {},
  discoverMovies: [],
  popularMovies: [],
};

export const createDiscoverCards = async function () {
  try {
    const movieData = await fetch(DISCOVER_API_URL);
    const res = await movieData.json();

    if (!movieData.ok) throw new Error();
    // Returns when the response fails
    data.discoverMovies = res.results.map((data) => {
      return {
        title: data.title,
        img: data.poster_path,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

export const createPopularMovies = async function () {
  try {
    const popularMovieData = await fetch(POPULAR_MOVIES_API_URL);
    const res = await popularMovieData.json();

    if (!popularMovieData.ok) throw new Error();
    // Returns when the response fails
    data.popularMovies = res.results.map((data) => {
      return {
        title: data.title,
        img: data.poster_path,
      };
    });
  } catch (error) {
    console.log(error);
  }
};
