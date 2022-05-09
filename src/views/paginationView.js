import mainView from "./mainView";

class paginationView extends mainView {
  btnType = "";
  pageNum = 1;

  renderHTML(movieData, bmData) {
    this._movieData = movieData;
    this._bmData = bmData;
    this._clearHTML();
    this._generateHTML();
    this._scrollToTop();
  }

  addHandlerEvent(handler) {
    this._paginationSection.addEventListener("click", handler);
  }

  renderPagination(lastPage) {
    this._generatePagination(lastPage);
    this._scrollToTop();
  }

  // prettier-ignore
  buttonClicked(event) {
    const btn = event.target.closest(".pag-btns");
    if (!btn) {
      this.btnType = "";
    } 
    else {
      this.pageNum = +btn.dataset.pageNum;
      this.btnType = btn.dataset.pageBtn;
    }
  }

  _generatePagination(lastPage) {
    const paginationHTML = `
        <button 
          data-page-btn="first" data-page-num="1" 
          class="pag-btns btn-arrow">< Page 1</button>

        <button 
          data-page-btn="back" 
          data-page-num="${this.pageNum - 1}"
          class="pag-btns btn-arrow">< Back</button>

        ${this._generateNumPageBtnsBefore()}
        <button 
          data-page-btn="page-num" 
          data-page-num="${this.pageNum}" 
          class="pag-btns btn-page-num active">${this.pageNum}</button>

        ${this._generateNumPageBtnsAfter(lastPage)}

        <button 
          data-page-btn="next" 
          data-page-num="${this.pageNum + 1}"
          class="pag-btns btn-arrow">Next ></button>
        
        <button 
          data-page-btn="last" 
          data-page-num="${lastPage}"
          class="pag-btns btn-arrow">Page ${lastPage} ></button>
    `;
    this._paginationSection.insertAdjacentHTML("beforeend", paginationHTML);
  }

  _generateNumPageBtnsBefore() {
    let pageNumBtnBeforeHTML = ``;

    for (let i = +this.pageNum - 2; i < +this.pageNum; i++) {
      // Only create HTML when i is greater than 0
      if (i > 0) {
        pageNumBtnBeforeHTML += `
          <button 
            data-page-btn="page-num" 
            data-page-num="${i}" 
            class="pag-btns btn-page-num">${i}</button>
        `;
      }
    }
    return pageNumBtnBeforeHTML;
  }

  _generateNumPageBtnsAfter(lastPage) {
    let pageNumBtnAfterHTML = ``;

    for (let i = +this.pageNum; i < +this.pageNum + 3; i++) {
      // Only creates HTML when i is not exceeding 500+
      if (i <= lastPage - 1) {
        pageNumBtnAfterHTML += `
          <button 
            data-page-btn="page-num" 
            data-page-num="${i + 1}" 
            class="pag-btns btn-page-num">${i + 1}</button>
        `;
      }
    }
    return pageNumBtnAfterHTML;
  }
}

export default new paginationView();
