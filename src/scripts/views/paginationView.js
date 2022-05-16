import { MAX_AFTER_PAGES_BUTTONS, MAX_BEFORE_PAGES_BUTTONS } from "../config";
import mainView from "./mainView";

/**
 * Handle's the rendering of pagination buttons and the movie/tv show cards when a pagination button is clicked.
 *
 * Extends of {@link mainView}
 */
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

  addEventHandler(handler) {
    this._paginationSection.addEventListener("click", handler);
  }

  renderPagination(lastPage) {
    this._generatePagination(lastPage);
    this._scrollToTop();
  }

  /**
   * Sets the page number and the button type of which user clicked.
   * @param {event} event - Event that fires when pagination button has been clicked.
   */ // prettier-ignore
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

  /**
   * Generates pagination buttons that comes before the current page.
   * @returns Generated pagination buttons.
   */ // prettier-ignore
  _generateNumPageBtnsBefore() {
    let pageNumBtnBeforeHTML = ``;

    for (let i = +this.pageNum - MAX_BEFORE_PAGES_BUTTONS; i < +this.pageNum; i++) {
      // Only generates HTML when index is greater than 0
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

  /**
   * Generates pagination buttons that comes after the current page.
   * @param {number} lastPage - The last page of the page.
   * @returns Generated pagination buttons.
   */ // prettier-ignore
  _generateNumPageBtnsAfter(lastPage) {
    let pageNumBtnAfterHTML = ``;

    for (let i = +this.pageNum; i < +this.pageNum + MAX_AFTER_PAGES_BUTTONS; i++) {
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
