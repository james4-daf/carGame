//grabbing canvas and setting the colour
let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#c1fafb";

// getting the paintbrush
let ctx = canvas.getContext("2d");
var timeout;

// The DOM of the start and the restart buttons
let startRaceBtn = document.querySelector("#startRace");
let restartRaceBtn = document.querySelector("#restartRace");
let raceTitle = document.querySelector("#raceTitle");
let winnerTitle = document.querySelector("#winnerTitle");
let crashTitle = document.querySelector("#crashTitle");

let instructions = document.querySelector(".instructions");

let oppositionCar = new Image();
oppositionCar.src = "./images/car.png";
let finishLineImg = new Image();
finishLineImg.src = "./images/finishLine.png";
// let oppCarX = 100;
// let oppCarY = 5;
let oppCars = [{ x: 100, y: 0 }];

let intervalID = null;
let raceIsOver = false;
let finishLineY = 0;

let carX = 230;

let carHeight = 80;
let carWidth = 50;

let isCarRight = false;
let isCarLeft = false;

let carPosition = 8;

function oppositionCarsMovement() {
  if (carPosition > 1) {
    for (i = 0; i < oppCars.length; i++) {
      ctx.drawImage(oppositionCar, oppCars[i].x, oppCars[i].y);
      oppCars[i].y = oppCars[i].y + 5;

      // CRASH LOGIC-TODO
      // if (oppCars[i].x < carX && oppCars[i].y == carHeight) {
      //   crash();
      // }
      // if (oppCars[i].y + oppCars[i].height > carX + carWidth) {
      //   crash();
      // }
      // if (canvas.height - carHeight + carWidth < oppCars[i].y + oppCars[i].height) {
      //   crash();
      // }
      if (oppCars[i].y > canvas.height) {
        //4,5,10 works cus of multiples of 620
        oppCars[i] = {
          x: Math.floor(Math.random() * (canvas.width - carWidth)),
          y: 0,
        };
      }
      if (oppCars[i].y == canvas.height - carHeight) {
        carPosition--;
      }
    }
  }

  if (carPosition == 1) {
    ctx.drawImage(finishLineImg, 0, finishLineY);
    //again
    finishLineY = finishLineY + 4;
    if (finishLineY == canvas.height - carHeight) {
      timeout = setTimeout(raceWon, 500);
    }
  }
}

function drawCar() {
  ctx.beginPath();
  ctx.fillStyle = "#34eb3d";
  ctx.fillRect(carX, canvas.height - carHeight, carWidth, carHeight);

  ctx.closePath();
  oppositionCarsMovement();
  //oppcanvas.height - carHeight = oppcanvas.height - carHeight + 5;
}

function gameAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();

  ctx.fillStyle = "red";
  ctx.font = "28px Roboto";
  ctx.fillText(`Position: ${carPosition}`, 360, 40);

  if (isCarRight) {
    if (carX + carWidth < canvas.width) {
      carX = carX + 5;
    }
  }
  if (isCarLeft) {
    if (carX > 0) {
      carX = carX - 5;
    }
  }
  //call it over again, recursion
  //mimics animation
  if (raceIsOver) {
    //when game is over, call this to cancel animation
    cancelAnimationFrame(intervalID);
    clearTimeout(timeout);
  } else {
    intervalID = requestAnimationFrame(gameAnimation);
  }
}

function startGame() {
  carPosition = 8;

  canvas.style.display = "block";
  startRaceBtn.style.display = "none";

  gameAnimation();
}

function raceWon() {
  raceIsOver = true;

  canvas.style.display = "none";
  startRaceBtn.style.display = "none";
  winnerTitle.style.display = "block";
  restartRaceBtn.style.display = "inline";
}

function crash() {
  raceIsOver = true;

  canvas.style.display = "none";
  startRaceBtn.style.display = "none";
  restartRaceBtn.style.display = "inline";

  crashTitle.style.display = "inline";
}

//adding event listeners
window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartRaceBtn.style.display = "none";
  winnerTitle.style.display = "none";
  crashTitle.style.display = "none";

  startRaceBtn.addEventListener("click", () => {
    raceTitle.style.display = "none";
    instructions.style.display = "none";
    startGame(); //TODO:move down when finished
    // do something when the user clicks the start button
  });

  restartRaceBtn.addEventListener("click", () => {
    raceIsOver = false;
    intervalID = null;
    // do something when the user clicks the restart button
    canvas.style.display = "block";
    startRaceBtn.style.display = "none";
    // canvas.style.display = "block";
    // startRaceBtn.style.display = "none";
    restartRaceBtn.style.display = "none";
    winnerTitle.style.display = "none";
    crashTitle.style.display = "none";

    oppCars = [{ x: 100, y: 0 }];

    intervalID = null;
    raceIsOver = false;
    finishLineY = 0;

    carX = 230;
    carHeight = 80;
    carWidth = 50;

    isCarRight = false;
    isCarLeft = false;

    carPosition = 8;
    //raceIsOver = false;
    startGame();
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
