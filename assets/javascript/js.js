$( document ).ready(function() {
    console.log( "page ready!" );
    makeButtons(topics, "searchButton", "#buttons");
});

var topics = ["Steve Nash", "Amare Stoudemire", "Shawn Marion", "Charles Barkley"];

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

//Animation-Still functionality on-click
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


//populates gifs from Giphy
$(document).on("click", ".searchButton", function(){
	$("#searchesDiv").empty();
	var name = $(this).data("type");
	console.log(name);
	var query = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax({
 		url:query,
		method:"GET"})
 			.done(function(response){
 				console.log(response)
 				for (var i = 0; i < response.data.length; i++) {
 					// $("#searchesDiv").append("<img src='" + response.data[i].images.downsized.url + "'>");
 					var searchDiv = $('<div class="search-item">');
 					var gifRating = response.data[i].rating;
 					var paragraph = $('<p>').text('Rating: ' + gifRating);
 					var animated = response.data[i].images.downsized.url;
 					var still = response.data[i].images.downsized_still.url;
 					var image = $('<img>');
 					image.attr('src', still);
 					image.attr('data-still', still);
 					image.attr('data-animated', animated);
 					image.attr('data-state', 'still');
 					image.addClass('imageSearch');
 					searchDiv.append(paragraph);
 					searchDiv.append(image);
 					$("#searchesDiv").append(searchDiv);
 				}
 			}) 

})

//Search functionality
$("#search").on("click",function(){
	console.log("you pushed the search button");
	var search = $("#searchInput").val().trim();
	topics.push(search);
	makeButtons(topics, "searchButton", "#buttons");
	return false; 
})










