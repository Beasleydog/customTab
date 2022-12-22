async function imageToDataUrl(imageUrl) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(imageUrl)
        const imageBlob = await response.blob()
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

export default imageToDataUrl;