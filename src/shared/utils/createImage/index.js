export default function([width, height], rgba) {
  const canvas = document.createElement("canvas");
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  if (ctx) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${rgba.join(",")})`;
    ctx.fillRect(0, 0, width, height);
  }
  return canvas;
}
