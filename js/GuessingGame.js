
function Game() {
    this.playersGuess = null;
    this.pastGuesses = []; 
    this.winningNumber = generateWinningNumber(); 

}

function generateWinningNumber() {
    return Math.floor(Math.random() * 100 + 1);
}

function newGame() {
    return new Game();
}

 Game.prototype.difference = function() {
    return this.playersGuess > this.winningNumber ? this.playersGuess - this.winningNumber : this.winningNumber - this.playersGuess;
}

Game.prototype.isLower = function() {
    if (this.playersGuess >= 1 && this.playersGuess <= 100) {
    if (this.playersGuess === this.winningNumber) {
        return "You Win!";
    } else if(this.pastGuesses.length === 5) {
        return "You Lose!";
    } 
    return this.playersGuess < this.winningNumber ? "Guess higher!" : "Guess lower!";
    } else {
        return "Try Again!";
    }
}


Game.prototype.playersGuessSubmission = function(num) {
      this.playersGuess = num;
      return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    var diff = this.playersGuess > this.winningNumber ? this.playersGuess - this.winningNumber : this.winningNumber - this.playersGuess;
    if (this.playersGuess >= 1 && this.playersGuess <= 100) {
    if (this.playersGuess === this.winningNumber) {
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child('+ this.pastGuesses.length +')').html(this.playersGuess);
        return "Press the reset button to play again.";
    }  else if (this.pastGuesses.indexOf(this.playersGuess) >= 0) {
        return 'You have already guessed that number.';
    } else if (this.pastGuesses.length <= 4) {
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child('+ this.pastGuesses.length +')').html(this.playersGuess);
        if (diff < 10) {
        return "You're burning up!";
    } else if (diff < 25) {
        return "You're lukewarm.";
    } else if (diff < 50) {
        return "You're a bit chilly.";
    } else {
        return "You're ice cold!";
    }   
    }  
} else {
    return "Invalid Guess.";
}

}

Game.prototype.provideHint = function() {
    var hintArr = [];
    hintArr.push(this.winningNumber);
    while (hintArr.length < 3) {
        hintArr.push(generateWinningNumber());

    }
    return shuffle(hintArr);
}

function shuffle(arr) {
    var currIndex = arr.length;
    var randomIndex;
    var holdIndex;
    while(currIndex > 0) {
        randomIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        holdIndex = arr[randomIndex];
        arr[randomIndex] = arr[currIndex];
        arr[currIndex] = holdIndex;
    }
    return arr;
}

function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    $("h3").html(output);
    var lower = game.isLower();
    if (output === "You have already guessed that number.") {
        $("h1").html("Try Again!");
    } else {
        $("h1").html(lower);
    }
    if (lower === "You Lose!")  {
        $("h3").html("The correct number was <b>" + game.winningNumber + "</b>.<br>Press the reset button to play again.");
    }
    else if (lower === "You Win!") {
        $("h3").html("Press the reset button to play again.");
    }

}





$(document).ready(function(){


var game = new Game();

$('#submit').click(function(event){
     makeAGuess(game);
    
});

$('#player-input').keypress(function(event) {
        if (event.which == 13) {
           makeAGuess(game);
        }
    });
$('#reset').click(function() {
    game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);
        $("body").css("background-image", "url('img/background_blue.png')");
        clicked = false;

})

var clicked = false;

$('#hint').click(function() {
    var arr = game.provideHint();
    if (!clicked) {
            $('#title').text('Hint');
            $('#subtitle').html('The winning number is <b>' + arr[0] + '</b>, <b>' + arr[1] + '</b> or <b>' + arr[2] + '</b>.');
            clicked = true;
        } else {
            $('#title').text('Hey Now!');
            $('#subtitle').html('I already gave you a hint!');
        }
});


})
