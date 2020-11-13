import { update as updateSnake, draw as drawSnake, snakeSpeed, snakeBody } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'


let lastRenderTime = 0;
let gameOver = false;
let gridSize = 21;
const gameBoard = document.getElementById('game-board');



function main(currentTime) {
    if (gameOver)
        return gameEnd()

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime;

    gameBoard.innerHTML = '';
    updateFood();
    drawFood(gameBoard);
    updateSnake();
    drawSnake(gameBoard);
    checkDeath();

}



function checkDeath() {
    let snakeHead = snakeBody[0];
    for (let i = 1; i <= snakeBody.length - 1; i++) {
        if (snakeBody[i].x == snakeHead.x && snakeBody[i].y == snakeHead.y)
            gameOver = true;
    }
    if (snakeHead.x < 1 || snakeHead.x > gridSize || snakeHead.y < 1 || snakeHead.y > gridSize)
        gameOver = true;

}

function gameEnd() {
    if (confirm('You lose!Confirm to restart.'))
        location.reload();
}


window.addEventListener('keydown', e => {
    if (e.keyCode == 32) {
        window.requestAnimationFrame(main);
    }

});