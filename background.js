// Listen for keyboard shortcut Alt+G
chrome.commands.onCommand.addListener((command) => {
  if (command === "activate-ruler") {   // ✅ now matches manifest
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id !== undefined) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["selector.js"] // waits for tool key
        });
      }
    });
  }
});


chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.run) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: [msg.run]
    });
  }
});