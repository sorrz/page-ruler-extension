# Page Ruler Chrome Extension

A lightweight Chrome extension that lets you draw rulers directly on any webpage.  
Click and drag to measure pixel distances, hold **Ctrl** to snap lines to 90°, and press **Esc** or use the **Close** button to remove the ruler.

---

## ✨ Features
- Draw rulers by clicking and dragging across any webpage
- Snap to **90° angles** with Ctrl (or Command on Mac)
- See live **pixel distance** and **angle**
- Easy to close (Esc key or Close button)
- Works via toolbar button **or keyboard shortcut (Ctrl+G)**

---

## 🛠️ Local Setup

If you fork this repo and want to load the extension locally in Chrome:

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/page-ruler-extension.git
   cd page-ruler-extension

2. Open Chrome Extensions page

- Navigate to chrome://extensions/
 in your browser.

- Enable Developer mode (toggle in the top-right corner).

3. Load the extension

- Click Load unpacked.

- Select the folder containing this project (page-ruler-extension).

4. Test it

- You’ll see a new extension icon in your toolbar.

- Click the icon or press Ctrl+G to activate the ruler.

- Draw on any page and press Esc to remove it.

```bash
page-ruler-extension/
├── manifest.json   # Extension config
├── background.js   # Handles activation & keyboard shortcut
├── content.js      # Page ruler logic (injected into pages)
├── icon.png        # Toolbar icon (optional, replace with your own)
└── README.md
```