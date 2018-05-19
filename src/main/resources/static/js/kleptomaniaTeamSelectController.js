var stompClient = null;
var TeamControllerModule = (function () {
     var lobb = null;
     var showCurrentPlayers = function (players) {
        console.log("Show players: " + players);
        var table = document.getElementById("currentPlayers");
        var row = table.insertRow(table.length);
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        var tr0 = document.createElement("tr");
        var th = document.createElement("th");
        var h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode('Players'));
        th.appendChild(h3);
        tr0.appendChild(th);
        table.appendChild(tr0);
        for (var i in players){
            console.log("i: " + players[i])
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(players[i]['nickname']));
            tr.appendChild(td);
            table.appendChild(tr);
        }
    };

    var connect = function (lobby) {
        lobb = lobby;
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/currentPlayers.'+lobby, function (data) {
                players = JSON.parse(data.body);
                showCurrentPlayers(players);
            });
            stompClient.subscribe('/topic/play.'+lobby, function () {
                console.log('Redirecciona');
                document.location.href = "play.html";
            });
        });
    };

    var loadPlayers = function(currentRoomNumber){
        console.log("LoadPlayers ROOM: " + currentRoomNumber);
        connect(currentRoomNumber);
        RestControllerModule.getCurrentPlayers(currentRoomNumber);
    };

    var newGame = function () {
        stompClient.send('/topic/play.'+lobb, {},{});
    }

    var loadingCurrentPlayers = function () {
        //Player Name
        nickname = sessionStorage.getItem('nickname');
        //Lobby number
        nickname1 = sessionStorage.getItem('nickname1');
        console.log("nickname normal: ",nickname);
        if(nickname1!=null){
            console.log('Room(nickname1) is not null:  ' + nickname1);
            loadPlayers(nickname1);
            var startGameNow = document.getElementById("startGame");
            var button =  document.createElement("input");
            button.setAttribute('type','button');
            button.setAttribute('onClick', 'TeamControllerModule.newGame()');
            button.setAttribute('value', 'Play');
            startGameNow.appendChild(button)
        }
        else{
            invitedRoom = sessionStorage.getItem('invitedRoom');
            console.log('Invitado: ' + invitedRoom);
            loadPlayers(invitedRoom);
        }
    };

    var putPlayers = function (currentPlayers) {
        showCurrentPlayers(currentPlayers);
    };

    return{
        loadingCurrentPlayers: loadingCurrentPlayers,
        newGame: newGame,
        putPlayers: putPlayers
    };
})();
