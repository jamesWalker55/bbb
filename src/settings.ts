import Cookies from "js-cookie";

export namespace Settings {
  /** Erase user settings (just the `bbb_settings` user data) */
  export function erase() {
    GM_deleteValue("bbb_settings");
  }

  /** Try to erase everything. */
  export function eraseAll() {
    // userscript user data
    for (const key of GM_listValues()) {
      GM_deleteValue(key);
    }

    // local storage
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith("bbb_")) continue;

      localStorage.removeItem(key);
    }

    // session storage
    for (const key of Object.keys(sessionStorage)) {
      if (!key.startsWith("bbb_")) continue;

      sessionStorage.removeItem(key);
    }

    // cookies
    for (const key of Object.keys(Cookies.get())) {
      if (!key.startsWith("bbb_")) continue;

      Cookies.remove(key);
    }
  }
}
