import { async } from "regenerator-runtime";

import { TRENDING_API_URL } from "./config";

export const data = {
  movie: {},
  homePageMovies: [],
  homePagetvShows: [],
};

export const createPosterCard = async function () {
  try {
    const movieData = await fetch(TRENDING_API_URL);
    const res = await movieData.json();

    if (!movieData.ok) throw new Error();
    // Returns when the response fails
    data.homePageMovies = res.results.slice(0, 9).map((data) => {
      return {
        title: data.title,
        img: data.poster_path,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
