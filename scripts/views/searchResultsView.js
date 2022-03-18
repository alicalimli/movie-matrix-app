import mainView from "./mainView";

class searchResultsView extends mainView {
  _inputForm = document.querySelector(".sidebar-form");
  _inputSearch = this._inputForm.querySelector(".sidebar-search-input");
  _title = "";

  addHandlerEvent(handle) {
    const sidebar = document.querySelector(".movie-sidebar-nav");
    const searchInput = document.querySelector(".sidebar-search-input");

    this._inputForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // this function would only work if sidebar is expanded
      if (sidebar.classList.contains("active")) {
        if (searchInput.value === "") return;
        sidebar.classList.remove("active");
        handle();
        return;
      }

      sidebar.classList.add("active");

      // Expands sidebar when search button is clicked
      // and the button only works if sidebar is not expanded

      // Focus doesnt work without a little delay
      setTimeout(() => searchInput.focus(), 100);
    });
  }

  getInputValue() {
    const val = this._inputSearch.value;
    this._title = val;
    this._clearInput();
    return val;
  }

  _clearInput() {
    this._inputSearch.value = "";
  }
}

export default new searchResultsView();
