// options for the configurations
numQuestions = [
    {display: "5", value: "5"},
    {display: "10", value: "10"},
    {display: "15", value: "15"},
    {display: "20", value: "20"}];
category = [
    {display: "General Knowledge", value: "9"},
    {display: "Video Games", value: "15"},
    {display: "Computers", value: "18"},
    {display: "Films", value: "11"},
    {display: "Science and Nature", value: "17"}];
difficulty = [
    {display: "Easy", value: "easy"},
    {display: "Medium", value: "medium"},
    {display: "Hard", value: "hard"}];
type = [
    {display: "Multiple Choice", value: "multiple"},
    {display: "True/False", value: "boolean"}];

var BASE_URL = "https://opentdb.com/api.php";

// set dropdowns, put click listener on configure button
$(document).ready(function() {
  $("#num-questions-input").html(buildDropdownInner(numQuestions));
  $("#category-input").html(buildDropdownInner(category));
  $("#difficulty-input").html(buildDropdownInner(difficulty));
  $("#type-input").html(buildDropdownInner(type));

  $("#build-quiz-button").click(function() {
      buildConfiguredURL();
  });
});

// builds the inner html for configuration dropdowns
function buildDropdownInner(options) {
  var inner = "";
  for(var i = 0; i < options.length; i++) {
    inner += buildDropdownInnerLine(options[i]);
  }
  return inner;
}

// builds one element/line for configuration dropdown
function buildDropdownInnerLine(value) {
  return "<option value=\"" + value.value + "\">" + value.display + "</option>";
}

// returns a string to be used when hitting the API
function buildConfiguredURL() {
    var numQuestions = $("#num-questions-input").find(":selected").val();
    var category = $("#category-input").find(":selected").val();
    var difficulty = $("#difficulty-input").find(":selected").val();
    var type = $("#type-input").find(":selected").val();

    var url = BASE_URL + "?";
    url += "amount=" + numQuestions + "&";
    url += "category=" + category + "&";
    url += "difficulty=" + difficulty + "&";
    url += "type=" + type;

    console.log(url);
    return url;
}
