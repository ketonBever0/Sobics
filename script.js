var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const segments = 10;
const segmentWidth = canvas.width / segments;

var segmentIndex = 0;

const mouseMove = (e) => {
  var rect = canvas.getBoundingClientRect();
  var mouseX = e.clientX - rect.left;
  var mouseY = e.clientY - rect.top;

  segmentIndex = Math.floor(mouseX / segmentWidth);

  // document.getElementById("coordinates").innerText = `${mouseX} : ${mouseY}`;

  // drawSegments();

  ctx.fillStyle = "white";
  for (var i = 0; i < segments; i++) {
    ctx.fillRect(
      i * segmentWidth,
      canvas.height - canvas.height / 5,
      segmentWidth,
      canvas.height
    );
  }
  ctx.fillStyle = "beige";
  ctx.fillRect(
    segmentIndex * segmentWidth,
    canvas.height - canvas.height / 5,
    segmentWidth,
    canvas.height
  );

  // ctx.fillRect(segmentIndex * segmentWidth, 0, segmentWidth, canvas.height);
};

const drawSegments = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  for (var i = 0; i < segments; i++) {
    ctx.fillRect(i * segmentWidth, 0, segmentWidth, canvas.height);
  }
};

drawSegments();

var score = 0;
document.getElementById("score").innerText = score;

let blocks = ["red", "yellow", "blue", "orange", "WALL", "DYNAMITE"];

var maxHandCapacity = 3;
let inHand = [];
var handFill = false;

const maxLines = 10;
const startLines = 3;

let placed = [];
for (let i = 0; i < segments; i++) {
  placed[i] = [];
}

for (let i = 0; i < segments; i++) {
  for (let j = 0; j < maxLines; j++) {
    if (j > startLines - 1) {
      placed[i][j] = "NONE";
      continue;
    }
    placed[i][j] = blocks[Math.floor(Math.random() * (blocks.length - 1)) + 1];
  }
}

const handleClick = () => {
  // console.log(`${segmentIndex + 1}. oszlop:`);
  // for (let j = 0; j < startLines; j++) {
  //   console.log(placed[segmentIndex][j]);
  // }

  // A reversed() megfordítja az eredetit is, ha csak placed[segmentIndex].reversed() lenne, így nem.
  // console.log(placed[segmentIndex]);
  // console.log(reversed);
  var placedCount = 0;
  if (inHand.length > 0) {
    for (let j = 0; j < placed[segmentIndex].length; j++) {
      if (inHand.length > 0) {
        if (placed[segmentIndex][j] == "NONE") {
          placed[segmentIndex][j] = inHand.pop();
          placedCount++;
        }
      } else break;
    }
    for (let i = 0; i < placed.length; i++) {
      // console.log(placed[i]);
      // new line after every block placement
      placed[i].unshift(
        blocks[Math.floor(Math.random() * (blocks.length - 1)) + 1]
      );
    }
    // inHand = [];
  } else {
    var reversed = [...placed[segmentIndex]].reverse();
    let first = null;
    for (let j = 0; j < reversed.length; j++) {
      if (reversed[j] == "NONE" || reversed[j] == null) continue;
      if (reversed[j] == "WALL") break;

      if (first == null) first = reversed[j];

      if (first == reversed[j]) {
        inHand.push(reversed[j]);
        reversed[j] = "NONE";
        if (first == "DYNAMITE") break;
      } else {
        break;
      }
    }
    placed[segmentIndex] = [...reversed].reverse();
  }

  // console.log([...placed[segmentIndex]].reverse());
  // console.log(inHand);
  drawSegmentsWithSquares();

  //  if 4 or more blocks
  if (inHand.length == 0) {
    var reversed = [...placed[segmentIndex]].reverse();

    // for (let j = 0; j < reversed.length; j++) {
    //   if (reversed[j] == "NONE" || reversed[j] == null) continue;

    //   while (placedCount > 0) {
    //     placedCount--;
    //     continue;
    //   }

    //   if (placedName != "" && placedName == reversed[j]) {

    //   }

    // }

    let bottom = null;
    var sameBlockStackNum = 0;
    let dynamitePos = null;
    for (let j = 0; j < reversed.length; j++) {
      if (reversed[j] == "NONE" || reversed[j] == null) continue;

      if (bottom == null) {
        bottom = reversed[j];
        // sameBlockStackNum++;

        if (bottom == "DYNAMITE") {
          dynamitePos = j;
          break;
        }
      }

      if (reversed[j] == bottom) {
        sameBlockStackNum++;
      } else {
        break;
      }
    }

    if (sameBlockStackNum >= 4) {
      for (let j = 0; j < reversed.length; j++) {
        if (reversed[j] == "NONE" || reversed[j] == null) continue;
        // console.log(sameBlockStackNum);
        reversed[j] = "NONE";
        sameBlockStackNum--;
        score += 25;
        document.getElementById("score").innerText = score;
        if (sameBlockStackNum == 0) break;
      }
    }
    placed[segmentIndex] = [...reversed].reverse();
    drawSegmentsWithSquares();
  }
};

const dynamiteExplosion = (at) => {
  
};

function drawSegmentsWithSquares() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "gray";
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < maxLines; j++) {
      let x = i * segmentWidth;
      let y = j * segmentWidth;
      let size = segmentWidth;

      switch (placed[i][j]) {
        case "DYNAMITE": {
          ctx.fillStyle = "pink";
          break;
        }
        case "WALL": {
          ctx.fillStyle = "black";
          break;
        }
        case "NONE": {
          ctx.fillStyle = "white";
          break;
        }
        default: {
          ctx.fillStyle = placed[i][j];
          break;
        }
      }
      ctx.fillRect(x, y / 2, size, size / 2);
    }
  }
}

drawSegmentsWithSquares();
