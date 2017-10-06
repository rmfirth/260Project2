$(document).ready(function() {
    $(".btn").mouseup(function() {
       $(this).blur();
    });


    var createQuestion = function() {
        var currentQuestion = questions[questionNumber];
        var questionContent = currentQuestion["question"];
        var numOptions = currentQuestion["incorrect_answers"].length + 1;
        var allAnswers = currentQuestion["incorrect_answers"].slice(0);
        // console.log(numOptions);
        allAnswers[numOptions - 1] = currentQuestion["correct_answer"];
        // console.log(allAnswers);
        allAnswers = shuffle(allAnswers);
        var input1 = "<label class=\"btn btn-secondary\" for=\"";
        var input2 = "<input type=\"radio\" name=\"options\" autocomplete=\"off\" id=\"";

        $("#current-question").html("Question " + (questionNumber + 1));
        $("#question-content").html(questionContent);
        $("#question-submission").html("");
        for(var i = 0; i < numOptions; i++) {
            var myId = "answer" + i;
            // console.log(input + allAnswers[i] + "\" />");
            var inputElement = input1 + (myId + "\" >");
            var inputElement2 = input2 + (myId + "\" />" );
            $("#question-submission").append(inputElement + inputElement2 + allAnswers[i] + "</label><br>");

        }
        $("#question-section").fadeIn("slow");
    }

    var questionNumber = 0;
    var score = 0;
    var questions = 0;
    $("#build-quiz-button").click(function() {
        questionNumber = 0;
        score = 0;
        $("#configureQuiz").fadeOut(1000);
        var triviaUrl = buildConfiguredURL();
        $.ajax({
            url : triviaUrl,
            dataType : "json",
            success : function(parsed_json) {
                questions = parsed_json["results"];
                //console.log(questions);
                setTimeout(createQuestion, 1000);
            }
        });
    });

    $("#submit-answer").click(function() {
        var number_questions = $("#num-questions-input").find(":selected").val();
        //var userAnswer = $("input[name='options']:checked").text();
        var userAnswer = $('input[type="radio"]:checked').attr("id");
        userAnswer = $("label[for='" + userAnswer + "']").text();
        console.log(questions[questionNumber]["correct_answer"]);
        console.log(userAnswer);
        if(userAnswer == questions[questionNumber]["correct_answer"])
        {
            score++;
            alert("Correct!");
        }
        else
        {
            alert("Wrong! The correct answer is " + questions[questionNumber]["correct_answer"]);
        }

        if(questionNumber + 1 == number_questions)
        {
            alert("Game Over!\nYour Score is: " + score + "/" + number_questions);
            $("#question-section").hide();
            $("#configureQuiz").show();
        }
        else
        {
            questionNumber++;
            $("#question-section").fadeOut(1000);
            setTimeout(createQuestion, 1000);
        }
    })
});


//Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}