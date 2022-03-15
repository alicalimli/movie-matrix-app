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
    const btn = event.target.closest(".pag-btns");
    if (!btn) {
      this.btnType = "";
      return;
    }
    console.log("yep");
    this.pageNum = +btn.dataset.pageNum;
    this.btnType = btn.dataset.pageBtn;
  }

  _generatePagination(lastPage) {
    const paginationHTML = `
        <button data-page-btn="first" data-page-num="1" class="pag-btns btn-arrow">< Page 1</button>
        <button data-page-btn="back" data-page-num="${
          this.pageNum - 1
        }"class="pag-btns btn-arrow">< Back</button>
        ${this._generateNumPageBtnsBefore()}
        <button data-page-btn="page-num" data-page-num="${
          this.pageNum
        }" class="pag-btns btn-page-num active">${this.pageNum}</button>

        ${this._generateNumPageBtnsAfter(lastPage)}

        <button data-page-btn="next" data-page-num="${
          this.pageNum + 1
        }"class="pag-btns btn-arrow">Next ></button>
        <button data-page-btn="last" data-page-num="${lastPage}"class="pag-btns btn-arrow">Page ${lastPage} ></button>
    `;
    this._paginationSection.insertAdjacentHTML("beforeend", paginationHTML);
  }

  _generateNumPageBtnsBefore() {
    let pageNumBtnBeforeHTML = ``;

    for (let i = +this.pageNum - 5; i < +this.pageNum; i++) {
      // Only create HTML when i is greater than 0
      if (i > 0) {
        pageNumBtnBeforeHTML += `<button data-page-btn="page-num" data-page-num="${i}" class="pag-btns btn-page-num">${i}</button>`;
      }
    }
    return pageNumBtnBeforeHTML;
  }

  _generateNumPageBtnsAfter(lastPage) {
    let pageNumBtnAfterHTML = ``;

    for (let i = +this.pageNum; i < +this.pageNum + 5; i++) {
      // Only creates HTML when i is not exceeding 500+
      if (i <= lastPage - 1) {
        pageNumBtnAfterHTML += `<button data-page-btn="page-num" data-page-num="${
          i + 1
        }" class="pag-btns btn-page-num">${i + 1}</button>`;
      }
    }
    return pageNumBtnAfterHTML;
  }
}

export default new paginationView();
