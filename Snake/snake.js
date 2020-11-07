import { getInputDirection, inputDirection } from "./input.js";

export const snakeSpeed = 8;
export const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
    addSegments();

    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    for (let i = 0; i < snakeBody.length; i++) {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = snakeBody[i].y;
        snakeElement.style.gridColumnStart = snakeBody[i].x;
        if (i == 0)
            snakeElement.classList.add('head');
        else if (i == snakeBody.length - 1)
            snakeElement.classList.add('tail');
        else
            snakeElement.classList.add('snake');
        if (inputDirection.x == 1)
            snakeElement.style.transform = 'scaleX(-1)';
        else if (inputDirection.y == -1)
            snakeElement.style.transform = 'rotate(90deg)';
        else if (inputDirection.y == 1)
            snakeElement.style.transform = 'rotate(270deg)';
        gameBoard.appendChild(snakeElement);
    }
}

export function expandSnake(amount) {
    newSegments += amount;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0;
}