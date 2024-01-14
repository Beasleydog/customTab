/*global chrome*/


const UPDATING_LIST = {};
const PULLING_FROM_STORAGE = {};

export async function getCachedValue(key, willUpdateIfBad) {
    const query = `cachedValue${key}`;
    let response = {
        value: undefined,
        expired: false
    }
    if (PULLING_FROM_STORAGE[query]) {
        //Another process is pulling this same value from storge.
        //We have to wait until they're done so we can wait if they need to fix anything.
        await new Promise((res) => {
            let checkInterval = setInterval(async () => {
                if (!PULLING_FROM_STORAGE[query]) {
                    clearInterval(checkInterval);
                    res();
                }
            }, 50);
        })
    }
    if (UPDATING_LIST[query]) {
        //Another process tried to get this cached value but it failed.
        //They committed to fixing it so we must wait until they update.
        await new Promise((res) => {
            let checkInterval = setInterval(async () => {
                if (!UPDATING_LIST[query]) {
                    clearInterval(checkInterval);
                    res();
                }
            }, 500);
        })
    }

    PULLING_FROM_STORAGE[query] = true;
    let storageValue = await chrome.storage.local.get(query);
    PULLING_FROM_STORAGE[query] = false;
    if (storageValue[query]) {
        if (storageValue[query].invalTime < Date.now()) response.expired = true;

        if (storageValue[query]) response.value = storageValue[query].value;

    } else {
        if (willUpdateIfBad) {
            console.log("setting upating");
            UPDATING_LIST[query] = true;
        }
    }


    return response;
}
export function setCachedValue(key, value, ttl) {
    const query = `cachedValue${key}`;

    delete UPDATING_LIST[query];

    //ttl is in hours
    const valueObject = {
        value: value,
        invalTime: Date.now() + (ttl * 60 * 60 * 1000)
    };
    chrome.storage.local.set({ [query]: valueObject });
}
export function clearCache() {
    const cacheCheck = 'cachedValue';
    chrome.storage.local.get(null, function (items) {
        var allKeys = Object.keys(items);
        var keysToRemove = allKeys.filter(key => key.includes(cacheCheck));
        chrome.storage.local.remove(keysToRemove);
    });
}
export const CACHED_KEYS = {
    GOOGLE_ALBUMS: "GOOGLE_ALBUMS",
    WEATHER: "WEATHER",
}