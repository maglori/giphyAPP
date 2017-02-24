var fruits = ["Peaches", "Mango", "Pears", "Banana", "Watermelons"];


//this function will automatically make buttons out of the items in the fruits array,
//and empty the contents of the #buttons-view div, 
//replacing those contents with the new buttons.

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < fruits.length; i++) {

    var a = $("<button>");
          
    a.addClass("fruit");
    a.attr("data-name", fruits[i]);
    a.text(fruits[i]);
    $("#buttons-view").append(a);
  };
}


//takes a user inputted value from the form on submission and makes a new button 
//by adding to the array and calling renderButtons();

$("#add-fruit").on("click", function(event) {

  event.preventDefault();

  var newFruit = $("#search-input").val().trim()
    
  if (newFruit !== ""){
    fruits.push(newFruit).toString();
  }
        
  renderButtons()
});


//sends a request to giphy to get 10 animated gifs and their ratings, 
//using the clicked fruit button as a query term
function showFruityGifs() {
  $("#gifs-view").empty()
  event.preventDefault();

  var search = $(this).data('name').replace(/\s/g, "+");;
  var newGif;
  var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ search + "&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC"

  $.ajax({ 
    url: queryURL,
    method: 'GET'
  }).done(function(response){
      for (var count = 0; count < response.data.length; count ++){
        newGif = response.data[count];
        var imgBox = $('<div class="imgBox">').attr('data-number', count)
        $("#gifs-view").append(imgBox);
        var a = $('<img class="gifs">');
        var p = $('<p>').text("rating: " + newGif.rating)
        a.attr('src', newGif.images.original_still.url);
        a.attr("data-alt", newGif.images.original.url);
        a.attr("data-still", newGif.images.original_still.url)
        imgBox.data('number', count).append(a);
        imgBox.data('number', count).append(p);
      }
    });
}

function animate() {
  
  var animatedGif = $(this).data('alt');
  var stillGif = $(this).data('still')
  
  if ($(this).attr('src') === $(this).data('still')) {
    $(this).attr("src", animatedGif);
  }
  else {
    $(this).attr("src", stillGif)
  }
}

$(document).on("click", ".fruit", showFruityGifs);
$(document).on("click", ".gifs", animate);

renderButtons();