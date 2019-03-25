function addTitle(film){

  var template = $("#li-template").html();
  var compiled = Handlebars.compile(template)
  var li = compiled(film)

  var ul = $("#ul-list");
  ul.append(li)
}



function getAjax(userInput){

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
      for (var i = 0; i < data.results.length; i++) {
        var film = data.results[i];
        addTitle(film)
      }

    },
    error: function(){
      alert("Error")
    }

  })



}

function clearInput(input){
  input.val("")
}

function clearList(list){
  list.html("")
}

function searchWithClick(e) {
  var userInput = $("#input")
  var keyPressed = e.which
  var list = $("#ul-list")

  if(keyPressed == 13) {
    var inputVal = userInput.val();
    getAjax(inputVal);
    clearInput(userInput);
    clearList(list);
  }
};

function searchWithButton(){
  var userInput = $("#input");
  var inputVal = userInput.val();
  var list = $("#ul-list")
  getAjax(inputVal);
  clearInput(userInput);
  clearList(list);
}





function init(){
  var button = $("button");
  var list = $("#ul-list")
  var userInput = $("#input");
  button.click(searchWithButton);
  userInput.keyup(searchWithClick);
}



$(document).ready(init)
