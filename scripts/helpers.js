import { API_KEY, MOVIES_API_URL } from "./config";
import * as model from "./model.js";

// This function is for fetching data's from TMDB Api
export const apiFetch = async function (
  url,
  pageName = model.data.pages.pageName
) {
  try {
    // Fetches the data
    const movieData = await fetch(url);

    // Throws an error when the response fails
    if (!movieData.ok) throw new Error();

    // Takes the response and convert it to JSON
    const movieDataResults = await movieData.json();

    // Sets the current URL to fetched URL
    model.data.pages.currentUrl = url;

    // Sets the obj to which type of page has been clicked
    model.data.pages.pageName = pageName;

    return movieDataResults;
  } catch (error) {
    console.log(error);
  }
};

// This function is for creating moviecards
export const createMovieObj = function (movieData) {
  // Returns an Object that contains only Image and Title
  return movieData.map((data) => {
    return {
      title: data.title || data.name,
      img: data.poster_path,
      id: data.id,
    };
  });
};

// This function is for getting data's in the api both for TV's and Movies.
export const getMovieTvData = async function (videoId, detailType = "") {
  try {
    const movieData = await fetch(
      `${MOVIES_API_URL}movie/${videoId}${detailType}?api_key=${API_KEY}&language=en-US`
    );
    const tvData = await fetch(
      `${MOVIES_API_URL}tv/${videoId}${detailType}?api_key=${API_KEY}&language=en-US`
    );
    if (!movieData.ok && !tvData.ok) throw new Error("eeeee");
    const movieDataRes = await movieData.json();
    const tvDataRes = await tvData.json();

    // prettier-ignore
    if(movieDataRes.results || tvDataRes.results){   
      // Merges the 2 results array and filters only the values that isnt undefined
      const finalRes = [tvDataRes.results || movieDataRes.results]
      .concat(tvDataRes.results || movieDataRes.results)
      .filter(val => val !== undefined);
      return finalRes;
    }

    // prettier-ignore
    // Merges the two objects
    const finalRes = Object.assign(movieDataRes,tvDataRes)

    return finalRes;
  } catch (error) {
    console.log(error);
  }
};
