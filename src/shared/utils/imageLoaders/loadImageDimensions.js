function loadImageDimensions(src) {
  return new Promise((res, rej) => {
    try {
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.addEventListener("load", () => {
        res({ width: img.naturalWidth, height: img.naturalHeight });
        img.remove();
      });
      img.src = src;
    } catch (err) {
      rej(err);
    }
  });
}

export default loadImageDimensions;
