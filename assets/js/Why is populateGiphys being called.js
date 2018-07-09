// Examples: 09-ClickJSON
$(document).on("click", "#submit-button", function () {
    event.preventDefault();
    addButton($("#giphy-input").val()); //.val().trim() does something probably helpful
});
$(document).on("click", ".giphy-button", populateGiphys($(this).attr("data-name")));
$(document).on("click", ".giphy", toggleGiphyAnimation);
//since this js file is called at end, the submit button should be created by the time JS starts looking for it

function addButton(label) {
    var newButton = $("<button>");
    newButton.addClass("giphy-button")
    newButton.attr("data-name", label);
    // Provided the initial button text
    newButton.text(label);
    $("#giphy-buttons").append(newButton);
}

function populateGiphys(search) {
    console.log(search + " is the search term sent to g");
    $("#giphys").empty();
    // do ajax
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + search;
    $.get(queryURL).then(function(response){
        console.log(response.data[i].image_original_url)
        for (i = 0; i < 10; i++) {
            var pRating = $("<p>").text("Rating: " + response.data[i].rating);
            var gif = $("<img>").attr("src", response.data[i].image_original_url);
            gif.attr("alt", search);
            $("#giphys").append(pRating, gif);
        }
        //forEach
      });
    // color the blicked button
}


function toggleGiphyAnimation(giphyID) {

}