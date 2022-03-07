import mainView from "./mainView";

class searchResultsView extends mainView {
  _inputForm = document.querySelector(".search-form");
  _inputSearch = this._inputForm.querySelector(".input-search");
  _title = "";

  addHandlerEvent(handle) {
    this._inputForm.addEventListener("submit", function (event) {
      event.preventDefault();
      handle();
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
