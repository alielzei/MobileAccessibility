/*

-old----------------------------


function displayReccommendations(){
    event.preventDefault();
    var generated_text = JSON.parse(localStorage.getItem('generated_text'));
    console.log("Generated Recommendations: " + generated_text);
    alert("Generated Recommendations: " + generated_text);
}

//function generateRecommendations() {
    // Assuming you have some data to send to the server (modify as needed)
    //event.preventDefault();
var storedResponses = JSON.parse(localStorage.getItem('responses'));
console.log(storedResponses)
var uncheckedItems = getUncheckedItems(storedResponses);
console.log(uncheckedItems)
var itemIDs =[]
for (var i =0; i < uncheckedItems.length; i++) {
    var ID = uncheckedItems[i];
    //console.log(ID);
    itemIDs.push(ID);
}
localStorage.setItem('itemIDs', JSON.stringify(itemIDs));
//var generatedText = JSON.parse(localStorage.getItem('generatedText'));
//alert("Generated Recommendations: " + generatedText);
getCategoryName();
//}

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
$.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5000/generate-recommendations',  // Update with your server's URL
    contentType: 'application/json',
    data: JSON.stringify({input_categories: input_categories}),
    success: function(response) {
        // Update your UI with the generated recommendations
        var generated_text = response.generated_text;
        localStorage.setItem('generated_text', JSON.stringify(generated_text));
        window.location.href = 'final_score.html'
        displayReccommendations(generated_text);
        //alert("Generated Recommendations:\n " + generatedText);
        //generateRecommendations();
    },
    error: function(error) {
        console.error('Error:', error.responseText);
        // Handle errors gracefully in your UI
    }
    });
}
 <!--Final Score Calculation Script
    <script>
        // script.js
 
         function getUncheckedCategories() {
            event.preventDefault(); 
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
             //console.log('Unchecked Categories:', uncheckedCategories);
             // Pass unchecked categories to the backend
             localStorage.setItem('categories', JSON.stringify(uncheckedCategories));
             sendCategoriesToBackend(uncheckedCategories);
         }
 
         function sendCategoriesToBackend(uncheckedCategories) {
             // Use AJAX to send data to the backend
             console.log("Unchecked Categories" , uncheckedCategories);
             $.ajax({
                 type: 'POST',
                 url: 'http://127.0.0.1:5000/generate-recommendations', // Update this with your backend endpoint
                 contentType: 'application/json',
                 data: JSON.stringify({ input_categories: uncheckedCategories }),
                 success: function(response) {
                    console.log("data", response.generated_text);
                    var generated_text = response.generated_text;
                    localStorage.setItem('recommendations', generated_text);
                    window.location.href = 'loading.html';
                 },
                 error: function(error) {
                     console.error('Error sending data to backend:', error);
                 }
             });
         }
     </script>
    <script src="js/calculator.js"></script> -->

$(document).ready(function(){
    $("form").on("submit", function(event) {

--------------------og chatgpt functions-----------------------------------
        function generateRecommendations() {
        event.preventDefault();
        var storedResponses = JSON.parse(localStorage.getItem('responses'));
        console.log(storedResponses)
        var uncheckedItems = getUncheckedItems(storedResponses);
        console.log(uncheckedItems)
        var itemIDs = []
        for (var i = 0; i < uncheckedItems.length; i++) {
            var ID = uncheckedItems[i];
            console.log(ID);
            itemIDs.push(ID);
        }
        localStorage.setItem('itemIDs', JSON.stringify(itemIDs));
        
        var input_categories = JSON.parse(localStorage.getItem('input_categories'));

        // Call the common function for AJAX request
        makeAjaxRequest({ input_categories: input_categories }, function(response) {
            var generatedText = response.generated_text;
            localStorage.setItem('generatedText', JSON.stringify(generatedText));
            // Handle the result on the final score page as needed
            alert("Generated Recommendations: " + generatedText);
        });
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

----------------------chart UI help (maybe)-------------------------------------
<!--
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>MAXIMMOBILE: Mobile App Accessibility Checklist</title>
    <SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
    <!--
    <link rel="canonical" href="http://www.example.com/">
    

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="$$hosted_libs_prefix$$/$$version$$/material.cyan-light_blue.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
    #view-source {
      position: fixed;
      display: block;
      right: 0;
      bottom: 0;
      margin-right: 40px;
      margin-bottom: 40px;
      z-index: 900;
    }
    </style>
  </head>
  <body>
      <main class="mdl-layout__content mdl-color--grey-100">
        <div class="mdl-grid demo-content">
          <div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
            <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan font-size="0.2" dy="-0.07">%</tspan></text>
            </svg>
            <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan dy="-0.07" font-size="0.2">%</tspan></text>
            </svg>
            <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan dy="-0.07" font-size="0.2">%</tspan></text>
            </svg>
            <svg fill="currentColor" width="200px" height="200px" viewBox="0 0 1 1" class="demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop">
              <use xlink:href="#piechart" mask="url(#piemask)" />
              <text x="0.5" y="0.5" font-family="Roboto" font-size="0.3" fill="#888" text-anchor="middle" dy="0.1">82<tspan dy="-0.07" font-size="0.2">%</tspan></text>
            </svg>
          </div>
      </main>
    </div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="position: fixed; left: -1000px; height: -1000px;">
        <defs>
          <mask id="piemask" maskContentUnits="objectBoundingBox">
            <circle cx=0.5 cy=0.5 r=0.49 fill="white" />
            <circle cx=0.5 cy=0.5 r=0.40 fill="black" />
          </mask>
          <g id="piechart">
            <circle cx=0.5 cy=0.5 r=0.5 />
            <path d="M 0.5 0.5 0.5 0 A 0.5 0.5 0 0 1 0.95 0.28 z" stroke="none" fill="rgba(255, 255, 255, 0.75)" />
          </g>
        </defs>
      </svg>
  </body>
</html>
<script>
      document.addEventListener('DOMContentLoaded', () => {
        const scaleContainer = document.getElementById('horizontalScale');
  
        // Set the number of ticks and labels
        const numberOfTicks = 5;
  
        for (let i = 0; i < numberOfTicks; i++) {
          const tick = document.createElement('div');
          tick.className = 'tick';
          tick.style.left = `${(i / (numberOfTicks - 1)) * 100}%`;
          scaleContainer.appendChild(tick);
  
          const label = document.createElement('div');
          label.className = 'label';
          label.textContent = i * 20; // Adjust labels as needed
          label.style.left = `${(i / (numberOfTicks - 1)) * 100}%`;
          scaleContainer.appendChild(label);
        }
      });
    </script>
-->

-------------------working AJAX----------------------------------------
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

        // Call the common function for AJAX request
        makeAjaxRequest({ input_categories: input_categories }, function(response) {
            var generatedText = response.generated_text;
            localStorage.setItem('generatedText', JSON.stringify(generatedText));
            // Redirect to the final score page
            window.location.href = 'final_score.html';
        });
    } */
        
       /* function getCategoryName() {
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
                //localStorage.setItem('generatedText', JSON.stringify(generatedText));
                //window.location.href = 'final_score.html'
                alert("Generated Recommendations:\n " + generatedText);
                //generateRecommendations();
            },
            error: function(error) {
                console.error('Error:', error.responseText);
                // Handle errors gracefully in your UI
            }
        });
        return generated_text;
    } 

*/