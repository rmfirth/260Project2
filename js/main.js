$(document).ready(function() {
    $(".btn").mouseup(function() {
       $(this).blur();
    });

    var createQuestion = function() {
        var currentQuestion = questions[questionNumber];
        var questionContent = currentQuestion["question"];
        var numOptions = currentQuestion["incorrect_answers"].length + 1;
        var allAnswers = currentQuestion["incorrect_answers"].slice(0);
        console.log(numOptions);
        allAnswers[numOptions - 1] = currentQuestion["correct_answer"];
        console.log(allAnswers);
        var input = "<label class=\"btn btn-secondary\">\n" +
            "<input type=\"radio\" name=\"options\" autocomplete=\"off\">";
        $("#current-question").html("Question " + (questionNumber + 1));
        $("#question-content").html(questionContent);
        for(var i = 0; i < numOptions; i++) {
            console.log(input + allAnswers[i] + "\" />");
            $("#question-submission").append(input + allAnswers[i] + "</label><br>");

        }
    }

    var questionNumber = 0;
    var score = 0;
    var questions = 0;
    $("#build-quiz-button").click(function() {
        questionNumber = 0;
        score = 0;
        $("#configureQuiz").hide();
        $("#question-section").show();
        var triviaUrl = "https://opentdb.com/api.php?amount=10";
        $.ajax({
            url : triviaUrl,
            dataType : "json",
            success : function(parsed_json) {
                questions = parsed_json["results"];
                console.log(questions);
                createQuestion();
            }
        });
    });

    $("#submit-answer").click(function() {
        ++questionNumber;
    })
});