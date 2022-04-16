class othersView {
  _parent = document.body;
  _overlay = document.querySelector(".overlay-main");

  renderOverlay() {
    const overlayMarkup = `
    <div class="overlay-main"></div>
    `;
  }
}

export default new othersView();
