$(document).ready(function () {
  characterList();
  specificChar();
});

function characterList() {
  var settings = {
    "url": "https://www.breakingbadapi.com/api/characters",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);


    var characters = response;
    characters.forEach(el => {
      var element = '<div class="col m4 s12" style="border: 5px solid transparent;" id="' + el.char_id + '">';
      element += '<a href="#charModal" class="modal-trigger"><div class="card-panel filter z-depth-4" style="height: 300px; border-radius: 10px; background-image: url(' + el.img + '); background-size: cover; backdrop-filter: blur(50px);"><section style="backdrop-filter: blur(10px); top:70px"><h5 class="white-text text-darken-2" style="font-weight: 700">' + el.name + '</h5></section></div></a></div>';
      $("#list").append(element);

      // modal time

      /*
      var modalElement = '<div id="modal'+el.char_id+'" class="modal z-depth-4" style="border-radius: 15px;"><div class="modal-content"><h4>'+el.name+'</h4><p>A bunch of text</p></div></div>'

      $('#modalList').append(modalElement);*/

    });

  });
}

function specificChar() {
  /*$(".col").click( function(event){
    console.log(event);
  });*/

  let charID = null
  $("#list").on('click', '.col', function (event) {
    charID = $(this).attr('id');
    console.log(charID);


    var settings = {
      "url": "https://www.breakingbadapi.com/api/characters/" + charID,
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
      //console.log(response);
      let character = response;


      var element = '<div><h5>' + character[0].name + '</h5>';
      element += '<img src="' + character[0].img + '">'
      element += '<p>Birthday: ' + character[0].birthday;
      element += '<br>Occupation: ' + character[0].occupation;
      element += '<br>Nickname: ' + character[0].nickname;
      element += '<br>Status: ' + character[0].status + '</p></div>';
      //console.log(element);
      $('#singleChar').append(element);


    });

  });

}