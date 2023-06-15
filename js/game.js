const dino = document.getElementById("game-dino");
const rock = document.getElementById("game-rock");
const score = document.getElementById("game-score");
const gameBox = document.getElementById("game");
const background = document.getElementById("game-background");
const gameOver = document.getElementById("game-end");
const winnerText = document.getElementById("game-winner");
const startScreen = document.getElementById("game-start");

let gameLoopInterval = 0;
const POINTS_TO_WIN = 100;

const startGame = () => {
  gameOver.classList.add("hidden");
  background.classList.add("bg-animation");
  rock.classList.add("rock-animation");
  startScreen.classList.add("hidden");
  resetScore();
  startGameLoop();
};

const resetScore = () => {
  score.innerText = 0;
};

const jump = () => {
  dino.classList.add("jump-animation");
  setTimeout(() => {
    dino.classList.remove("jump-animation");
  }, 500);
};

const dieAnimation = () => {
  dino.classList.add("dino-dies");
  return new Promise((resolve) =>
    setTimeout(() => {
      dino.classList.remove("dino-dies");
      resolve();
    }, 500)
  );
};

gameBox.addEventListener("click", (event) => {
  if (!gameLoopInterval) {
    startGame();
  } else {
    if (!dino.classList.contains("jump-animation")) {
      jump();
    }
  }
});

const stopGame = async () => {
  await dieAnimation();
  background.classList.remove("bg-animation");
  rock.classList.remove("rock-animation");
  startScreen.classList.remove("hidden");
  gameLoopInterval = clearInterval(gameLoopInterval);
  gameOver.classList.remove("hidden");
  if (Number(score.innerText) + 1 >= POINTS_TO_WIN) {
    winnerText.classList.remove("hidden");
  }
};

const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );
    const rockLeft = parseInt(
      window.getComputedStyle(rock).getPropertyValue("left")
    );

    score.innerText = Number(score.innerText) + 1;

    if (rockLeft < 0) {
      rock.classList.add("hidden");
    } else {
      rock.classList.remove("hidden");
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      stopGame();
    }
  }, 50);
};


