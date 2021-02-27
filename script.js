// Challenge 1: Your Age in Days

function ageInDays() {
    var birthYear = prompt("What's your birth year?");
    var age = (2021 - birthYear) * 365;
    var h2 = document.createElement('h2');
    var textAns = document.createTextNode("You are " + age + " days old.")
    h2.setAttribute('id', 'ageInDays');
    h2.appendChild(textAns);
    document.getElementById('flexbox-result').appendChild(h2);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat Generator

function generateCat () {
    var img = document.createElement('img')
    var div = document.getElementById('flex-cat-gen');
    img.src = 'images/lion.jpg';
    img.setAttribute('class', 'lion');
    div.appendChild(img);
}

// Challenge 5: Rock, Papers, Scissors

function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    // console.log(humanChoice)
    botChoice = randomChoice();
    result = decideWinner(humanChoice, botChoice);
    // console.log("result: ", result)
    message = finalMessage(result);
    // console.log(botChoice)
    // console.log(message)
    rps(humanChoice, botChoice, message);
}

function randomChoice() {
    botChoice = Math.floor(Math.random() * 3);
    if(botChoice === 0)
        return "rock";
    else if(botChoice === 1)
        return "paper";
    else 
        return "scissor";        
}

function decideWinner(humanChoice, botChoice) {
    let obj = {"rock": {"rock" : 0.5, "paper": 1, "scissor": 0}, 
        "paper": {"rock" : 0, "paper": 0.5, "scissor": 1}, 
        "scissor": {"rock" : 1, "paper": 0, "scissor": 0.5}};

    console.log(obj[humanChoice])

    if(obj[humanChoice][botChoice] === 0)
        return "human";
    else if(obj[humanChoice][botChoice] === 1)
        return "bot";
    else
        return "tie";        
}

function finalMessage(result) {
    if(result == "human")
        return {"message": "You Won!", "color": "green"};
    else if(result == "bot")
        return {"message": "You Lost!", "color": "red"};
    else
        return {"message": "Tied!", "color": "yellow"};        
}

function rps(humanChoice, botChoice, message) {
    var imgDatabase = {
        "rock": document.getElementById('rock').src,
        "paper": document.getElementById('paper').src,
        "scissor": document.getElementById('scissor').src
    }

    // console.log("Jayesh");

    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imgDatabase[humanChoice] + "' class='rps' height=150 width=150 style='box-shadow: 0px 10px 50px rgb(11, 132, 231);'>";
    botDiv.innerHTML = "<img src='" + imgDatabase[botChoice] + "' class='rps' height=150 width=150 style='box-shadow: 0px 10px 50px rgb(216, 75, 10);'>";
    messageDiv.innerHTML = "<h1 style='color: " + message["color"] + "; font-size: 60px; text-align: center; padding: 30px;'>" + message["message"] + "</h1>";
    
    document.getElementById("flex-rps").appendChild(humanDiv);
    document.getElementById("flex-rps").appendChild(messageDiv);
    document.getElementById("flex-rps").appendChild(botDiv);
}

function resetGame() {

    var newGame = document.createElement('div');

    newGame.innerHTML = "<img src='images/rock.jpg' class='rps' id='rock' onClick='rpsGame(this)'><img src='images/paper.jpg' class='rps' id='paper' onClick='rpsGame(this)'><img src='images/scissor.jpg' class='rps' id='scissor' onClick='rpsGame(this)'>";
    newGame.setAttribute('class', 'flexbox-container-3');
    newGame.setAttribute('id', 'flex-rps');

    document.getElementById('parent').appendChild(newGame);
}

function playAgain() {

    document.getElementById('flex-rps').remove()
    
    resetGame();
}

// Challenge 3: Change the Color of All Buttons

var allButtons = document.getElementsByTagName('button');

var copyButtons = [];
for(let i = 0; i < allButtons.length; i++) {
    copyButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonThis) {
    if(buttonThis.value === "red")
        buttonRed();
    else if(buttonThis.value === "green")
        buttonGreen();
    else if(buttonThis.value === "reset")
        buttonReset();
    else if(buttonThis.value === "random")
        buttonRandom();            
}

