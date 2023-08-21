export const getFileSrc = (blob:File) => {
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
}