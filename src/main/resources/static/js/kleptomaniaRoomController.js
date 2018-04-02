var invitedRoom;
var stompClient = null;
var RoomControllerModule = (function () {

    var showCurrentRooms = function(rooms) {
        console.log("Showing current 1: " + rooms);
        var table = document.getElementById("currentRooms");
        var row = table.insertRow(table.length);
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        var tr0 = document.createElement("tr");
        var th0 = document.createElement("th");
        var th = document.createElement("th");
        th0.appendChild(document.createTextNode('ROOM'));
        th.appendChild(document.createTextNode('NAME'));
        tr0.appendChild(th0);
        tr0.appendChild(th);
        table.appendChild(tr0);
        for (var i in rooms) {
            console.log("i: " + rooms[i])
            var tr = document.createElement("tr");
            var td0 = document.createElement("td");
            var td = document.createElement("td");
            td.setAttribute('value', rooms[i]['roomNumber']);
            td.setAttribute('onClick', 'RoomControllerModule.goToRoom(this)');
            td.appendChild(document.createTextNode(rooms[i]['roomNumber']));
            td0.appendChild(document.createTextNode(rooms[i]['host']['nickname']));
            tr.appendChild(td);
            tr.appendChild(td0);
            table.appendChild(tr);
        }
    };

    var goToRoom = function (roomNumber) {
        invitedRoom = roomNumber.innerText;
        sessionStorage.setItem('invitedRoom', invitedRoom);
        RestControllerModule.joining(roomNumber.innerText);
        //getCurrent(roomNumber.innerText);
        document.location.href = "teamSelection.html";
    };

    var roomsConnect = function (){
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/currentRooms.', function (data) {
                //location.reload();
                rooms = JSON.parse(data.body);
                console.log("ROOMS CONEECT: DATA " + rooms);
                showCurrentRooms(rooms);
            });

        });
    };

    var loadRooms = function () {
        roomsConnect();
        RestControllerModule.getRooms();
    };

    var putRooms = function (currentRoom) {
        showCurrentRooms(currentRoom);
    };

    return {
        goToRoom: goToRoom,
        loadRooms: loadRooms,
        putRooms: putRooms
    };

})();
