function addFilmTitle(film){
  // ricavo il numero di stelle corretto
  var numberOfstars = film.vote_average;
  var stars = Math.floor(numberOfstars/2);


  var emptyIcon = "<i class='far fa-star'></i>"
  var fullIcon = "<i class='fas fa-star'></i>"
  var rating = ""

  for (var i = 0; i < 5; i++) {
    if ( i < stars){
      rating+=fullIcon
    }else if (i >= stars) {
      rating+=emptyIcon
    }
  }
  var tempData = {
    titolo: film.title,
    titoloOriginale: film.original_title,
    linguaOriginale: film.original_language,
    voto: film.vote_average,
    rating: rating
  }


  // handlebars che appende il template
  var template = $("#template").html();
  var compiled = Handlebars.compile(template)
  var li = compiled(tempData)
  var ul = $("#ul-list-film");
  ul.append(li)


}

function addSeriesTitle(serie){
  // ricavo il numero di stelle corretto
  var numberOfstars = serie.vote_average;
  var stars = Math.floor(numberOfstars/2);

  var emptyIcon = "<i class='far fa-star'></i>"
  var fullIcon = "<i class='fas fa-star'></i>"
  var ratings = ""
  for (var i = 0; i < 5; i++) {
    if ( i < stars){
      ratings += fullIcon
    }else if (i >= stars) {
      ratings += emptyIcon

    }
  }
  var tempData = {
    titolo: serie.name,
    titoloOriginale: serie.original_name,
    linguaOriginale: serie.original_language,
    voto: serie.vote_average,
    rating: ratings
  }


  // handlebars che appende il template
  var template = $("#template").html();
  var compiled = Handlebars.compile(template)
  var li = compiled(tempData)
  var ul = $("#ul-list-series");
  ul.append(li)

}



function getAjaxFilm(userInput){

  var outData = {
    api_key: "ecfb7a9fb11cf779a17e5ed15359ab26",
    language: "it-IT",
    query: userInput
  }

  $.ajax({

    url:"https://api.themoviedb.org/3/search/movie",
    method:"GET",
    data: outData,
    success: function(data){
      h1Film = $(".h1-film")
      h1Film.removeClass("hide")
      h1Film.addClass("active")
      for (var i = 0; i < data.results.length; i++) {
        var film = data.results[i];
        addFilmTitle(film)
      };

    },
    error: function(){
      alert("Errore - Se non hai inserito nulla nella ricerca prova a ricercare qualcosa!")
    }

  });

};

function getAjaxSeries(userInput){

  var outData = {
    api_key: "ecfb7a9fb11cf779a17e5ed15359ab26",
    language: "it-IT",
    query: userInput
  }

  $.ajax({

    url:"https://api.themoviedb.org/3/search/tv",
    method:"GET",
    data: outData,
    success: function(data){
      h1Serie = $(".h1-serie")
      h1Serie.removeClass("hide")
      h1Serie.addClass("active")
      for (var i = 0; i < data.results.length; i++) {
        var serie = data.results[i];
        addSeriesTitle(serie)
      };

    },
    error: function(){
      alert("Errore - Se non hai inserito nulla nella ricerca prova a ricercare qualcosa!")
    }

  });

};



function clearInput(input){
  input.val("")
}

function clearList(listFilm, listSeries){
  listFilm.html("")
  listSeries.html("")
}

function searchWithClick(e) {
  var userInput = $("#input")
  var keyPressed = e.which
  var filmList = $("#ul-list-film")
  var seriesList = $("#ul-list-series")


  if(keyPressed == 13) {
    var inputVal = userInput.val();
    getAjaxFilm(inputVal);
    getAjaxSeries(inputVal)
    clearInput(userInput);
    clearList(filmList, seriesList);
  };
};

function searchWithButton(){
  var userInput = $("#input");
  var inputVal = userInput.val();
  var filmList = $("#ul-list-film")
  var seriesList = $("#ul-list-series")
  getAjaxFilm(inputVal);
  getAjaxSeries(inputVal);
  clearInput(userInput);
  clearList(filmList, seriesList);
};





function init(){
  var button = $("button");
  var list = $("#ul-list")
  var userInput = $("#input");
  button.click(searchWithButton);
  userInput.keyup(searchWithClick);

};



$(document).ready(init)
