var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var indexCheck = 0;
var firsttime = true;

$(document).on("keypress", function(){
    if(firsttime)
    {
        nextSequence();
        firsttime = false;
    } 
    
})

$(".btn").on("click", function(){
    if(!firsttime)
    {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        effectHandler(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length -1);
    }
})

function nextSequence()
{
    userClickedPattern = [];
    var randomNumber = randomNumberF(0,3);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    effectHandler(randomChosenColor);
    textHandler();
}

function checkAnswer(currentLevel) 
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        $("body").addClass("game-over");

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("#level-title").text("Game Over, Press Any Key To Restart");

        Reset();
    }
}

function Reset()
{
    level = 0;
    firsttime = true;
    gamePattern = [];
}

function effectHandler(name)
{
    $("#"+name).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(name)
{
    $("#"+name).addClass("pressed");
    setTimeout(function() {
        $("#"+name).removeClass("pressed");
      }, 100);
}

function textHandler()
{   
    level++;
    $("#level-title").text("Level "+level);
}

function randomNumberF(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min)
}



