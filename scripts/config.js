export const API_KEY = "b51b535b2fa399a23d7dfdf78f4f91c3";
export const IMG_PATH = `https://image.tmdb.org/t/p/w500`;
export const POPULAR_MOVIES_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;
export const POPULAR_TVS_API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=`;
export const DISCOVER_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=`;
export const TRENDING_API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=`;
export const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=`;
export const SEARCH_TVS_API_URL = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=`;
export const MOVIES_MAX_PAGE = 500; // DONT CHANGE TMDP API DOESNT RETURN A RESPONSE WHEN PAGE IS ABOVE 500
export const MOVIES_FIRST_PAGE = 1; // ALWAYS 1
