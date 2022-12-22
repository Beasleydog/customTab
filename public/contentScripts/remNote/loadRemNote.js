window.addEventListener("load", () => {
    let loadFrameScript = document.createElement('script');
    loadFrameScript.src = chrome.runtime.getURL('/contentScripts/remNote/loadIframe.js');
    loadFrameScript.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(loadFrameScript);
})