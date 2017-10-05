// options for the configurations
numQuestions = ["5", "10", "15", "20"];
category = ["Random", "General Knowledge", "Video Games", "Computers", "Gadgets"];
difficulty = ["Easy", "Medium", "Hard"];
type = ["Any", "Multiple Choice", "True/False"];

$(document).ready(function() {
  $("#num-questions-input").html(buildDropdownInner(numQuestions));
  $("#category-input").html(buildDropdownInner(category));
  $("#difficulty-input").html(buildDropdownInner(difficulty));
  $("#type-input").html(buildDropdownInner(type));
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
  return "<option value=\"" + value + "\">" + value + "</option>";
}
