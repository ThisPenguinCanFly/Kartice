
const cards = [
    "🍎", "🍎",
    "🚀", "🚀",
    "🐱", "🐱",
    "⚽", "⚽",
    "🌙", "🌙",
    "🎵", "🎵"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

// Shuffle the cards randomly
function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

// Create the game board
function createBoard() {
    const gameBoard = document.getElementById("game-board");

    gameBoard.innerHTML = "";

    shuffleCards();

    cards.forEach((symbol) => {
        const card = document.createElement("button");

        card.classList.add("card");
        card.textContent = "?";
        card.dataset.symbol = symbol;

        card.addEventListener("click", () => flipCard(card));

        gameBoard.appendChild(card);
    });
}

// Flip a card
function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;
    if (card.classList.contains("flipped")) return;

    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;

    updateMoves();
    checkMatch();
}

// Check whether the two cards match
function checkMatch() {
    if (
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol
    ) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;
        resetTurn();
        checkWin();
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();
        }, 1000);
    }
}

// Reset the current turn
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Update the move counter
function updateMoves() {
    document.getElementById("moves").textContent = moves;
}

// Check whether all pairs have been found
function checkWin() {
    if (matchedPairs === cards.length / 2) {
        document.getElementById("message").textContent =
            `You won in ${moves} moves!`;
    }
}

// Start or restart the game
function startGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;

    document.getElementById("moves").textContent = moves;
    document.getElementById("message").textContent = "";

    createBoard();
}

// Start the game when the page loads
startGame();
