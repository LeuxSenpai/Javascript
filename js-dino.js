const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
let isJumping = false;
let score = 0;
let gameInterval;

document.addEventListener("keydown", () => {
    if (!isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    dino.style.bottom = '100px'; // jump height

    setTimeout(() => {
        dino.style.bottom = '0'; // back to ground
        isJumping = false;
    }, 300);
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.x < cactusRect.x + cactusRect.width &&
        dinoRect.x + dinoRect.width > cactusRect.x &&
        dinoRect.y < cactusRect.y + cactusRect.height &&
        dinoRect.y + dinoRect.height > cactusRect.y
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        resetGame();
    } else {
        score++;
        scoreDisplay.textContent = "Score: " + score;
    }
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    cactus.style.animation = 'none';
    cactus.offsetHeight; // trigger reflow
    cactus.style.animation = '';
}

gameInterval = setInterval(checkCollision, 100);
