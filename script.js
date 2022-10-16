//grabbing canvas and setting the colour
let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#c1fafb";

// getting the paintbrush
let ctx = canvas.getContext("2d");

// The DOM of the start and the restart buttons
let startRaceBtn = document.querySelector("#startRace");
let restartRaceBtn = document.querySelector("#restartRace");
let raceTitle = document.querySelector("#raceTitle");
let winnerTitle = document.querySelector("#winnerTitle");

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

let carPosition = 3;

// function finishLine() {
//   ctx.drawImage(finishLineImg, oppCars[i].x, oppCars[i].y);
// }

function oppositionCarsMovement() {
  if (carPosition != 1) {
    for (i = 0; i < oppCars.length; i++) {
      ctx.drawImage(oppositionCar, oppCars[i].x, oppCars[i].y);
      oppCars[i].y = oppCars[i].y + 10;
      //4,5,10 works cus of multiples of 620
      if (oppCars[i].y > canvas.height) {
        oppCars[i] = {
          x: Math.floor(Math.random() * canvas.width),
          y: 0,
        };
      }
      if (oppCars[i].y == canvas.height - carHeight) {
        carPosition--;
      }
    }
  } else {
    ctx.drawImage(finishLineImg, 0, finishLineY);
    //again
    finishLineY = finishLineY + 4;
    if (finishLineY == canvas.height - carHeight) {
      setTimeout(gameOver, 500);
      //gameOver();
    }
  }
}

function drawCar() {
  ctx.beginPath();
  ctx.fillStyle = "#34eb3d";
  ctx.fillRect(carX, canvas.height - carHeight, carWidth, carHeight);

  ctx.closePath();
  oppositionCarsMovement();
  //oppCarY = oppCarY + 5;
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
  } else {
    intervalID = requestAnimationFrame(gameAnimation);
  }
}

function startGame() {
  carPosition = 3;

  canvas.style.display = "block";
  startRaceBtn.style.display = "none";

  gameAnimation();
}

function gameOver() {
  raceIsOver = true;

  canvas.style.display = "none";
  startRaceBtn.style.display = "none";
  restartRaceBtn.style.display = "inline";
  winnerTitle.style.display = "block";
}

//adding event listeners
window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartRaceBtn.style.display = "none";
  winnerTitle.style.display = "none";
  startRaceBtn.addEventListener("click", () => {
    raceTitle.style.display = "none";
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
