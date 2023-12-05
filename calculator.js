//JavaScript helper functions which store user responses and calculate final score when user clicks submit
$(document).ready(function(){
    $("form").on("submit", function(event) {
        event.preventDefault(); //stop errors from default form submission
        var responses = storeResponses(); //call store function
        calculateFinalScore(responses); //call calculation function
    });
});

function storeResponses() {
    var responses = {};
    for (var priority = 1; priority < 4; priority++){
        responses['P' + priority] = {}; //create a nested dictionary to store item ID, check status
        //get index of checked elements for class name that matches current priority
        $('.P' + priority + ' input[type="checkbox"]').each(function(index, checkbox){
            var itemName = 'item' + (index + 1);
            responses['P' + priority][itemName] = checkbox.checked; //store value in dictionary if checked
        });
    }
    console.log(responses);
    return responses;   
}
function calculateFinalScore(responses) {
    var finalScore = 0;
    var weights = { //assign each priority category appropriate weight, with P1 having highest weight
        P1: 3,
        P2: 2,
        P3: 1
    };
    for (var priority in responses) {
        for (var item in responses[priority]) {
            if (responses[priority][item] == true) {
                finalScore += weights[priority];
            }
        }
    }
    console.log('Final Score: ', finalScore);
    alert('Your final score is: ' + finalScore);
}