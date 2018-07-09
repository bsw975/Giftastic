// Why is populateGiphys being run?

// Examples: 09-ClickJSON
$(document).ready(function () {
    var stillsArray = [];
    var gifsArray = [];
    $(document).on("click", "#submit-button", function () {
        event.preventDefault();
        $("#submit-button").text("");
        addButton($("#giphy-input").val()); //.val().trim() probably does something helpful
    }); //end document on click for submit-button
    var input = document.getElementById("giphy-input");
    input.addEventListener("keyup", function (event) { //allows Enter to add a giphy button
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit-button").click();
        }
    });

    $(document).on("click", ".giphy-button", function () { //run populateGiphys function upon click
        populateGiphys($(this).attr("data-name")); //pass it the search term of the button's label
    });

    $(document).on("click", ".giphy", function () {
        console.log("data state is still");
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            console.log("data state is still");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        // toggleGiphyAnimation($(this).attr("data-num")); //pass it the giphy #
    });
    //since this js file is called at end, the submit button should be created by the time JS starts looking for it

    function addButton(label) {
        var newButton = $("<button>");
        newButton.addClass("giphy-button")
        newButton.attr("data-name", label);
        // Provided the initial button text
        newButton.text(label);
        $("#giphy-buttons").append(newButton);
    }
    var buttonArray = ["bus", "gollum", "puppies", "gatsby", "garfield", "hillary", "obama", "heman", "homer simpson", "queen mum"];
    for (i = 0; i < 10; i++) {
        addButton(buttonArray[i]);
    }
    function populateGiphys(search) {
        $("#giphys").empty();
        // do ajax
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + search;
        $.get(queryURL).then(function (response) {
            console.log(response)
            for (i = 0; i < 10; i++) {
                var pRating = $("<p>").text("Rating: " + response.data[i].rating);
                var gif = $("<img>").attr("src", response.data[i].images.original_still.url);
                stillsArray[i] = response.data[i].images.original_still.url;
                gifsArray[i] = response.data[i].images.original.url;
                gif.attr("alt", search);
                gif.addClass("giphy");
                gif.attr("data-num", i);
                gif.attr("data-still", response.data[i].images.original_still.url);
                gif.attr("data-animate", response.data[i].images.original.url);
                gif.attr("data-state", "still");
                $("#giphys").append(pRating, gif);
            } // todo: forEach???
        }); // todo: color the blicked button
    }

    // function toggleGiphyAnimation(giphyNum) {
    //     var gif = $("data-num")

    // }

});