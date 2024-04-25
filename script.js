const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();

const drawSegment = canvas.width / 10;
for (let i = 0; i < 11; i++) {
  var xPos = drawSegment * i;
  ctx.moveTo(xPos, 0);
  ctx.lineTo(xPos, rect.bottom);
  ctx.stroke();
}

const getMousePos = (e) => {
  // console.log(e);
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const mouseMove = (e) => {
  var coordinates = document.getElementById("coordinates");

  const posX = e.offsetX;
  const posY = e.offsetY;

  coordinates.innerText = `x: ${Math.round(posX)} y: ${Math.round(posY)}`;

  const grd = ctx.createLinearGradient(0, 0, 200, 0);
  grd.addColorStop(0, "yellow");
  ctx.fillStyle = grd;


  const curSegment = rect.left;
//   console.log(curSegment);
  ctx.fillRect(posX, 0, 10, rect.bottom);
};
