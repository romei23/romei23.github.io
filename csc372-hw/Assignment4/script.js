document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const computerChoiceImage = document.getElementById('computer-choice');
    const resultText = document.getElementById('result-text');
    const winsElement = document.getElementById('wins');
    const lossesElement = document.getElementById('losses');
    const tiesElement = document.getElementById('ties');
    const resetButton = document.getElementById('reset');

    let wins = 0;
    let losses = 0;
    let ties = 0;

    const choicesArray = ['rock', 'paper', 'scissors'];

    // Event listener for player's choice
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            const playerChoice = choice.id;
            shuffleComputerChoice(() => {
                const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
                updateComputerChoiceImage(computerChoice);
                const result = determineWinner(playerChoice, computerChoice);
                updateScore(result);
                updateResultText(result, playerChoice, computerChoice);
            });
        });
    });

    // Event listener for reset button
    resetButton.addEventListener('click', () => {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScoreDisplay();
        resultText.textContent = ''; // Clear the text
        computerChoiceImage.src = '/csc372-hw/Assignment4/images/question-mark.PNG';
        computerChoiceImage.classList.remove('selected');
        choices.forEach(c => c.classList.remove('selected'));
    });

    // Function to shuffle computer's choice
    function shuffleComputerChoice(callback) {
        let shuffleCount = 0;
        const shuffleInterval = setInterval(() => {
            const randomChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
            computerChoiceImage.src = `/csc372-hw/Assignment4/images/${randomChoice}.PNG`;
            shuffleCount++;
            if (shuffleCount >= 10) {
                clearInterval(shuffleInterval);
                callback();
            }
        }, 100);
    }

    // Function to update computer's choice image
    function updateComputerChoiceImage(choice) {
        computerChoiceImage.src = `/csc372-hw/Assignment4/images/${choice}.PNG`;
        computerChoiceImage.classList.add('selected');
    }

    // Function to determine the winner
    function determineWinner(player, computer) {
        if (player === computer) {
            return 'tie';
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        } else {
            return 'loss';
        }
    }

    // Function to update the score
    function updateScore(result) {
        if (result === 'win') {
            wins++;
        } else if (result === 'loss') {
            losses++;
        } else {
            ties++;
        }
        updateScoreDisplay();
    }

    // Function to update the score display
    function updateScoreDisplay() {
        winsElement.textContent = wins;
        lossesElement.textContent = losses;
        tiesElement.textContent = ties;
    }

    // Function to update the result text
    function updateResultText(result, playerChoice, computerChoice) {
        if (result === 'win') {
            resultText.textContent = `You win!`;
        } else if (result === 'loss') {
            resultText.textContent = `You lose!`;
        } else {
            resultText.textContent = `It's a tie!`;
        }
    }
});