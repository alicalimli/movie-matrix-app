import genreCardsView from "./genreCardsView";

class othersView {
  _filterButtonContainer = document.querySelector(".filter-btn-container");
  _settingsContainer = document.querySelector(".settings-container");
  _paginationSection = document.querySelector(".movie-pagination");
  _sidebarButtons = document.querySelector(".sidebar-buttons");
  _toolTips = document.querySelectorAll(".secondary-title");

  _headerSection = document.querySelector(".section-header");
  _mainMovieSection = document.querySelector(".movie-main");
  _settingsIcon = document.querySelector(".settings-icon");

  _sidebar = document.querySelector(".movie-sidebar-nav");
  _overlay = document.querySelector(".overlay-main");
  _parent = document.body;

  zoomEnabled = false;

  // prettier-ignore
  constructor(){
    this._overlay.addEventListener('click', this._addOverlayEventHandler.bind(this))
  }

  _addOverlayEventHandler() {
    this.sidebarBtnPointerEvent("auto");
    this.sidebarPointerEvent("auto");
    this.showGenreButtons("remove");
    this.shrinkSections("remove");
    this.expandSidebar("remove");
    this.showSettings("remove");
    this.showOverlay("remove");
    this.hideToolTip("visible");
  }

  showSettings(type) {
    this._settingsContainer.classList[type]("show");
  }

  spinSettingsIcon(type) {
    this._settingsIcon.classList[type]("spin");
  }

  hideToolTip(type) {
    this._toolTips.forEach((el) => (el.style.visibility = type));
  }

  sidebarPointerEvent(type) {
    this._sidebar.style.pointerEvents = type;
  }

  sidebarBtnPointerEvent(type) {
    this._sidebarButtons.style.pointerEvents = type;
  }

  showGenreButtons(type) {
    this._filterButtonContainer.classList[type]("show");
  }

  expandSidebar(type) {
    this._sidebar.classList[type]("active");
  }

  showOverlay(type) {
    this._overlay.classList[type]("show");
  }

  shrinkSections(type) {
    if (!this.zoomEnabled) return;
    this._mainMovieSection.classList[type]("shrink");
    this._headerSection.classList[type]("shrink");
    this._paginationSection.classList[type]("shrink");
  }

  shrinkSectionsCopy(type) {
    this._mainMovieSection.classList[type]("shrink");
    this._headerSection.classList[type]("shrink");
    this._paginationSection.classList[type]("shrink");
  }
}

export default new othersView();
