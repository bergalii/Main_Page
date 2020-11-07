import { snakeBody, expandSnake } from './snake.js'
const expansionRate = 1;
let food = { x: 0, y: 0 };
createFood();
export function update() {

    if (snakeBody[0].x == food.x && snakeBody[0].y == food.y) {
        console.log('ok')
        expandSnake(expansionRate);
        createFood();
        food.x = Math.floor(Math.random() * 21 + 1);
        food.y = Math.floor(Math.random() * 21 + 1);
    }

}

export function draw(gameBoard) {

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);

}

function createFood() {
    food.x = Math.floor(Math.random() * 21 + 1);
    food.y = Math.floor(Math.random() * 21 + 1);
    snakeBody.forEach(segment => {
        if (segment.x == food.x && segment.y == food.y) {
            createFood();
        }

    })
}