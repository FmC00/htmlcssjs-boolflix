
function addFilmTitle(film){
  // ricavo il numero di stelle corretto
  var numberOfstars = film.vote_average;
  var stars = Math.round(numberOfstars)/2;


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
    rating: rating,
    flag: getFlag(film.original_language),
    urlImg: film.poster_path,
    id: film.id,
    genreIds: film.genre_ids
  }


  // handlebars che appende il template
  var template = $("#template").html();
  var compiled = Handlebars.compile(template)
  var li = compiled(tempData)
  var ul = $("#ul-list-film");
  ul.append(li)
  getCastFilm(film.id)
  getGenre(film.genre_ids,film.id )

  // genero il titolo h1"film" sopra la lista
  var h1Film = $(".film-list-h1")
  h1Film.removeClass("hide")

}

function addSeriesTitle(serie){
  // ricavo il numero di stelle corretto
  var numberOfstars = serie.vote_average;
  var stars = Math.round(numberOfstars)/2;

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
    rating: ratings,
    flag: getFlag(serie.original_language),
    urlImg: serie.poster_path,
    id: serie.id
  }


  // handlebars che appende il template
  var template = $("#template").html();
  var compiled = Handlebars.compile(template)
  var li = compiled(tempData)
  var ul = $("#ul-list-series");
  ul.append(li)
  getCastSeries(serie.id)
  getGenre(serie.genre_ids,serie.id )


  // genero il titolo h1"Serie TV" sopra la lista

  var h1Serie = $(".series-list-h1")
  h1Serie.removeClass("hide")

}

function getFlag(flag) {

  var flagImg;
  switch (flag) {

    case "en":
    flagImg = "<img src='img/bandiera_eng.svg' width= '25px'>";
    break;

    case "it":
    flagImg = "<img src='img/bandiera_ita.svg' width= '25px'>";
    break;

    default:
    flagImg = "";
  }
  return flagImg
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
      getTitles(userInput)

    },
    error: function(){
      alert("Errore - Se non hai inserito nulla nella ricerca prova a ricercare qualcosa!")
    }

  });

};

function getTitles(userInput){
  tempData = {
    filmOserie: userInput
  }
  var template = $("#template-two").html();
  var compiled = Handlebars.compile(template)
  var h1 = compiled(tempData)
  var container = $(".film-serie");
  container.append(h1)
}



function clearInput(input){
  input.val("")
}

function clearList(listFilm, listSeries){
  var title = $(".correlated-title")
  title.remove()
  listFilm.html("")
  listSeries.html("")
}

function searchWithClick(e) {
  var userInput = $("#input")
  var inputVal = userInput.val();
  var keyPressed = e.which
  var filmList = $("#ul-list-film")
  var seriesList = $("#ul-list-series")


  if(keyPressed == 13) {
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


function getCastSeries(id) {

  var castArray = "";
  var outData = {
    api_key: "ecfb7a9fb11cf779a17e5ed15359ab26",
    language: "it-IT"
  }

  $.ajax({

    url:"https://api.themoviedb.org/3/tv/"+id+"/credits",
    method: "GET",
    data: outData,
    success: function (data){
      for (var i = 0; i < 5 && i<data.cast.length; i++) {
        var cast = data.cast[i]
        var castActor = cast.name
        castArray += castActor
        castArray += "<br>"
      }
      if (castArray == "") {
        castArray +="nessuna informazione sul cast disponibile"
      }

      var filmCard = $(".film-series-details[data-id='"+id+"']")
      var liCast = filmCard.find("#cast")
      liCast.html(castArray)
    },
    error: function() {
      console.log("errore nella function getCast")
    }

  })
};


function getCastFilm(id) {

  var castArray = "";
  var outData = {
    api_key: "ecfb7a9fb11cf779a17e5ed15359ab26",
    language: "it-IT"
  }

  $.ajax({

    url:"https://api.themoviedb.org/3/movie/"+id+"/credits",
    method: "GET",
    data: outData,
    success: function (data){
      for (var i = 0; i < 5 && i<data.cast.length; i++) {
        var cast = data.cast[i]
        var castActor = cast.name
        castArray += castActor
        castArray += "<br>"
      }
      if (castArray == "") {
        castArray +="nessuna informazione sul cast disponibile"
      }

      var filmCard = $(".film-series-details[data-id='"+id+"']")
      var liCast = filmCard.find("#cast")
      liCast.html(castArray)
    },
    error: function() {
      console.log("errore nella function getCast")
    }

  })
};

function getGenre(genreids, filmid){

  var genreString = ""

  for (var i = 0; i < genreids.length; i++) {
    var singleID = genreids[i]
    genreString += convertID(singleID)
    genreString += "<br>"
  }
  var filmCard = $(".film-series-details[data-id='"+filmid+"']")
  var liGenre = filmCard.find("#genre")
  liGenre.html(genreString)
}

function convertID(singleID){
  var stringID = "";


  switch (singleID) {

    // generi dei film

    case 28:
    stringID = "Action"
    break;

    case 12:
    stringID = "Adventure"
    break;

    case 16:
    stringID = "Animation"
    break;

    case 35:
    stringID = "Comedy"
    break;

    case 80:
    stringID = "Crime"
    break;

    case 99:
    stringID = "Documentary"
    break;

    case 18:
    stringID = "Drama"
    break;

    case 10751:
    stringID = "Family"
    break;

    case 14:
    stringID = "Fantasy"
    break;

    case 36:
    stringID = "History"
    break;

    case 27:
    stringID = "Horror"
    break;

    case 10402:
    stringID = "Horror"
    break;

    case 9648:
    stringID = "Mistery"
    break;

    case 10749:
    stringID = "Mistery"
    break;

    case 878:
    stringID = "Science Fiction"
    break;

    case 10770:
    stringID = "TV Movie"
    break;

    case 53:
    stringID = "Thriller"
    break;

    case 10752:
    stringID = "War"
    break;

    case 37:
    stringID = "Western"
    break;

    // generi esclusivi delle series

    case 10759:
    stringID = "Action&Adventure"
    break;

    case 10762:
    stringID = "Kids"
    break;

    case 10763:
    stringID = "News"
    break;

    case 10764:
    stringID = "Reality"
    break;

    case 10765:
    stringID = "Sci-Fi & Fantasy"
    break;

    case 10766:
    stringID = "Soap"
    break;

    case 10767:
    stringID = "Talk"
    break;

    case 10768:
    stringID = "War & Politics"
    break;

    default:
    stringID = "";
  }

  if (stringID == "") {
    stringID +="nessuna informazione sul genere disponibile"
  }

  return stringID

}







function init(){
  var button = $("button");
  var userInput = $("#input");
  button.click(searchWithButton);
  userInput.keyup(searchWithClick);
};



$(document).ready(init)