function buttonRed() {
    for(let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for(let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for(let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyButtons[i]);
    }
}

function buttonRandom() {
    for(let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyButtons[Math.floor(Math.random() * 7)]);
    }
}

// Challenge 4: Blackjack

let bjGame = {
    "you" : {
        "scoreSpan" : "#your-blackjack-result",
        "div" : "#your-box",
        "score" : 0
    },
    "dealer" : {
        "scoreSpan" : "#dealer-blackjack-result",
        "div" : "#dealer-box",
        "score" : 0
    },
    "cardList" : ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    "cardValue" : {
        "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8,
        "9" : 9, "10" : 10, "J" : 10, "Q" : 10, "K" : 10, "A" : 11
    },
    "wins" : 0,
    "losses" : 0,
    "draws" : 0,
    "isHit" : true,
    "isStand" : false,
    "isDeal" : false
}

const YOU = bjGame["you"]
const DEALER = bjGame["dealer"]

const HIT = new Audio('sounds/swish.m4a');
const WIN = new Audio('sounds/cash.mp3');
const LOSE = new Audio('sounds/aww.mp3');

document.querySelector('#hit').addEventListener('click', blackjackHit);
document.querySelector('#stand').addEventListener('click', blackjackStand);
document.querySelector('#deal').addEventListener('click', blackjackDeal);

function showCard(card, activePlayer) {
    let cardImg = document.createElement('img');
    cardImg.src = 'images/' + card + '.png';
    cardImg.setAttribute('class', 'cards');
    document.querySelector(activePlayer["div"]).appendChild(cardImg);
    HIT.play();
}

function updateScore(card, activePlayer) {
    activePlayer['score'] += bjGame["cardValue"][card];
}

function showScore(activePlayer) {
    if(activePlayer['score'] <= 21)
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    else {    
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
}

function blackjackHit() {
    if(bjGame['isHit']) {
        bjGame['isStand'] = true;
        let card = bjGame["cardList"][Math.floor(Math.random() * 13)];
        if(YOU['score'] > 21)
            return;
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
    if(bjGame['isStand']) {
        bjGame['isDeal'] = true;
        bjGame['isHit'] = false;
        bjGame['isStand'] = false;
        while(DEALER['score'] < YOU['score'] || DEALER['score'] < 21) {
            let card = bjGame["cardList"][Math.floor(Math.random() * 13)];
            if(DEALER['score'] > 21)
                return;
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            if(DEALER['score'] >= YOU['score'] || DEALER['score'] >= 18 || YOU['score'] > 21) {
                showResult(computeWinner());
                break;
            }
            await sleep(1000);
        }
    }
}

function blackjackDeal() {
    if(bjGame['isDeal']) {
        bjGame['isDeal'] = false;
        bjGame['isHit'] = true;
        let yourImg = document.querySelector("#your-box").querySelectorAll('img');
        let dealerImg = document.querySelector("#dealer-box").querySelectorAll('img');
        
        for(let i = 0; i < yourImg.length; i++) {
            yourImg[i].remove();
        }

        for(let i = 0; i < dealerImg.length; i++) {
            dealerImg[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';
    }
}

function computeWinner() {
    let winner;

    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU;
            bjGame["wins"]++;
        } else if(YOU['score'] < DEALER['score']) {
            winner = DEALER;
            bjGame["losses"]++;
        } else if(YOU['score'] === DEALER['score']) {
            winner = "tie";
            bjGame["draws"]++;
        }
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        bjGame["losses"]++;
    } else if(YOU['score'] > 21 && DEALER['score'] > 21) {
        winner = "tie";
        bjGame["draws"]++;
    }

    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if(winner === YOU) {
        message = 'You Won!';
        messageColor = 'green';
        WIN.play();
    } else if(winner === DEALER) {
        message = 'You Lost!';
        messageColor = 'red';
        LOSE.play();
    } else {
        message = "Draw!";
        messageColor = 'black';
    }
    
    updateTable();

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}   

function updateTable() {
    document.querySelector('#wins').textContent = bjGame["wins"];
    document.querySelector('#losses').textContent = bjGame["losses"];
    document.querySelector('#draws').textContent = bjGame["draws"];
}
