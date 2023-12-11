function generateRecommendations() {
    // Assuming you have some data to send to the server (modify as needed)
    event.preventDefault();
    var storedResponses = JSON.parse(localStorage.getItem('responses'));
    console.log(storedResponses)
    var uncheckedItems = getUncheckedItems(storedResponses);
    console.log(uncheckedItems)
    var itemIDs =[]
    for (var i =0; i < uncheckedItems.length; i++) {
        var ID = uncheckedItems[i];
        console.log(ID);
        itemIDs.push(ID);
    }
    localStorage.setItem('itemIDs', JSON.stringify(itemIDs));
    var generatedText = JSON.parse(localStorage.getItem('generatedText'));
    alert("Generated Recommendations: " + generatedText);
}

function getUncheckedItems(responses) {
    var unchecked = [];
    for (var priority in responses) {
        for (var item in responses[priority]) {
            if (responses[priority][item] == false) {
                unchecked.push('p' + priority[1] + item);
            }
        }
    }
    return unchecked;
}

function getCategoryName() {
    input_categories = [];
    var uncheckedIDs = JSON.parse(localStorage.getItem('itemIDs'));
    for (i = 0; i < uncheckedIDs.length; i++) {
        console.log('itemID: ', uncheckedIDs[i]);
        var label = $(`label[for="${uncheckedIDs[i]}"]`);
        console.log(label);
        var category = label.attr('title');
        // Check if the category is found
        if (category) {
            console.log('Name: ' + category);
            input_categories.push(category);
        } else {
            console.error('NEW: Category not found for item: ' + itemId);
            return null;  // Handle the case where the category is not found
        }
    }

console.log("RESULTS: ", input_categories);
localStorage.setItem('input_categories', JSON.stringify(input_categories));
    //return input_categories;
    // Make an AJAX request to your Python server
var generated_text;
$.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5000/generate-recommendations',  // Update with your server's URL
    contentType: 'application/json',
    data: JSON.stringify({input_categories: input_categories}),
    success: function(response) {
        // Update your UI with the generated recommendations
        generatedText = response.generated_text;
        // Modify this part to update your UI as needed
        localStorage.setItem('generatedText', JSON.stringify(generatedText));
        //window.location.href = 'final_score.html'
        //alert("Generated Recommendations:\n " + generatedText);
        //generateRecommendations();
    },
    error: function(error) {
        console.error('Error:', error.responseText);
        // Handle errors gracefully in your UI
    }
});
return generated_text;
}