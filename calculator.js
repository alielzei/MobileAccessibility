/* $(document).ready(function(){
    $("form").on('submit', function(event){
        event.preventDefault(); // Stop form from submitting normally
        var score = 0;
        $("input[type=radio]:checked").each(function() {
            var name = $(this).attr("name");
            var index = $(this).parent().index();
            if(index === 1){score++;} // Yes
            else if(index === 2){score--;} // No             
        });
        alert('Your score is: ' + score);
    });
}); */