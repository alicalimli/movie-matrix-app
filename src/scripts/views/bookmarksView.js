import mainView from "./mainView";

/**
 * Handle's the rendering of bookmarked movie/tv show cards in the page.
 *
 * Extends of {@link mainView}
 */
class bookmarksView extends mainView {
  _title = "Bookmarks";
  viewName = "bookmarksView";
}

export default new bookmarksView();
