
let extentionState = 'off';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "runBackend") {
        runBackend();
    }
});

function runBackend() {
        extentionState = 'on';

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
            chrome.scripting.insertCSS({
                target: { tabId: tabs[0].id },
                files: ["styles/injected_style.css"]
            });
        });
}

function resetExtension() {
    runBackend();
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && extentionState == 'on') {
        resetExtension();
    }
});