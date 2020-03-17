function loadImage(src) {
  return new Promise((res, rej) => {
    try {
      const img = document.createElement("img");
      img.crossOrigin = "Anonymous";
      img.addEventListener("load", () => {
        res(img);
        img.remove();
      });
      img.src = src;
    } catch (err) {
      rej(err);
    }
  });
}

export default loadImage;
