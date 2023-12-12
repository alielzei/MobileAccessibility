//JavaScript helper functions which store user responses and calculate final score when user clicks submit
$(document).ready(function(){
    $("form").on("submit", function(event) {
        event.preventDefault();
        var responses = storeResponses(); //call store function
        var finalScore = calculateFinalScore(responses); //call calculation function
        var percents = calculatePercents(responses);
        localStorage.setItem('responses', JSON.stringify(responses));
        var url = "final_score.html?P1=" + percents.P1 + "&P2=" + percents.P2 + "&P3=" + percents.P3;
        url+= "&finalScore=" + finalScore;     
        //window.location.href = url;
        //console.log(percents);
        //console.log(responses)
    })
});

function storeResponses() {
    var responses = {};
    for (var priority = 1; priority < 4; priority++) {
        responses['P' + priority] = {}; //create a nested dictionary to store item ID, check status
        //get index of checked elements for class name that matches current priority
        $('.P' + priority + ' input[type="checkbox"]').each(function (index, checkbox) {
            var itemName = 'item' + (index + 1);
            responses['P' + priority][itemName] = checkbox.checked; //store value in dictionary true/false
        });
    }
    return responses;
}

function calculateFinalScore(responses) {
    var finalScore = 0;
    var totalScore = 0;
    var weights = {
        P1: 3,
        P2: 2,
        P3: 1
    };
    
    for (var priority in responses) { //iterate through each priority
        for (var item in responses[priority]) { //for each item in priority
            totalScore += weights[priority]; //calculate max score depending on number of items per priority
            if (responses[priority][item] == true) { //if checkbox is checked
                finalScore += weights[priority]; //calculate based on weights
            }
        }
    }
    console.log('Final Score: ', finalScore);
    //alert('Your final score is: ' + finalScore); //temp
    //document.getElementById("finalScore").innerText = finalScore;
    return finalScore;
}

function calculatePercents(responses) {
    var weights = {
        P1: 3,
        P2: 2,
        P3: 1
    };

    var checkedWeights = {P1: 0, P2: 0, P3: 0};
    var totalScore = 0;

    for (var priority in responses) {
        for (var item in responses[priority]) {
            if (responses[priority][item]) {
                checkedWeights[priority] += weights[priority];
            }
            totalScore += weights[priority];
        }
    }
    var percents = {P1: 0, P2: 0, P3: 0};
    
    for (var finalPriority in checkedWeights) {
        percents[finalPriority] = (checkedWeights[finalPriority] / totalScore) * 100;
    }
    return percents;
}