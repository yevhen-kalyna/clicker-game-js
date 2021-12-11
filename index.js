var timeInput = document.getElementById("game-time");
var gameBoard = document.getElementById("game");
var startButton = document.getElementById("start");

var timeHeader = document.getElementById("time-header");
var seconds = document.getElementById("time");

var resultHeader = document.getElementById("result-header");
var result = document.getElementById("result");

const SQUARE_SIZES = ["30px", "40px", "60px"];
const SQUARE_COLORS = ["red", "blue", "black", "yellow"];
const GAMEBOARD_RECTANGLE = gameBoard.getBoundingClientRect();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function return random position of x and y in GAMEBOARD_RECTANGLE coordinates
function randomPosition(square) {
  var minWidth = 0;
  var maxWidth = GAMEBOARD_RECTANGLE.width - parseInt(square.style.width, 10);
  var minHeight = 0;
  var maxHeight =
    GAMEBOARD_RECTANGLE.height - parseInt(square.style.height, 10);
  var position = {
    left: getRandomInt(minWidth, maxWidth).toString(),
    top: getRandomInt(minHeight, maxHeight).toString(),
  };

  return position;
}

function randomSize() {
  return SQUARE_SIZES[Math.floor(Math.random() * SQUARE_SIZES.length)];
}

function randomColor() {
  return SQUARE_COLORS[Math.floor(Math.random() * SQUARE_COLORS.length)];
}

function hideButton(button) {
  if (button.style.display === "none") {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

function startTimer() {
  hideButton(startButton);
	seconds = parseFloat(timeInput.value)
  gameBoard.style.backgroundColor = "white";
  var timer = setInterval(function () {
    if (seconds <= 0) {
      clearInterval(timer);
      squares = document.querySelectorAll("#square");
      Array.prototype.forEach.call(squares, function (node) {
        node.parentNode.removeChild(node);
      });
      gameBoard.style.backgroundColor = "#ccc";
      hideButton(startButton);

			timeHeader.classList.add('hide');;
			resultHeader.classList.remove('hide');;

			score = localStorage.getItem("score")
			result.innerText = score
    } else {
      time.innerText = seconds.toFixed(1);
    }
    seconds -= 0.1;
  }, 100);
}

function generateSquare() {
  square = document.createElement("div");
  square.setAttribute("id", "square");
  square.style.background = randomColor();
  square.style.height = randomSize();
  square.style.width = randomSize();
  position = randomPosition(square);

  square.style.left = position.left + "px";
  square.style.top = position.top + "px";
  square.style.position = "absolute";

  square.addEventListener("click", function () {
    this.remove();
		score = localStorage.getItem("score")
		localStorage.setItem("score", parseInt(score)+1)
    square = generateSquare();
  });

  gameBoard.appendChild(square);
  return square;
}

timeInput.addEventListener("click", function (event) {
  timeInput.value = event.target.value;
  seconds.innerText = event.target.value + '.' + 0;
});

startButton.addEventListener("click", function () {
  startTimer();
  square = generateSquare();
	localStorage.setItem("score", 0)
	timeHeader.classList.remove('hide');;
	resultHeader.classList.add('hide');;
	seconds.innerText = seconds;
});
