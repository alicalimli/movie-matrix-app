import mainView from "./mainView";

class paginationView extends mainView {
  _paginationSection = document.querySelector(".movie-pagination");
  _title = "Trending";
  btnType = "";

  addHandlerEvent(handler) {
    this._paginationSection.addEventListener("click", function (e) {
      handler(e);
    });
  }

  buttonClicked(event) {
    const btn = event.target;
    if (!btn) return;
    this.btnType = btn.dataset.pageBtn;
  }
}

export default new paginationView();
