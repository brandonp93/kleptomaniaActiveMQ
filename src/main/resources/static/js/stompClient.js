/*function connect(lobby) {
    console.log("Stomp connect print lobby: " + lobby);
    stompClient.subscribe('/topic/currentPlayers.'+lobby, function (data) {
        dataa = JSON.parse(data.body);
        console.log("lobby: " + lobby)
        console.log("DARA");
        console.log(dataa);

    });

}*/
function roomsConnect(){
    console.log("CONEECT PAPU");
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/currentRooms.', function (data) {
            //location.reload();
            getRooms();
        });

    });
}

