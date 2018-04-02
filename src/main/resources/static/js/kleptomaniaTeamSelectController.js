var stompClient = null;
var TeamControllerModule = (function () {

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
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/currentPlayers.'+lobby, function (data) {
                players = JSON.parse(data.body);
                showCurrentPlayers(players);
            });

        });
    };

    var loadPlayers = function(currentRoomNumber){
        console.log("LoadPlayers ROOM: " + currentRoomNumber);
        connect(currentRoomNumber);
        RestControllerModule.getCurrentPlayers(currentRoomNumber);
    };

    var loadingCurrentPlayers = function () {
        nickname = sessionStorage.getItem('nickname');
        nickname1 = sessionStorage.getItem('nickname1');
        if(nickname1!=null){
            console.log('Room(nickname1) is not null:  ' + nickname1);
            loadPlayers(nickname1);
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
        putPlayers: putPlayers
    };
})();
