import mainView from "./mainView";

class paginationView extends mainView {
  _title = "Trending";
  btnType = "";
  pageNum = 1;

  addHandlerEvent(handler) {
    this._paginationSection.addEventListener("click", function (e) {
      handler(e);
    });
  }

  renderPagination(lastPage) {
    this._generatePagination(lastPage);
    this._updateTitle();
    this._scrollToTop();
  }

  buttonClicked(event) {
    const btn = event.target;
    if (!btn) return;

    if (btn.dataset.pageBtn === "page-num") this.pageNum = btn.dataset.pageNum;
    this.btnType = btn.dataset.pageBtn;
  }

  _generatePagination(lastPage) {
    const paginationHTML = `
        <button data-page-btn="first" class="btn-arrow">< Page 1</button>
        <button data-page-btn="back" class="btn-arrow">< Back</button>
        <button data-page-btn="page-num" data-page-num="1" class="btn-page-num">1</button>
        <button data-page-btn="page-num" data-page-num="2" class="btn-page-num">2</button>
        <button data-page-btn="page-num" data-page-num="3" class="btn-page-num">3</button>
        <button data-page-btn="page-num" data-page-num="4" class="btn-page-num">4</button>
        <button data-page-btn="page-num" data-page-num="5" class="btn-page-num">5</button>
        <button data-page-btn="next" class="btn-arrow">Next ></button>
        <button data-page-btn="last" class="btn-arrow">Page ${lastPage} ></button>
    `;
    this._paginationSection.insertAdjacentHTML("beforeend", paginationHTML);
  }
}

export default new paginationView();
