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