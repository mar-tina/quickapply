chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message == "changeColor") {
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="orange"'
    });
  }
});
