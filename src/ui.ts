import ejs from "ejs";
import TEMPLATE_UI_DIALOG from "./uiDialog.html" with { type: "text" };

const templateUiDialog = ejs.compile(TEMPLATE_UI_DIALOG);

type DialogContent = string | Element | DocumentFragment;
type DialogConfig = {
  ok?: boolean | ((e: MouseEvent) => void);
  cancel?: boolean | ((e: MouseEvent) => void);
  important?: boolean;
};

type Dialog = {
  content: DialogContent;
  config: DialogConfig;
};

const DIALOG_QUEUE: Dialog[] = [];

/**
 * Open a dialog window that can have a predefined ok button (default) and/or
 * cancel button. The properties object specifies dialog behavior and has the
 * following values:
 *
 * - ok/cancel: true to display the button, false to hide the button,
 * function to display the button and specify a custom function for it
 * - important: true to prioritize a dialog if it goes in the queue, false to
 * allow a dialog to go to the end of the queue as normal
 */
export function showDialog(content: DialogContent, config: DialogConfig = {}) {
  const showOk = config.ok === undefined ? true : !!config.ok;
  const showCancel = config.cancel === undefined ? false : !!config.cancel;
  const important = config.important === undefined ? false : config.important;

  // Queue the dialog window if one is already open.
  if (document.getElementById(`bbb-dialog-blocker`)) {
    if (important) {
      DIALOG_QUEUE.unshift({ content, config });
    } else {
      DIALOG_QUEUE.push({ content, config });
    }

    return;
  }

  // Create base elements
  const root = document.createElement("div");
  root.innerHTML = templateUiDialog({ showOk, showCancel });

  // Insert content into the window
  root.querySelectorAll(`[data-content]`).forEach((el) => {
    if (typeof content === "string") {
      el.innerHTML = content;
    } else {
      el.appendChild(content);
    }
    el.removeAttribute(`data-content`);
  });

  // Add event listeners for stuff
  Array.from(root.querySelectorAll(`[data-listener-buttons]`)).forEach((el) => {
    // Only allow left clicks to trigger the prompt buttons.
    el.addEventListener(
      "click",
      (_e) => {
        const e = _e as MouseEvent;
        if (e.button !== 0) {
          e.stopPropagation();
        }
      },
      false,
    );
    el.removeAttribute(`data-listener-buttons`);
  });

  let okButton = null;
  Array.from(root.querySelectorAll(`[data-listener-ok]`)).forEach((el) => {
    okButton = el;
    if (typeof config.ok === "function") {
      el.addEventListener("click", config.ok as (e: Event) => void, false);
    }
    el.addEventListener("click", onCloseDialog, false);
    el.removeAttribute(`data-listener-ok`);
  });

  let cancelButton = null;
  Array.from(root.querySelectorAll(`[data-listener-cancel]`)).forEach((el) => {
    cancelButton = el;
    if (typeof config.cancel === "function") {
      el.addEventListener("click", config.cancel as (e: Event) => void, false);
    }
    el.addEventListener("click", onCloseDialog, false);
    el.removeAttribute(`data-listener-cancel`);
  });

  // Add dialog to page
  const dialog = root.children[0];
  document.body.appendChild(dialog);

  // Focus on the dialog
  const windowDiv = dialog.querySelector(`#bbb-dialog-window`);
  if (windowDiv === null)
    throw new Error("failed to find '#bbb-dialog-window' in dialog window");

  ((okButton || cancelButton || windowDiv) as HTMLElement).focus();
}

function onCloseDialog(event: Event) {
  // Close the current dialog window.
  const dialogBlocker = document.getElementById("bbb-dialog-blocker");
  if (dialogBlocker) document.body.removeChild(dialogBlocker);

  // Open the next queued dialog window.
  {
    const nextDialog = DIALOG_QUEUE.shift();
    if (nextDialog) showDialog(nextDialog.content, nextDialog.config);
  }

  event.preventDefault();
}
