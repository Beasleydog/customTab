importScripts("../backgroundScriptFunctions/imagesFromGooglePhotosAlbums.js");
chrome.tabs.create({ url: "chrome-extension://bfcogglfdfondfagblhoafbfjalnnomc/index.html" })

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   console.log(request)
   switch (request.type) {
      case "blockMessage":
         //Background has recieved a message from a block

         switch (request.data.blockType) {
            case "googlePhotosBlock":
               //Background has recieved a message from a Google Photos block

               switch (request.data.request) {
                  case "getAlbumPhotos":
                     //The Google Photos block wants us to get all the photos 📷 from some albums, ok!
                     console.log("getting urls");
                     imagesFromGooglePhotosAlbums(request.data.albumUrls, ((photos) => {
                        console.log("sending")
                        sendResponse(photos);
                     }));

                     return true;
                     break;

                  default:
                     break;
               }
               break;
            default:
         }
         break;

      default:
         break;
   }
});