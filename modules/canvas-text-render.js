const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.scale(2, 2);
canvas.height = 14;
canvas.width = 10;

export default function draw(character, fontFamily) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `8px ${fontFamily} bold`;
  ctx.fillText(character, 0, 12);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  return pixels;
}
