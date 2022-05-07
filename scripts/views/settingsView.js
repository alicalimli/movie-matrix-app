import othersView from "./othersView";

class settingsView {
  //prettier-ignore
  _disableTransitionSetting = document.querySelector(".disable-transition-setting");
  _disableZoomSetting = document.querySelector(".disable-zoom-setting");
  _closeSettingsBtn = document.querySelector(".close-settings-btn");
  _darkModeSetting = document.querySelector(".dark-mode-setting");
  _cardZoomSetting = document.querySelector(".card-zoom-setting");
  _settingsList = document.querySelector(".settings-lists");
  _settingsBtn = document.querySelector(".sidebar-footer");

  constructor() {
    // Attach event handlers
    this._settingsBtn.addEventListener("click", this._openSettings);
    this._closeSettingsBtn.addEventListener("click", this._closeSettings);
  }

  addEventHandler(handle) {
    this._settingsList.addEventListener("click", handle);
  }

  updateSettings(data) {
    if (data.darkMode) {
      this._darkModeSetting.classList.toggle("active");
      document.body.classList.toggle("darkmode");
    }
    if (data.cardZooming) {
      this._cardZoomSetting.classList.toggle("active");
    }
    if (data.disableTransitions) {
      this._disableTransitionSetting.classList.toggle("active");
      document.body.classList.toggle("disable-transitions");
    }
    if (data.enableZoom) {
      this._disableZoomSetting.classList.toggle("active");
      othersView.zoomEnabled = true;
    }
  }

  _openSettings() {
    othersView.spinSettingsIcon("add");
    othersView.expandSidebar("remove");
    othersView.shrinkSections("add");
    othersView.hideToolTip("hidden");
    othersView.showSettings("add");
    othersView.showOverlay("add");
  }

  _closeSettings() {
    othersView.spinSettingsIcon("remove");
    othersView.shrinkSections("remove");
    othersView.hideToolTip("visible");
    othersView.showSettings("remove");
    othersView.showOverlay("remove");
  }
}

export default new settingsView();
