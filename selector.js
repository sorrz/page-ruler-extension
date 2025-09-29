(() => {
  if (window.__toolSelectorActive) return;
  window.__toolSelectorActive = true;

  function onKey(e) {
    const key = e.key.toLowerCase();
    let file = null;

    if (key === "r") file = "content.js";      // ruler
    if (key === "b") file = "box.js";          // box (to build next)
    if (key === "v") file = "vertical.js";     // vertical lines
    if (key === "h") file = "horizontal.js";   // horizontal lines

    if (file) {
      chrome.runtime.sendMessage({ run: file });
      cleanup();
    }
  }

  function cleanup() {
    window.removeEventListener("keydown", onKey, true);
    window.__toolSelectorActive = false;
  }

  window.addEventListener("keydown", onKey, true);

  console.log("Press R (Ruler), B (Box), V (Vertical), or H (Horizontal)");
})();
