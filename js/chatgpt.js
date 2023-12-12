//Helper JavaScript functions to parse responses and send the unchecked boxes to chatgpt API
function getUncheckedCategories() {
    var uncheckedCategories = [];
    showLoading();
    // get all checkboxes
    var checkboxes = document.querySelectorAll('.mdl-checkbox__input');

    //loop to find unchecked ones
    checkboxes.forEach(function(checkbox) {
        if (!checkbox.checked) {
            // get category name
            var categoryName = checkbox.getAttribute('name');
            uncheckedCategories.push(categoryName);
        }
    });

    //pass unchecked box array to local storage for send backend func
    localStorage.setItem('categories', JSON.stringify(uncheckedCategories));
    sendCategoriesToBackend(uncheckedCategories, function(recommendations) {
        //callback when ajax req ready
        localStorage.setItem('recommendations', recommendations);
        hideLoading(); //hide spinner when done
        redirectToFinalScore();
    });
}

function sendCategoriesToBackend(uncheckedCategories, callback) {
    //use AJAX to send data to the backend
    console.log("Unchecked Categories", uncheckedCategories);
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/generate-recommendations', //connect to backend endpoint
        contentType: 'application/json',
        data: JSON.stringify({ input_categories: uncheckedCategories }),
        success: function(response) {
            console.log("data", response.generated_text);
            var generated_text = response.generated_text;
            if (callback && typeof callback === 'function') {
                callback(generated_text); //send when ready to html reader
            }
        },
        error: function(error) { //catch errors
            console.error('Error sending data to backend:', error); 
        }
    });
}

function redirectToFinalScore() {
    var responses = storeResponses(); //call store function
    var finalScore = calculateFinalScore(responses); //call calculation function
    if (finalScore === 0) {
        alert('ERROR: Please check at least one checkbox before proceeding.');
        return; // if nothing entered, don't call
    }
    var percents = calculatePercents(responses);
    localStorage.setItem('responses', JSON.stringify(responses));
    var url = "final_score.html?P1=" + percents.P1 + "&P2=" + percents.P2 + "&P3=" + percents.P3;
    url += "&finalScore=" + finalScore; //store final score and percents in url parameters (easy to get)
    window.location.href = url;
}

function showLoading() {
    var loadingDiv = document.getElementById('loading'); //loading page
    loadingDiv.style.display = 'block';
}

function hideLoading() {
    var loadingDiv = document.getElementById('loading'); //stop the loading
    loadingDiv.style.display = 'none';
}