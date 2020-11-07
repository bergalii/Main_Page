var lose,
    draw,
    win;
var playerCombos = [];
var aiCombos = [];
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
];


const cells = document.querySelectorAll('.cell');

//Setting the Game;
(function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            if (e.target.textContent === '') {
                playerCombos.push(parseInt(e.target.id));
                e.target.textContent = 'O';
                checkWin();
                aiPlay();
            }
        })
    })
})();

function clickEvent(e) {
    if (e.target.textContent === '') {
        playerCombos.push(parseInt(e.target.id));
        e.target.textContent = 'O';
        aiPlay();
        checkWin();
    }
};

function reset() {
    document.querySelector('.text').innerHTML = '';
    playerCombos = [];
    aiCombos = [];
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.color = 'black';
        cell.addEventListener("click", clickEvent, true);
    })
}



function aiPlay() {
    let rand = Math.floor(Math.random() * 9);
    let cell = document.getElementById(`${rand}`);
    if (cell.textContent === '') {
        aiCombos.push(parseInt(rand));
        cell.textContent = 'X';
        checkWin();
    } else
        aiPlay();
};


function check(playerCombo, winnerCombo) {
    return winnerCombo.every(element => playerCombo.includes(element));
}

function checkWin() {
    winCombos.forEach(combo => {
        if (check(playerCombos, combo)) {
            combo.forEach(cellNum => document.getElementById(cellNum).style.color = 'green');
            cells.forEach(cell => cell.removeEventListener("click", clickEvent, false));
            document.querySelector('.text').textContent = 'YOU WIN!';
            lose = true;
        }
        if (check(aiCombos, combo)) {
            combo.forEach(cellNum => document.getElementById(cellNum).style.color = 'red');
            cells.forEach(cell => cell.removeEventListener("click", clickEvent, false));
            document.querySelector('.text').textContent = 'YOU LOSE!';
            win = true;
        }

        if (emptySpots().length == 0) {
            cells.forEach(cell => cell.removeEventListener("click", clickEvent, false));
            document.querySelector('.text').textContent = 'DRAW!';
            draw = true;
        }
    })
    return { lose: -100, win: 100, draw: 0 }
}

function emptySpots() {
    let emptySpots = [];
    cells.forEach(cell => {
        if (cell.textContent == '') {
            emptySpots.push(cell.id);
        }
    });
    return emptySpots;
}

function miniMax() {
    let score = 0;
    emptySpots().forEach(spot => {
        aiCombos.push(parseInt(spot));
        checkWin();
        if (win == true)
            score += checkWin().win;
        else if (lose == true)
            score += checkWin().lose;
        else if (draw == true)
            score += checkWin().draw;
        else
            console.log('continue');
        return spot
    });
}