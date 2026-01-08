
let extentionState = 'off';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "runBackend") {
        if (extentionState == 'off'){
            runBackend();
            extentionState = 'on';
        } else if (extentionState == 'on'){
            extentionState = 'off';
        }
    }
});

function runBackend() {


        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["scripts/data_collector.js"]
            });
            chrome.scripting.insertCSS({
                target: { tabId: tabs[0].id },
                files: ["styles/injected_style.css"]
            });
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["scripts/element_creator.js"]
            });
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["scripts/player.js"]
            });
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["scripts/clock.js"]
            });

        });
}

function resetExtension() {
    if (extentionState == 'on'){
    runBackend();
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") { // && extentionState == 'on'
        resetExtension();
    }
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "SAVE_PAGE_HTML") {
//     chrome.storage.local.set({
//       savedPage: message.html
//     });
//   }
// });

// Helper: Convert HTML → plain text
function htmlToText(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
}

// Helper: Normalize text → words
function extractWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ") // remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 1);
}

// Helper: Find common words between two arrays
function commonWordsArray(htmlA, htmlB) {
  const wordsA = new Set(extractWords(htmlToText(htmlA)));
  const wordsB = new Set(extractWords(htmlToText(htmlB)));
  return [...wordsA].filter(word => wordsB.has(word));
}

// Listen for save messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SAVE_PAGE_HTML") {
    // Step 1: Get current new page
    chrome.storage.local.get("savedPage_new", (items) => {
      const currentNew = items.savedPage_new;

      const updates = {};

      // Step 2: Move current new → old
      if (currentNew) {
        updates.savedPage_old = currentNew;

        // Step 3: Compare old vs new for common words
        updates.commonWords = commonWordsArray(currentNew, message.html);
      } else {
        updates.commonWords = []; // first page has no previous
      }

      // Step 4: Save incoming page as new
      updates.savedPage_new = message.html;

      // Step 5: Store all updates
      chrome.storage.local.set(updates, () => {
      });
    });
  }
});

