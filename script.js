let cardData = [];

async function loadCards() {
    try {
        const response = await fetch("./cards.json");

        if (!response.ok) {
            throw new Error("Could not load cards.json");
        }

        cardData = await response.json();

        if (cardData.length < 5) {
            throw new Error("You need at least 5 PNG images.");
        }

        startRound();
    } catch (error) {
        console.error("Failed to load cards:", error);

        document.getElementById("feedback").textContent =
            "Could not load cards. Check the console.";
    }
}

loadCards();

let targetKana = "";
let score = 0;
let round = 0;
let answered = false;

const CARDS_PER_ROUND = 5;

// Shuffle an array
function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// Start a new round
function startRound() {
    answered = false;
    round++;

    document.getElementById("feedback").textContent = "";
    document.getElementById("next-button").hidden = true;

    // Pick a random target hiragana
    const randomCard =
        cardData[Math.floor(Math.random() * cardData.length)];

    targetKana = randomCard.kana;

    document.getElementById("target-kana").textContent =
        targetKana;

    // Get all cards that match the target sound
    const correctCards = cardData.filter(
        card => card.kana === targetKana
    );

    // Pick one correct card
    const correctCard =
        correctCards[Math.floor(Math.random() * correctCards.length)];

    // Pick four other cards with different starting sounds
    const wrongCards = shuffle(
        cardData.filter(card => card.kana !== targetKana)
    ).slice(0, CARDS_PER_ROUND - 1);

    // Combine and shuffle the five choices
    const roundCards = shuffle([correctCard, ...wrongCards]);

    renderCards(roundCards);
}

// Display the five cards
function renderCards(cards) {
    const board = document.getElementById("game-board");
    board.innerHTML = "";

    cards.forEach(cardData => {
        const card = document.createElement("button");
        card.classList.add("game-card");

        const image = document.createElement("img");
        image.src = cardData.file;
        image.alt = cardData.word;

        const label = document.createElement("span");
        label.textContent = cardData.word;

        card.append(image, label);

        card.addEventListener("click", () => {
            checkAnswer(card, cardData);
        });

        board.appendChild(card);
    });
}

// Check the selected card
function checkAnswer(card, selectedCard) {
    if (answered) return;

    if (selectedCard.kana === targetKana) {
        answered = true;
        score++;

        card.classList.add("correct");

        document.getElementById("feedback").textContent =
            "Correct! よくできました！";

        document.getElementById("score").textContent = score;
        document.getElementById("next-button").hidden = false;
    } else {
        card.classList.add("wrong");

        document.getElementById("feedback").textContent =
            "Not quite! Try another card.";
    }
}

// Start the next round
document.getElementById("next-button").addEventListener(
    "click",
    startRound
);

// Start the game
startRound();
