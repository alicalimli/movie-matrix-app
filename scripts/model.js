import { async } from "regenerator-runtime";

import { DISCOVER_API_URL, POPULAR_MOVIES_API_URL } from "./config";

export const data = {
  movie: {},
  discoverMovies: [],
  popularMovies: [],
};

console.log(data["discoverMovies"]);

export const createDiscoverCards = async function (pageName) {
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
    if (pageName === "home") {
      movieData = await fetch(DISCOVER_API_URL);
      obj = "discoverMovies";
    }
    if (pageName === "home") {
      movieData = await fetch(DISCOVER_API_URL);
      obj = "discoverMovies";
    }

    const res = await movieData.json();

    console.log(movieData);
    if (!movieData.ok) throw new Error();
    // Returns when the response fails
    data[obj] = res.results.map((data) => {
      return {
        title: data.title,
        img: data.poster_path,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
