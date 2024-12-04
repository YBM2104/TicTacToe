let currentPlayer = "X";
let board = Array(9).fill(null);
let scores = { X: 0, O: 0 };

// Update the UI board
function renderBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (cell) cellElement.classList.add("taken");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

// Handle cell clicks
function handleCellClick(index) {
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        scores[currentPlayer]++;
        updateScore();
        resetBoard();
    } else if (board.every(cell => cell)) {
        alert("It's a draw!");
        resetBoard();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        renderBoard();
    }
}

// Update scores
function updateScore() {
    document.getElementById("playerX").textContent = `Player X: ${scores.X}`;
    document.getElementById("playerO").textContent = `Player O: ${scores.O}`;
}

// Check if there's a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => 
        combination.every(index => board[index] === currentPlayer)
    );
}

// Reset the board
function resetBoard() {
    board = Array(9).fill(null);
    renderBoard();
}

// Add event listener for reset button
document.getElementById("reset").addEventListener("click", resetBoard);

// Initial render
renderBoard();
