function getUncheckedCategories() {
    var uncheckedCategories = [];

    // Get all checkboxes with class 'mdl-checkbox__input'
    var checkboxes = document.querySelectorAll('.mdl-checkbox__input');

    // Loop through checkboxes to find unchecked ones
    checkboxes.forEach(function(checkbox) {
        if (!checkbox.checked) {
            // Extract category name from checkbox id
            var categoryName = checkbox.getAttribute('name');
            uncheckedCategories.push(categoryName);
        }
    });

    // Pass unchecked categories to the backend
    localStorage.setItem('categories', JSON.stringify(uncheckedCategories));
    sendCategoriesToBackend(uncheckedCategories, function(recommendations) {
        // Callback when recommendations are ready
        localStorage.setItem('recommendations', recommendations);
        redirectToFinalScore();
    });
}

function sendCategoriesToBackend(uncheckedCategories, callback) {
    // Use AJAX to send data to the backend
    console.log("Unchecked Categories", uncheckedCategories);
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/generate-recommendations', // Update this with your backend endpoint
        contentType: 'application/json',
        data: JSON.stringify({ input_categories: uncheckedCategories }),
        success: function(response) {
            console.log("data", response.generated_text);
            var generated_text = response.generated_text;
            if (callback && typeof callback === 'function') {
                callback(generated_text);
            }
        },
        error: function(error) {
            console.error('Error sending data to backend:', error);
        }
    });
}

function redirectToFinalScore() {
    var responses = storeResponses(); // Call store function
    var finalScore = calculateFinalScore(responses); // Call calculation function
    if (finalScore === 0) {
        alert('ERROR: Please check at least one checkbox before proceeding.');
        return; // Stop further execution
    }
    var percents = calculatePercents(responses);
    localStorage.setItem('responses', JSON.stringify(responses));
    var url = "final_score.html?P1=" + percents.P1 + "&P2=" + percents.P2 + "&P3=" + percents.P3;
    url += "&finalScore=" + finalScore;
    window.location.href = url;
}