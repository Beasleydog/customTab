document.addEventListener("DOMContentLoaded", function () {
    const bodyobserver = new MutationObserver(() => {
        console.log([...document.getElementsByClassName("event-summary")]);
        console.log(document.getElementById("eventContainer1"));
        if (document.getElementById("eventContainer1")) {
            //New events have been added to list
            console.log([...document.getElementsByClassName("event-summary")], [...document.getElementsByClassName("event-summary")].length);

            [...document.getElementsByClassName("event-summary")].forEach((x) => {
                console.log(x);
                x.onclick = function () {
                    window.top.location.replace(x.nextSibling.children[0].children[2].children[0].href);
                }
            });
        }
    });
    bodyobserver.observe(document.body, { childList: true, subtree: true, attributes: true });
});