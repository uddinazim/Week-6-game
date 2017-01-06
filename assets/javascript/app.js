
var animes = ["Yu Yu Hakusho", "One Piece", "Naruto", "Dragon Ball"];

var limit = 10;



function createButtons() {
	$("#buttonsArea").empty();
	for (var i = 0; i < animes.length; i++) {
		var newBtn = $("<button>");
		newBtn.addClass("btn btn-success superhero nunito");
		newBtn.attr("data-name", animes[i]);
		newBtn.text(animes[i]);
		$("#buttonsArea").append(newBtn);
	}
}

function addGifs() {
	$("#gifsArea").empty();
	var anime = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
		
			for (var i = 0; i < limit; i++) {
				
				var animatedURL = response.data[i].images.fixed_height.url;
			
				var stillURL = response.data[i].images.fixed_height_still.url;
		
				var rating = response.data[i].rating.toUpperCase();
			
				var panelDiv = $("<div>");
				
		
				var panelBody = $("<div>");
				panelBody.addClass("row panel-body");
				
				var newGif = $("<img>");
				newGif.addClass("gif");
				
				newGif.attr("data-still", stillURL);
				newGif.attr("data-animated", animatedURL);
				newGif.attr("src", stillURL);
				newGif.attr("data-state", "still");
			
				panelBody.append(newGif);
				
				var panelFooter = $("<div>");
				
				
				var panelRating = $("<h2>");
				
				panelRating.text("Rating: " + rating);
			
				panelFooter.append(panelRating);
			
				panelDiv.append(panelBody).append(panelFooter);
			
				$("#gifsArea").append(panelDiv);
		}
	});
}





$("#submitBtn").on("click", function() {

	if ($("#addAnime").val().trim() !== "") {
		var newAnime = $("#addAnime").val().trim();
		animes.push(newAnime);
		createButtons();
		$("#addAnime").val("");
	}
	return false;
});


$(document).on("click", ".gif", function(){
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animated"));
		$(this).attr("data-state", "animated");
	
	} else if (state === "animated") {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});


$(document).on("click", ".superhero", addGifs);

createButtons();


