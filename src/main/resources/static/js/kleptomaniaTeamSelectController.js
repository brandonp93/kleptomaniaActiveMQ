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
        var th1 = document.createElement("th")
        var th = document.createElement("th");
        /*var h3 = document.createElement("h3");
        var h30 = document.createElement("h3")
        h3.appendChild(document.createTextNode('Players'));
        h3.appendChild(document.createTextNode('Team'));
        th.appendChild(h3);
        th1.appendChild(h30);*/
        th.appendChild(document.createTextNode('Players'));
        th1.appendChild(document.createTextNode('Team'))
        tr0.appendChild(th);
        tr0.appendChild(th1);
        table.appendChild(tr0);
        for (var i in players){
            console.log("i: " + players[i])
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var td11 = document.createElement("td");
            td.appendChild(document.createTextNode(players[i]['nickname']));
            td11.appendChild(document.createTextNode(players[i]['team']));  
            tr.appendChild(td);
            tr.appendChild(td11);
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
            stompClient.subscribe('/topic/teamChange.'+lobby, function (data) {
                newTeamPlayer = data.body;
                console.log('Cambiar de equipo Probando: ' + newTeamPlayer);
                RestControllerModule.getCurrentPlayers(lobby);
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
    };

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
            var buttonChange = document.createElement("input");
            button.setAttribute('type','button');
            button.setAttribute('onClick', 'TeamControllerModule.newGame()');
            button.setAttribute('value', 'Play');
            buttonChange.setAttribute('type','button');
            buttonChange.setAttribute('onClick', 'TeamControllerModule.changeTeam(nickname1)');
            buttonChange.setAttribute('value', 'Change Team');
            buttonChange.setAttribute('class','teamButtonChange');
            startGameNow.appendChild(button);
            startGameNow.appendChild(buttonChange);
        }
        else{
            var startGameNow = document.getElementById("startGame");
            invitedRoom = sessionStorage.getItem('invitedRoom');
            console.log('Invitado: ' + invitedRoom);
            loadPlayers(invitedRoom);
            var buttonChange =  document.createElement("input");
            buttonChange.setAttribute('type','button');
            buttonChange.setAttribute('class','teamButtonChange');
            buttonChange.setAttribute('onClick', 'TeamControllerModule.changeTeam(invitedRoom)');
            buttonChange.setAttribute('value', 'Change Team');
            startGameNow.appendChild(buttonChange);
        }
    };
    
    var changeTeam = function (lb){
        console.log('Change Team');
        nickname = sessionStorage.getItem('nickname');
        RestControllerModule.getPlayerChangeTeam(lb,nickname);
        
    };
    
    var isPossible = function(teamChar,lobby){
        console.log('isPossible');
        if(teamChar==='T'){
            console.log('isPossible T');
            RestControllerModule.getPolicias(lobby,teamChar);
        }
        else{
            console.log('isPossible C');
            RestControllerModule.getLadrones(lobby,teamChar);
        }
    };
    
    var tryToChange = function(players,teamChar,lb){
        nickname = sessionStorage.getItem('nickname');
        if(teamChar==='T'){
            if(players.length<1){
                stompClient.send("/app/teamPlayer."+lb, {}, nickname);
            }
            else{
                alert('Cops Team is Full');
            }
        }
        else{
            if(players.length<2){
                stompClient.send("/app/teamPlayer."+lb, {}, nickname);
            }
            else{
                alert('Thieves Team is Full');
            }
        }
    }
    
    var putPlayers = function (currentPlayers) {
        showCurrentPlayers(currentPlayers);
    };

    return{
        loadingCurrentPlayers: loadingCurrentPlayers,
        newGame: newGame,
        changeTeam: changeTeam,
        putPlayers: putPlayers,
        isPossible: isPossible,
        tryToChange: tryToChange
    };
})();
