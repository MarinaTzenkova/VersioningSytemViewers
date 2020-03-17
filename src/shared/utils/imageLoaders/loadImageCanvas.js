function loadImageCanvas(src, size, c) {
  return new Promise(res => {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      canvas.style.display = "none";
      canvas.height = size[1];
      canvas.width = size[0];
      const ctx = canvas.getContext("2d");
      canvas.id = "canvas-original-image";
      document.body.appendChild(canvas);
      img.remove();
      ctx.drawImage(img, 0, 0, size[0], size[1]);
      res({ channel: c, data: ctx.getImageData(0, 0, size[0], size[1]).data });
      canvas.remove();
    });
    img.src = src;
  });
}

export default loadImageCanvas;
