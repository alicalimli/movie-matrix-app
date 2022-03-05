const API_KEY = "b51b535b2fa399a23d7dfdf78f4f91c3";
const TRENDING_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;

const sideBar = document.querySelector(".movie-sidebar-nav");
const navBtns = document.querySelectorAll(".nav-btn");

const showMoves = async function () {
  const data = await fetch(TRENDING_API_URL);
  const res = await data.json();
  const parentEl = document.querySelector(".movie-main");

  // Returns when the response fails

  if (!data.ok) return;
  console.log(res);
  parentEl.innerHTML = "";

  // Loops over the results and render the movie-card to the DOM

  res.results.slice(0, 9).forEach((el) => {
    const { title, poster_path } = el;

    const markup = `
      <div class="movie-card">
        <img
          class="movie-img"
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <span class="movie-title">${title}</span>
          <button class="expand-btn">expand</button>
        </div>
     </div>
    `;

    parentEl.insertAdjacentHTML("beforeend", markup);
  });

  // Creates the showall button HTML and render it to the DOM

  const showAllMarkup = `
    <button class="showall-card-btn">
      <span class="showall-btn">Show All &rightarrow;</span>
    </button>
  `;
  parentEl.insertAdjacentHTML("beforeend", showAllMarkup);
};

showMoves();
sideBar.addEventListener("click", function (e) {
  const btn = e.target.closest(".nav-btn");

  if (!btn) return;

  // Removes the active classes to all buttons
  // except the btn that has been clicked

  navBtns.forEach((el) => {
    if (el !== btn) el.classList.remove("active");
  });

  // Creates ripple effect for the buttons

  const x = e.clientX - btn.offsetLeft;
  const y = e.clientY - btn.offsetTop;

  const ripple = document.createElement("span");
  ripple.classList.add("btn-ripple");
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  btn.appendChild(ripple);

  setTimeout(() => ripple.remove(), 1000);

  // Toggles active class to the buttons

  btn.classList.toggle("active");
});
