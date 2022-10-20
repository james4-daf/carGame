//grabbing canvas and setting the colour
let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#c1fafb";
canvas.style.border = "2px solid black";

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

//IMAGES
let road = new Image();
road.src = "./images/road2.png";

//canvas.style.backgroundImage = road;
let redTrafficLight = new Image();
redTrafficLight.src = "./images/traffic-light-red.jpg";

let amberTrafficLight = new Image();
amberTrafficLight.src = "./images/traffic-light-red-amber.jpg";

let greenTrafficLight = new Image();
greenTrafficLight.src = "./images/traffic-light-green.jpg";

let oppositionCar = new Image();
oppositionCar.src = "./images/car.png";

let userCar = new Image();
userCar.src = "./images/userCar.png";
let finishLineImg = new Image();
finishLineImg.src = "./images/finishLine.png";

//sounds
let trafficlightSound = new Audio();
trafficlightSound.src = "./audio/trafficLights.mp3";
trafficlightSound.volume = 0.1;

let carCrashSound = new Audio();
carCrashSound.src = "./audio/Car Crash Sound Effect.mp3";
carCrashSound.volume = 0.1;

let winnerSound = new Audio();
winnerSound.src = "./audio/WinningSound.mp3";
winnerSound.volume = 0.3;
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
      ctx.drawImage(oppositionCar, oppCars[i].x, oppCars[i].y, 50, 80);
      oppCars[i].y = oppCars[i].y + 5;
      //console.log(oppCars[i].y + oppositionCar.height);
      //console.log(carX);
      //console.log(carX + carWidth);

      // CRASH LOGIC

      if (
        oppCars[i].y + oppositionCar.height >
        canvas.height - carHeight + carWidth
      ) {
        if (
          oppCars[i].x < carX + carWidth &&
          oppCars[i].x + carWidth > carX &&
          oppCars[i].y < canvas.height &&
          oppCars[i].y + carHeight > canvas.height - carHeight
          // &&
          // oppCars[i].y > canvas.height - carHeight &&
          // oppCars[i].y < carX + carHeight
        ) {
          carCrashSound.play();
          crash();
        }
      }

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
      winnerSound.play();
    }
  }
}

function drawRedTrafficLight() {
  ctx.drawImage(redTrafficLight, 170, 200);
  redTrafficLight.style.display = "block";
}

function drawAmberTrafficLight() {
  ctx.drawImage(amberTrafficLight, 170, 200);
  amberTrafficLight.style.display = "block";
}

function drawGreenTrafficLight() {
  ctx.drawImage(greenTrafficLight, 170, 200);
  greenTrafficLight.style.display = "block";
}

// function drawTrafficLight(trafficlight) {
//   ctx.drawImage(trafficlight, 170, 200);
//   trafficlight.style.display = "block";
// }

function clearTrafficLights() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //redTrafficLight.style.display = "none";
}

function drawCar() {
  ctx.drawImage(road, 0, 0, 500, 700);
  ctx.drawImage(userCar, carX, canvas.height - carHeight, carWidth, carHeight);
  oppositionCarsMovement();
}

function gameAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();

  ctx.fillStyle = "orange";
  ctx.font = "bold 28px serif";
  ctx.fillText(`Position: ${carPosition}`, 300, 40);

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
  //road.style.display = "block";

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
  //ctx.drawImage(road, 0, 0);
  canvas.style.display = "none";
  restartRaceBtn.style.display = "none";
  winnerTitle.style.display = "none";
  crashTitle.style.display = "none";

  startRaceBtn.addEventListener("click", () => {
    raceTitle.style.display = "none";
    instructions.style.display = "none";
    trafficlightSound.play();
    drawRedTrafficLight();
    setTimeout(drawAmberTrafficLight, 1100);
    setTimeout(drawGreenTrafficLight, 3100);
    canvas.style.display = "block";
    startRaceBtn.style.display = "none";
    setTimeout(clearTrafficLights, 1000);
    setTimeout(clearTrafficLights, 3000);
    setTimeout(clearTrafficLights, 4600);
    setTimeout(startGame, 4700);
    // startGame(); //TODO:move down when finished
    // do something when the user clicks the start button
  });

  restartRaceBtn.addEventListener("click", () => {
    raceIsOver = false;
    intervalID = null;
    // do something when the user clicks the restart button
    clearTrafficLights();
    trafficlightSound.play();
    drawRedTrafficLight();
    setTimeout(drawAmberTrafficLight, 1500);
    setTimeout(drawGreenTrafficLight, 3500);
    canvas.style.display = "block";
    startRaceBtn.style.display = "none";
    setTimeout(clearTrafficLights, 1400);
    setTimeout(clearTrafficLights, 3400);
    setTimeout(clearTrafficLights, 4600);
    setTimeout(startGame, 4700);
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
