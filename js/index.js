let width = 800;
let height = 600;
let numBoxes = 10;

function boxes() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let boxesArray = [];

  // Function to create multiple boxes based on user input
  function createBoxes(numBoxes) {
    boxesArray = [];
    for (let i = 0; i < numBoxes; i++) {
      boxesArray.push(createBox());
    }
  }

  document
    .getElementById("generateBoxes")
    .addEventListener("click", handleSubmit);

  // Function to create a single box with random properties
  function createBox() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const vX = Math.random() * 4 - 2;
    const vY = Math.random() * 4 - 2;

    const hue = Math.random() * 360;
    const saturation = 80 + Math.random() * 20;
    const lightness = 50 + Math.random() * 20;

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return {
      width: 20,
      height: 30,
      x: x,
      y: y,
      vX: vX,
      vY: vY,
      color: color,
    };
  }

  function drawBox(box) {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function moveBoxes() {
    clearCanvas();

    for (let i = 0; i < boxesArray.length; i++) {
      const boxA = boxesArray[i];
      boxA.x += boxA.vX;
      boxA.y += boxA.vY;

      // Bounce off canvas boundaries
      if (boxA.x + boxA.width > canvas.width || boxA.x < 0) {
        boxA.vX *= -1;
      }

      if (boxA.y + boxA.height > canvas.height || boxA.y < 0) {
        boxA.vY *= -1;
      }

      // Collision detection between boxes
      for (let j = i + 1; j < boxesArray.length; j++) {
        const boxB = boxesArray[j];
        if (
          boxA.x < boxB.x + boxB.width &&
          boxA.x + boxA.width > boxB.x &&
          boxA.y < boxB.y + boxB.height &&
          boxA.y + boxA.height > boxB.y
        ) {
          boxA.vX = -boxA.vX;
          boxA.vY = -boxA.vY;

          boxB.vX = -boxB.vX;
          boxB.vY = -boxB.vY;
        }
      }

      drawBox(boxA);
    }

    requestAnimationFrame(moveBoxes);
  }

  function handleSubmit() {
    createBoxes(document.getElementById("numBoxes").value || numBoxes);
    moveBoxes();
  }

  canvas.width = width;
  canvas.height = height;

  canvas.addEventListener("click", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    boxesArray.push(createBox(x, y));
  });

  createBoxes(numBoxes);
  moveBoxes();
}

window.onload = () => {
  boxes();
};
