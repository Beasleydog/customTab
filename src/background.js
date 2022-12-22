importScripts("../backgroundScriptFunctions/imagesFromGooglePhotosAlbums.js");
importScripts("../backgroundScriptFunctions/getWeatherData.js");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   console.log(request);
   switch (request.type) {
      case "blockMessage":
         //Background has recieved a message from a block

         switch (request.data.blockType) {
            case "googlePhotosBlock":
               //Background has recieved a message from a Google Photos block

               switch (request.data.request) {
                  case "getAlbumPhotos":
                     //The Google Photos block wants us to get all the photos 📷 from some albums, ok!


                     imagesFromGooglePhotosAlbums(request.data.albumUrls, ((photos) => {
                        sendResponse(photos);
                     }));

                     return true;
                  default:
                     break;
               }
               break;
            case "weatherBlock":
               //Background has recieved a message from a weather block

               switch (request.data.request) {
                  case "getCurrentWeather":
                     //The weather block wants us to get the current weather, ok!
                     getCurrentWeather((weatherData) => {
                        sendResponse(weatherData);
                     });

                     return true;
                  default:
                     break;
               }
               break;
            default:
               break;
         }
         break;

      default:
         break;
   }
   return true;
});