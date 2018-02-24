$( document ).ready(function() {
    
    var actions = ["Airplanes", "Boston Terrier", "Dancing", "The Office", "Falling", "Crash", "Kangaroo"];
    

    function displayGifButtons(){
        $("#gifButtonsView").empty();
        for (var i = 0; i < actions.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", actions[i]);
            gifButton.text(actions[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    function addNewButton(){
        $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == ""){
          return false;
        }
        actions.push(action);
    
        displayGifButtons();
        return false;
        });
    }

    function removeLastButton(){
        $("removeGif").on("click", function(){
        actions.pop(action);
        displayGifButtons();
        return false;
        });
    }
    
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=g27ffiafB0fELsTcB5fYHFjQQdITmuGe&limit=10";
        console.log(queryURL); // Seeing if the URL is made properly
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); // console test to make see if something returns
            $("#gifsView").empty();
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                
                
                
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);                
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });