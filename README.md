Page Ruler Chrome Extension

A lightweight Chrome extension that lets you measure and overlay guides directly on any webpage.
Click and drag to draw rulers, boxes, or lines, with live feedback for dimensions, spacing, and angles.

✨ Features
General

Activate via toolbar button or keyboard shortcut (Alt+G)

Select tools after activation:

R – Ruler

B – Box

V – Vertical lines

H – Horizontal lines

Press Esc to remove overlays or exit tools

Ruler

Click and drag to draw a ruler

Snap to 90° angles with Ctrl (or Command on Mac)

Live display of distance (px) and angle (°)

Box

Click and drag to create a rectangular box overlay

Semi-transparent white overlay (alpha 0.2) with dotted borders

Shows width and height on all four sides while dragging

Live tooltip follows the cursor showing current width and height

Vertical / Horizontal Lines

Overlay guides across the entire page

Lines are pink, alpha 0.4

Adjust thickness using keys 1–9 (0 = 10px)

Adjust spacing using [ ] keys (default 50px)

Quickly check alignment and spacing of page elements

🛠️ Local Setup

If you fork this repo and want to load the extension locally in Chrome:

Clone the repo

git clone https://github.com/your-username/page-ruler-extension.git
cd page-ruler-extension


Open Chrome Extensions page

Navigate to chrome://extensions/ in your browser

Enable Developer mode (toggle in the top-right corner)

Load the extension

Click Load unpacked

Select the folder containing this project (page-ruler-extension)

Test it

You’ll see a new extension icon in your toolbar

Click the icon or press Alt+G to activate the tool selector

Press R / B / V / H to choose a tool

Draw on any page and press Esc to remove it

Project Structure
page-ruler-extension/
├── manifest.json      # Extension config
├── background.js      # Handles activation & keyboard shortcut
├── content.js         # Ruler logic
├── box.js             # Box tool logic
├── vertical.js        # Vertical lines overlay
├── horizontal.js      # Horizontal lines overlay
├── selector.js        # Tool selection overlay
├── icon.png           # Toolbar icon (optional, replace with your own)
└── README.md