import othersView from "./othersView";

class cardZoomingView {
  _mainSection = document.querySelector(".movie-main");
  _backButton = document.querySelector(".back-btn");
  _cardElementClone;
  _topCopy;
  _leftCopy;
  _widthCopy;
  _heightCopy;

  addEventHandler(handle) {
    this._mainSection.addEventListener("click", handle);
  }

  addBackEventHandler(handle) {
    this._backButton.addEventListener("click", handle);
  }

  _cardSizePos(cardElement, width, height, top, left) {
    cardElement.style.top = top;
    cardElement.style.left = left;
    cardElement.style.height = height;
    cardElement.style.width = width;
  }

  shrinkSections() {
    othersView.sidebarBtnPointerEvent("none");
    othersView.shrinkSections("add");
    othersView.hideToolTip("hidden");
    othersView.showOverlay("add");
  }

  unShrinkSections() {
    // Unshrink's sections in the html and enable sidebar buttons pointer event
    othersView.sidebarBtnPointerEvent("auto");
    othersView.shrinkSections("remove");
    othersView.hideToolTip("visible");
    othersView.showOverlay("remove");
  }

  renderCardZoom(cardElement) {
    // Takes the position of movieCard and
    // Sets the position of movieCardClone in the movieCards position
    const { top, left, width, height } = cardElement.getBoundingClientRect();
    this._heightCopy = height;
    this._widthCopy = width;
    this._leftCopy = left;
    this._topCopy = top;

    // prettier-ignore
    const movieCardClone = cardElement.querySelector("img")?.cloneNode(true) ?? document.createElement('div');
    movieCardClone.classList.remove("movie-img");

    this._cardElementClone = movieCardClone;

    this._cardSizePos(
      movieCardClone,
      `${width}px`,
      `${height}px`,
      `${top}px`,
      `${left}px`
    );

    // Some styling in movieCardClone
    movieCardClone.style.position = "fixed";
    movieCardClone.style.backgroundColor = "var(--tertiary-bg-color)";
    movieCardClone.style.borderRadius = "18px";
    movieCardClone.style.zIndex = "99";
    movieCardClone.style.pointerEvents = "none";
    movieCardClone.classList.add("movie-card-clone");

    // add card to the same container
    document.body.appendChild(movieCardClone);

    // Animates the movieCardClone and delay's a bit because without delay animation wont work
    setTimeout(() => {
      requestAnimationFrame(() => {
        console.log(movieCardClone);
        movieCardClone.style.transition = `all 0.3s ease-in-out`;
        movieCardClone.style.borderRadius = "24px";
        movieCardClone.style.transform = "translate(-50%,-50%)";
        // Position and Size of the card
        this._cardSizePos(movieCardClone, "105vw", "105vh", "50%", "50%");
      });
    }, 100);
  }

  // prettier-ignore
  renderCardShrink(cardElement = this._cardElementClone) {
    cardElement.style.transition = `all 0.5s ease`;
    cardElement.style.borderRadius = "5px";
    cardElement.style.transform = "unset";

    // Position and Size of the card
    this._cardSizePos(cardElement,`${this._widthCopy}px`,`${this._heightCopy}px`,`${this._topCopy}px`,`${this._leftCopy}px`)

    setTimeout(() => {
      cardElement.style.opacity = "0";
      cardElement.remove();
      document.querySelector(".video-section")?.remove();
    }, 600);
  }
}

export default new cardZoomingView();
