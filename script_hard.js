let words = ['jazz','abyss','subway','lymph','vaporize','pixel','nymph', 'matrix', 'lucky','ivory','jelly'];
let line = "";

let wordSide = document.getElementById('word');

let point =0;

function randomWord(){
    let randomNum = Math.floor(Math.random() * words.length);
    return words[randomNum];
}

let playG=document.getElementById('playGame');

playG.addEventListener('click',displayWord, {once:true});
playG.addEventListener('click', removeButton);
let wordGuess;

let word = '';
function displayWord(){
    word = randomWord();
    word = word.toUpperCase();
    console.log(word);
    line = "_".repeat(word.length);
    let newLines = document.createElement('div');
    newLines.setAttribute('id','wordToGuess')
    let newText = document.createTextNode(line);;
    newLines.appendChild(newText);
    wordSide.appendChild(newLines);
    wordGuess = document.getElementById('wordToGuess');
    wordGuess.style.letterSpacing="15px";
    countdown=setInterval('timer()', 1000);
    
}

let upgradeTime =1;
let sec = upgradeTime;
let myInterval;
let countdown;

function timer(){
    let hours = Math.floor(sec/60/60)
    let minutesLeft = Math.floor((sec) - (hours*3600));
    let minutes = Math.floor(minutesLeft/60);
    let remainingSeconds = sec % 60;
    
    function pad (n) { return (n < 10 ? "0" + n : n) }
    document.getElementById('countdown').innerHTML =pad(minutes) + ":" + pad(remainingSeconds);
    if (sec == 90) {
      clearInterval(countdown);
      alert("Time's up");
      return(playAgain());
    } else {
      sec++;
    }   
}

function removeButton(){
    wordSide.removeChild(playG)
}

let letters = document.getElementsByClassName('letter');

function addTheListenerToLetter(){
    for (i=0; i<letters.length; i++){
        letters[i].addEventListener("click", chooseLetter)
    }
}

addTheListenerToLetter();

let numPoint = document.getElementById('point');
let newPoint = document.createTextNode(`Number of Points : 0`);
numPoint.appendChild(newPoint);

function chooseLetter(){
    let l = this.innerText;
    this.style.opacity='0.2';
    for(let i=0; i<word.length; i++){
        if(word[i]==l){
            let audio = new Audio('137523215.mp3');
            audio.play();
            let s_line = line.split('');
            s_line.splice(i,1,l);
            let j_line = s_line.join('');
            line = j_line;
            wordGuess.innerText = line;
            if (wordGuess.innerText=== word){
                point ++;
                numPoint.innerText = `Number of points : ${point}`;
                let audio = new Audio('applause4.mp3');
                audio.play();
                alert('YOU WIN');
                return playAgain();
            }
            
        }
    }
    if (word.indexOf(l)===-1){
        let audio = new Audio('buzz.mp3');
        audio.play();
        console.log(l);
        return numLifes();
    }
    
}


let draw = document.getElementById('draw');
let newDiv = document.createElement('div');
let newText = document.createTextNode(`Guesses Remaining : 6`);
newDiv.appendChild(newText);
newDiv.setAttribute('id','guessRemain');
draw.appendChild(newDiv);

let count = 6;
let guessRemain = document.getElementById('guessRemain');


function playAgain(){
        let result = confirm("Press OK if you want to play again");
        sec=upgradeTime;
        countdown=setInterval('timer', 1000);
        let frames = document.getElementsByClassName('hangman');
        for(let i=frames.length-1; i>-1; i--){
            drawSide.removeChild(frames[i])
        }
        if (result === true){
            for (let i of letters){
                i.style.opacity = '1';}
                wordGuess = document.getElementById('wordToGuess');
                wordSide.removeChild(wordGuess);
                count =6;
                return displayWord();}
        else{
            document.location.href='index_contact.html';
        }
}


function anOtherWord(){
    let result = confirm("Press OK if you want to play with an other word");
    if (result === true){
        clearInterval(countdown);
        sec=upgradeTime;
        countdown=setInterval('timer', 1000);
        for (let i of letters){
        i.style.opacity = '1';}
        wordGuess = document.getElementById('wordToGuess');
        wordSide.removeChild(wordGuess);
        count =6;
        clearInterval(myInterval);
        let frames = document.getElementsByClassName('hangman');
        for(let i=frames.length-1; i>-1; i-- ){
            drawSide.removeChild(frames[i])
        }
        
        return displayWord();}
}

let chgWord = document.getElementById('chgWord');
chgWord.addEventListener('click', anOtherWord );

let drawNew = document.createElement('div');
drawNew.setAttribute('id', 'drawSide');
draw.appendChild(drawNew);
let drawSide = document.getElementById('drawSide');

function numLifes(){
    count --;
    guessRemain.innerText = `Guesses Remaining : ${count}`;
    
     if (count ===5){
        let head = document.createElement('div');
        head.setAttribute('id', 'head');
        head.classList.add('hangman');
        drawSide.appendChild(head);
    }else if (count ===4){
        let body = document.createElement('div');
        body.setAttribute('id', 'body');
        body.classList.add('hangman');
        drawSide.appendChild(body);
    }else if (count ===3){
        let armLeft = document.createElement('div');
        armLeft.setAttribute('id', 'armLeft');
        armLeft.classList.add('hangman');
        drawSide.appendChild(armLeft);
    }else if (count ===2){
        let armRight = document.createElement('div');
        armRight.setAttribute('id', 'armRight');
        armRight.classList.add('hangman');
        drawSide.appendChild(armRight);
    }else if (count ===1){
        let legLeft = document.createElement('div');
        legLeft.setAttribute('id', 'legLeft');
        legLeft.classList.add('hangman');
        drawSide.appendChild(legLeft);
    }
    else if (count === 0){
       
        alert('YOU LOSE');
        return playAgain();
    }
}

// To play with the keyboard

document.body.addEventListener('keydown', selectLetter);

let keys = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];

function selectLetter(event){
    let l = event.key;
    l = l.toUpperCase();
    let x = event.keyCode;
    let letters = document.getElementsByClassName('letter');
    for (let i =0; i<keys.length;i++){
        if(x===keys[i]){
            letters[i].style.opacity='0.2';
        }
    }
    for(let i=0; i<word.length; i++){
        if(word[i]==l){
            let audio = new Audio('137523215.mp3');
            audio.play();
            let s_line = line.split('');
            s_line.splice(i,1,l);
            let j_line = s_line.join('');
            line = j_line;
            wordGuess.innerText = line;
            if (wordGuess.innerText=== word){
                point ++;
                numPoint.innerText = `Number of points : ${point}`;
                let audio = new Audio('applause4.mp3');
                audio.play();
                alert('YOU WIN');
                return playAgain();
            }
            
        }
    }
    if (word.indexOf(l)===-1){
        let audio = new Audio('buzz.mp3');
        audio.play();
        console.log(l);
        return numLifes();
    }
    
}




