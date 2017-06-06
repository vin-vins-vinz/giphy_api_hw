
var topics = ["Chris Paul", "Deron Williams", "Kobe Bryant", "Michael Jordan", "Kyrie Irving"];

function renderButtons (){
	$("#player-buttons").empty();
	
	for (i = 0; i < topics.length; i ++) {
		var a = $("<button>");
		a.addClass("players");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#player-buttons").append(a);	
	}
}

renderButtons();


function displayGif(){

	var gifPlayer = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifPlayer + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		var results = response.data;

		// console.log(results[1].rating);

		for (n=0; n<results.length; n++){

			if (results[n].rating !== "g" || results[n].rating !== "pg") {

				var gifDiv = $("<div class='resultGif'>");

				var gifRating = results[n].rating;
				var ratingP = $("<p>").text("Rating: " + gifRating);

				// var imageUrl = results[j].images.fixed_height_small_still.url;
				var gifStill = $("<img>");
				gifStill.attr("src", results[n].images.fixed_height_small_still.url);
				// gifStill.attr("alt", "image loading");
				// console.log(gifStill);
				gifDiv.append(ratingP);
				gifDiv.append(gifStill);

				$("#gif-display").prepend(gifDiv);

			}
		}
	});


};

$("#add-player").on("click",function(event){
	event.preventDefault();
	var newPlayer = $("#player-input").val().trim();
	topics.push(newPlayer);
	renderButtons();
});

$(document).on("click", ".players", displayGif);

renderButtons();


