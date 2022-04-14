import { API_KEY, MOVIES_API_URL } from "./config";
import * as model from "./model.js";
import paginationView from "./views/paginationView";
// ****************** Below functions is mostly used in Controller.js **************************

// prettier-ignore
export const controlMovieCards = async function (viewType, viewName, pageType = "home",pageNum = 1) {
  try {
    // Render's Loading Spinner
    viewType.renderLoading();
    
    // Create's Movie Data
    await model.createDiscoverCards(pageType,pageNum);

    // Render's HTML Cards
    await viewType.renderHTML(model.data[viewName]);

    // Render's Genre tags
    await viewType.renderGenreTags(model.data.genresData);

    // Sets Pagination View Pagenumber to pageNum
    paginationView.pageNum = pageNum;

    // Render's pagination
    paginationView.renderPagination(model.data.pages.currentPageLast);

  } catch (error) {
    console.log(error);
  }
};

// This function is for enabling/disabling the zooming transition and the pointer event of sidebar buttons.
export const showExpandOverlay = function (type, pointerEvent) {
  // Shrink's every sections in the html
  document.querySelector(".movie-main").classList[type]("active");
  document.querySelector(".section-header").classList[type]("active");
  document.querySelector(".movie-pagination").classList[type]("active");
  document.querySelector(".overlay-main").classList[type]("active");
  document.querySelector(".sidebar-buttons").style.pointerEvents = pointerEvent;
};

// prettier-ignore
export const cardSizePos = function(cardEl,width,height,top,left){
  cardEl.style.top = top;
  cardEl.style.left =  left;
  cardEl.style.height = height;
  cardEl.style.width = width;
}

let topCopy, leftCopy, widthCopy, heightCopy;
export const cardExpand = function (cardEl, isExpanding) {
  // Sets the position of movieCardClone in the movieCards position
  // prettier-ignore
  if(isExpanding){
    // Takes the position of movieCard
    const { top, left, width, height } = cardEl.getBoundingClientRect();
    heightCopy = height;
    widthCopy = width;
    leftCopy = left;
    topCopy = top;
    
    const movieCardClone = cardEl.querySelector("img").cloneNode(true);

    cardSizePos(movieCardClone,`${width}px`,`${height}px`,`${top}px`,`${left}px`)

    // Some styling in movieCardClone
    movieCardClone.style.position = "fixed";
    movieCardClone.style.backgroundColor = "var(--tertiary-bg-color)";
    movieCardClone.style.borderRadius = "18px";
    movieCardClone.style.zIndex = "99";
    movieCardClone.style.pointerEvents = "none";
    movieCardClone.classList.add("movie-card-clone");
  
    // add card to the same container
    document.body.appendChild(movieCardClone);
  
    // Animates the movieCardClone and delay's abit because without delay animation wont work
    // prettier-ignore
    setTimeout(() => {
          requestAnimationFrame(() => {
            movieCardClone.style.transition = `all 0.3s ease-in-out`;
            movieCardClone.style.borderRadius = "24px";
            movieCardClone.style.transform = "translate(-50%,-50%)";
            // Position and Size of the card
            cardSizePos(movieCardClone,"105vw","105vh","50%","50%")
          });
        }, 5);
  }

  if (!isExpanding) {
    cardEl.style.transition = `all 0.5s ease`;
    cardEl.style.borderRadius = "5px";
    cardEl.style.transform = "unset";
    // Position and Size of the card
    // prettier-ignore
    cardSizePos(cardEl,`${widthCopy}px`,`${heightCopy}px`,`${topCopy}px`,`${leftCopy}px`)
    console.log(widthCopy);

    setTimeout(() => {
      if (cardEl) cardEl.style.opacity = "0";

      // Scale's sections in the html back to normal and enable sidebar buttons pointer event
      showExpandOverlay("remove", "auto");
    }, 300);

    setTimeout(() => {
      if (cardEl) {
        cardEl.remove();
        document.querySelector(".video-section")?.remove();
      }
    }, 600);
  }
};

// ****************** Below functions is mostly used in Model.js **************************

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
      title:
        data.title ?? data.name ?? data.original_title ?? data.original_name,
      img: data.poster_path,
      id: data.id,
    };
  });
};

// This function is for getting data's in the api both for TV's and Movies.
export const getMovieTvData = async function (videoId, detailType = "") {
  try {
    // Fetching Movie's and TV's Data's from TMDB API
    const movieData = await fetch(
      `${MOVIES_API_URL}movie/${videoId}${detailType}?api_key=${API_KEY}&language=en-US`
    );
    const tvData = await fetch(
      `${MOVIES_API_URL}tv/${videoId}${detailType}?api_key=${API_KEY}&language=en-US`
    );

    // Throw's and error if Movie's and TV's data doesn't exist
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
