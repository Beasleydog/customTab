window.addEventListener("load", () => {
    if (new URLSearchParams(window.location.search).get("embedUrl")) {
        //We exist for only one purpose, embed a different calendar!
        document.body.innerHTML = (`
    <iframe style="width:100vw;height:100vh;top:0px;left:0px;position:fixed;border:none;" src="${new URLSearchParams(window.location.search).get("embedUrl")}"/>
    `)
    }
})