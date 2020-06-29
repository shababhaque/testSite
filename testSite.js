$(document).ready(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAwWNbvEj58gkX7YuSuHcy51FcFT0ji1i0",
    authDomain: "breakingbad-3d014.firebaseapp.com",
    databaseURL: "https://breakingbad-3d014.firebaseio.com",
    projectId: "breakingbad-3d014",
    storageBucket: "breakingbad-3d014.appspot.com",
    messagingSenderId: "231388540413",
    appId: "1:231388540413:web:ec9488b391bfb8ccc47d94",
    measurementId: "G-0K2N5ZJ4PC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  writeCharactersToFirebase();

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
      element += '<a data-char="' + el.char_id + '" onclick="charModal(this)"><div class="card-panel filter z-depth-4" style="height: 300px; border-radius: 10px; background-image: url(' + el.img + '); background-size: cover; backdrop-filter: blur(50px);"><section style="backdrop-filter: blur(10px); top:70px"><h5 class="white-text text-darken-2" style="font-weight: 700">' + el.name + '</h5></section></div></a></div>';
      $("#list").append(element);

      // modal time
      /*
      var modalElement = '<div id="modal'+el.char_id+'" class="modal z-depth-4" style="border-radius: 15px;"><div class="modal-content"><h4>'+el.name+'</h4><p>A bunch of text</p></div></div>'
      $('#modalList').append(modalElement);*/

    });

  });
}

function specificChar() {
  //$(".col").click( function(event){
  //  console.log(event);
  //});

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

function charModal(d) {
  $("#charModal").modal('open');
  $('#charModal').empty();
  var characterID = $(d).data('char');
  var settings = {
    "url": "https://www.breakingbadapi.com/api/characters/" + characterID,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);
    const specificChar = response[0];

    let element = '<div class="modal-content row"><div class="col s6"><h4>' + specificChar.name + '</h4><p><u>Birthday</u>: ' + specificChar.birthday + '<br><u>Occupation</u>: ' + specificChar.occupation + '<br><u>Nickname</u>: ' + specificChar.nickname + '<br><u>Status</u>: ' + specificChar.status + '<br><br><u>Portrayed by</u>: ' + specificChar.portrayed + '<br><u>Seasons</u>: ' + specificChar.appearance + '</p></div><div class="col s6"><img src="' + specificChar.img + '" style="width:auto; height:250px;"></div></div>';
    $('#charModal').append(element);


  });
}

function writeCharactersToFirebase() {
  let database = firebase.database();
  //let ref = database.ref('list');

  var settings = {
    "url": "https://www.breakingbadapi.com/api/characters/",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    response.forEach(character => {
      /*let data = {
        name: character.name,
        id: character.char_id,
        img: [character.img]
      };
      ref.push(data);*/

      firebase.database().ref('characters/').set({
          name: character.name,
          id: character.char_id,
          img: [character.img]
      });

  });
});
}