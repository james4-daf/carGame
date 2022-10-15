//grabbing canvas and setting the colour
let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#c1fafb";

// getting the paintbrush
let ctx = canvas.getContext("2d");

// The DOM of the start and the restart buttons
let startRaceBtn = document.querySelector("#startRace");
let restartRaceBtn = document.querySelector("#restartRace");

let intervalID = null;
let raceIsOver = false;

let carX = 230;
let carHeight = 80;
let carWidth = 50;

let isCarRight = false;
let isCarLeft = false;

function drawCar() {
  ctx.beginPath();
  ctx.fillStyle = "#34eb3d";
  ctx.fillRect(carX, canvas.height - carHeight, carWidth, carHeight);
  ctx.closePath();
}

function gameAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();

  if (isCarRight) {
    carX = carX + 5;
  }
  if (isCarLeft) {
    carX = carX - 5;
  }
  //call it over again, recursion
  //mimics animation
  intervalID = requestAnimationFrame(gameAnimation);
  if (raceIsOver) {
    //when game is over, call this to cancel animation
    cancelAnimationFrame(intervalID);
  }
}

function startGame() {
  canvas.style.display = "block";
  startRaceBtn.style.display = "none";
  gameAnimation();
}

//adding event listeners
window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartRaceBtn.style.display = "none";
  startGame(); //TODO:move down when finished
  startRaceBtn.addEventListener("click", () => {
    // do something when the user clicks the start button
  });

  restartRaceBtn.addEventListener("click", () => {
    // do something when the user clicks the restart button
    // canvas.style.display = "inline";
    // startRaceBtn.style.display = "none";
    // restartRaceBtn.style.display = "inline";
  });

  document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowRight") {
      isCarRight = true;
      isCarLeft = false;
    }
    if (event.code == "ArrowLeft") {
      isCarRight = false;
      isCarLeft = true;
    }
    // console.log(event);
  });

  document.addEventListener("keyup", () => {
    isCarRight = false;
    isCarLeft = false;
  });
});
