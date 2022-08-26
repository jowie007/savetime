// Initialize butotn with users's prefered color
const changeColor = document.getElementById("changeColor");

fetch(chrome.runtime.getURL("/report.html"))
  .then((r) => r.text())
  .then((html) => {
    document.body.insertAdjacentHTML("beforeend", html);
    // not using innerHTML as it would break js event listeners of the page
  });

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
