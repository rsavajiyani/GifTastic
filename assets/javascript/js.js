$(function() {
	makeButtons(topics, "searchButton", "#buttons");
})

var topics = ["Steve Nash", "Amare Stoudemire", "Shawn Marion", "Charles Barkley"];
var newTopic ="";

function makeButtons(array, classAdd, areaAdd) {
	$(areaAdd).empty();
	for (var i = 0; i < array.length; i++){
		var button = $("<button>");
		button.addClass(classAdd);
		button.attr("data-type", array[i]);
		button.text(array[i]);
		$(areaAdd).append(button);

	}
}

$(document).on("click", ".searchButton", function(){
	$("#searchesDiv").empty();
	var type = $(this).data("type");
	var query = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({url:query,method:"GET"})
		.done(function(response){
			for(var i = 0; i < response.data.length; i++) {
				var searchDiv = $('<div class = "search-item">');
				var gifRating = response.data[i].rating;
				var paragraph = $("<p>").text("Rating: " + gifRating);
				var animated = response.data[i].images.original.url;
				var still = response.data[i].images.original_still.url;
				var image = $("<img>");
				image.attr("src", still);
				image.attr("data-still", still);
				image.attr("data-animated", animated);
				image.attr("data-state", "still");
				image.addClass("imageSearch");
				searchDiv.append(paragraph);
				searchDiv.append(image);
				$("#searches").append(searchDiv);
			}
		})
	})


$(document).on("click",".imageSearch",function(){
	var state = $(this).attr("data-state");
	if (state == "still") {
		$(this).attr("src",$(this).data("animated"));
		$(this).attr("data-state", "animated");
	}
	else {
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still")
	}
})






