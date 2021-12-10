const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let SECRET_NUMBER;

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

askRange();

async function askRange() {
    let min;
    let max;
    ask("Enter a min number: ")
        .then(num1 => {
            min = num1;
            return ask("Enter a max number: ")
        })
        .then(num2 => {
            max = num2;
            if (parseInt(max) < parseInt(min)) {
                throw Error("max is smaller than min")
            }
            console.log(`I'm thinking of number between ${min} and ${max}...`);
            SECRET_NUMBER = randomInRange(Number(min), Number(max));
            askGuess();
        })
        .catch(error => {
            console.log(error);
            askRange();
        });
}

async function askGuess() {
    ask("Enter a guess: ")
        .then(num => {
            const isCorrect = checkGuess(Number(num));
            if (isCorrect) {
                console.log("YOU WON.");
                rl.close();
            } else {
                askGuess();
            }
        });
}

function randomInRange(min, max) {
    let range = max - min;
    return min + Math.floor(Math.random() * (range + 1));
}

function checkGuess(guess) {
    if (guess > SECRET_NUMBER) {
        console.log("Too high.");
        return false;
    } else if (guess < SECRET_NUMBER) {
        console.log("Too low.");
        return false;
    } else {
        console.log("Correct!");
        return true;
    }
}