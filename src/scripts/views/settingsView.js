import othersView from "./othersView";

/**
 * Handles the views in the settings panel like its transitions.
 */ //prettier-ignore
class settingsView {
  _disableTransitionSetting = document.querySelector(".disable-transition-setting");
  _disableZoomSetting = document.querySelector(".disable-zoom-setting");
  _closeSettingsBtn = document.querySelector(".close-settings-btn");
  _darkModeSetting = document.querySelector(".dark-mode-setting");
  _cardZoomSetting = document.querySelector(".card-zoom-setting");
  _settingsList = document.querySelector(".settings-lists");
  _settingsBtn = document.querySelector(".sidebar-footer");

  /**
   * Attach event listeners in the settings and close settings button.
   */
  constructor() {
    this._settingsBtn.addEventListener("click", this._openSettings);
    this._closeSettingsBtn.addEventListener("click", this._closeSettings);
  }

  /**
   * Attaches event listener to the main section.
   * @param {function} handle - Function that controls what happens when button has been clicked.
   */
  addEventHandler(handle) {
    this._settingsList.addEventListener("click", handle);
  }

  /**
   * Toggles the button automatically when that button is already enabled in the user settings data.
   * @param {Object} data - Object that contains the data's of the settings.
   */
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

  /**
   * Renders the transitions when opening the settings panel.
   */
  _openSettings() {
    othersView.spinSettingsIcon("add");
    othersView.expandSidebar("remove");
    othersView.shrinkSections("add");
    othersView.hideToolTip("hidden");
    othersView.showSettings("add");
    othersView.showOverlay("add");
  }

  /**
   * Renders the transitions when closing the settings panel.
   */
  _closeSettings() {
    othersView.spinSettingsIcon("remove");
    othersView.shrinkSections("remove");
    othersView.hideToolTip("visible");
    othersView.showSettings("remove");
    othersView.showOverlay("remove");
  }
}

export default new settingsView();
