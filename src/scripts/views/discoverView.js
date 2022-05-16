import mainView from "./mainView";

/**
 * Handle's the rendering of discover movie/tv show cards in the page.
 *
 * Extends of {@link mainView}
 */
class discoverMoviesView extends mainView {
  _title = "Discover Movies";
  viewName = "discoverMoviesView";
}

export default new discoverMoviesView();
