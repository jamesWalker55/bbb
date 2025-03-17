import ejs from "ejs";
import TEMPLATE_UI_DIALOG from "./uiDialog.html" with { type: "text" };

function takeElement<T extends `data-${string}`>(
  root: Element,
  attr: T,
): Element {
  const el = root.querySelector(`[${attr}]`);
  if (!el)
    throw new Error(`Failed to retrieve element [${attr}] from template`);

  el.removeAttribute(attr);

  return el;
}

function tryTakeElement<T extends `data-${string}`>(
  root: Element,
  attr: T,
): Element | null {
  const el = root.querySelector(`[${attr}]`);
  if (!el) return null;

  el.removeAttribute(attr);

  return el;
}

function takeElements<T extends `data-${string}`>(root: Element, attr: T) {
  // this NodeList is static
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
  const els = root.querySelectorAll(`[${attr}]`);
  els.forEach((x) => x.removeAttribute(attr));
  return Array.from(els);
}

function assertAllElementsTaken(root: Element) {
  root.querySelectorAll(`*`).forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      if (attr.name.startsWith("data-")) {
        throw new Error(
          `Template contains unused 'data' attribute: ${attr.name}`,
        );
      }
    }
  });
}

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
  const contentWrapper = takeElement(root, "data-content");
  if (typeof content === "string") {
    contentWrapper.innerHTML = content;
  } else {
    contentWrapper.appendChild(content);
  }

  // Add event listeners for stuff
  const buttonsContainer = takeElement(root, "data-listener-buttons");
  buttonsContainer.addEventListener(
    "click",
    (_e) => {
      // Only allow left clicks to trigger the prompt buttons.
      const e = _e as MouseEvent;
      if (e.button !== 0) {
        e.stopPropagation();
      }
    },
    false,
  );

  const okButton = tryTakeElement(root, "data-listener-ok");
  if (okButton) {
    if (typeof config.ok === "function") {
      okButton.addEventListener(
        "click",
        config.ok as (e: Event) => void,
        false,
      );
    }
    okButton.addEventListener("click", onCloseDialog, false);
  }

  const cancelButton = tryTakeElement(root, "data-listener-cancel");
  if (cancelButton) {
    if (typeof config.cancel === "function") {
      cancelButton.addEventListener(
        "click",
        config.cancel as (e: Event) => void,
        false,
      );
    }
    cancelButton.addEventListener("click", onCloseDialog, false);
  }

  // Add dialog to page
  const dialog = root.children[0];
  document.body.appendChild(dialog);

  // Focus on the dialog
  const windowDiv = takeElement(dialog, "data-dialog-window");
  ((okButton || cancelButton || windowDiv) as HTMLElement).focus();

  // Sanity check
  assertAllElementsTaken(dialog);
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
