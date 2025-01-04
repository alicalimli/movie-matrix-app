
export const API_KEY = 'b51b535b2fa399a23d7dfdf78f4f91c3';
export const API_URL = `https://api.themoviedb.org/3/`;

export const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;

export const POPULAR_MOVIES_API_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
export const DISCOVER_API_URL = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US`;
export const POPULAR_TVS_API_URL = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US`;
export const TRENDING_API_URL = `${API_URL}trending/all/day?api_key=${API_KEY}&language=en-US`;

export const SEARCH_API_URL = `${API_URL}search/multi?api_key=${API_KEY}&language=en-US&page=1`;

// VARIABLES

export const DEFAULT_PAGE_TYPE = "home";

export const MAX_PAGE = 500; // DONT CHANGE NUMBER ABOVE 500
export const FIRST_PAGE = 1; // ALWAYS 1

export const MAX_AFTER_PAGES_BUTTONS = 3;
export const MAX_BEFORE_PAGES_BUTTONS = 3;

export const EXPAND_CARD_DURATION = 400;
export const UNEXPAND_CARD_DURATION = 600;

export const MAX_CAST_CARDS = 10;
