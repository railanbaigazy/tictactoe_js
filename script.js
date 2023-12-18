const X_CLASS = 'x';
const O_CLASS = 'o';

const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const messageText = document.querySelector('[data-message-text]');

let xTurn;
let turns;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

function startGame() {
    xTurn = true;
    turns = 0;

    setBoardClass();
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });
}

startGame();

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    turns++;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (turns !== 9) {
        swapTurns();
        setBoardClass();
    } else {
        endGame(true);
    }
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
}

function setBoardClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (xTurn) {
        board.classList.add(X_CLASS);
    } else {
        board.classList.add(O_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(i => {
            return cells[i].classList.contains(currentClass);
        })
    });
}

function endGame(isDraw) {
    if (!isDraw) {
        messageText.innerText = `${xTurn ?  "X" : "O"} WINS`;
    } else {
        messageText.innerText = "Draw";
    }
    message.classList.add('show');
}

function restartGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
    });
    message.classList.remove('show');
    startGame();
}

