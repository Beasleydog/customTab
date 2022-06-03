async function imagesFromGooglePhotosAlbums(urls, callback) {
    const results = [];
    const ids = urls.filter((url) => { return albumUrlRegex.test(url) }).map((url) => { return url.trim().replace("https://photos.app.goo.gl/", "") });
    for (var id of ids) {
        let urls = await getAlbum(id);
        urls.urls.forEach(x => {
            results.push(x);
        });
    };
    callback(results);
}

const albumUrlRegex = /https:\/\/photos\.app\.goo\.gl\/.*/gm
const photoRegex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;
const titleRegex = /<title>.*<\/title>/;

function extractPhotos(content) {
    const links = new Set();
    let match;
    while ((match = photoRegex.exec(content))) {
        links.add(match[1]);
    }
    return Array.from(links);
}

async function getAlbum(id) {
    let response = await fetchAlbum(id);
    let title = titleRegex.exec(response);
    if (title) {
        title = title[0];
        title = title
            .replace(/<title>/g, "")
            .replace(/<\/title>/g, "")
            .replace(/ - Google Photos/g, "");
    } else {
        title = undefined;
    }
    return {
        urls: extractPhotos(response),
        title: title,
        url: `https://photos.app.goo.gl/${id}`
    };
}

async function fetchAlbum(id) {
    let html = await fetch(`https://photos.app.goo.gl/${id}`, { credentials: "omit" });
    html = await html.text();
    return html;
}
