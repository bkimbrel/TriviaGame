
var questions = [{
    question: "What year did Colorado Host the Olympics?",
    choices: ["1988", "1976", "1998", "Didn't Host"],
    correctAnswer: 3
}, {
    question: "What Classic 'American' food was said to Originate in Colorado?",
    choices: ["Mac n' Cheese", "Potato Salad", "The Cheeseburger", "Hot-Dogs"],
    correctAnswer: 2
}, {
    question: "What is the Highest Elevation Road in North America?",
    choices: ["The Vail Pass", "Floyd Mt Road", "Boulder Canyon", "Road to Mt. Evans"],
    correctAnswer: 3
}, {
    question: "What Holiday does the City of Loveland have to make Special Accomedations for?",
    choices: ["Valentine's Day", "Thanksgiving", "Father's Day", "Easter"],
    correctAnswer: 0
}, {
    question: "What Type of Beverage Business does Colorado have more of Per Capita, than any other state?",
    choices: ["Coffee Shops", "Microbreweries", "Vodka Distillary", "Pot Shakes"],
    correctAnswer: 1
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    $('.timer').circularCountDown({
        duration: {
        hours: 0,
        minutes: 0,
        seconds: 10
        },
    });
    

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();


    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { 
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

    // $('#myTimer').polartimer({
    // timerSeconds: 30
    // });

    // $('#myTimer').polartimer('start');

    // $('#myTimer').polartimer({
    // timerSeconds: 30,
    // color : '#CCC',
    // opacity : 1
    // });

    // $('#myTimer').polartimer({
    // timerSeconds: 30,
    // callback : function() {}
    // });


});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}