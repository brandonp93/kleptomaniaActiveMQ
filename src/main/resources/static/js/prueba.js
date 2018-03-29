var stompClient = null;
function connect(lobby) {

    console.log("CONEECT PAPU cpnnect para palyers: " + lobby);
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/currentPlayers.'+lobby, function (data) {
            dataa = JSON.parse(data.body);
            console.log('Unnknown data: ' + dataa)
            getCurrentPlayers(lobby);
        });

    });
}




function getCurrentPlayers(lobby) {
    console.log("GET CUREEN players prueba PAPU: " +lobby );
    axios.get('/lobby/'+lobby+'/thief').then(function (response) {
        console.log(response);
        console.log("Get current players respuesta: " +response['data']);
        showCurrentPlayers(response['data'])
    }).catch(function (error) {
        console.log(error);
    });

}

function showCurrentPlayers(players) {
    var table = document.getElementById("currentPlayers");
    var row = table.insertRow(table.length);
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (var i in players){
        console.log("i: " + players[i])
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(players[i]['nickname']));
        tr.appendChild(td);
        table.appendChild(tr);
    }
}





$(document).ready(function () {
        nickname = sessionStorage.getItem('nickname');
        nickname1 = sessionStorage.getItem('nickname1');
        if(nickname1!=null){

                console.info('loading script!... ' + nickname1),
                connect(nickname1);
                getCurrentPlayers(nickname1);
        }
        else{
            invitedRoom = sessionStorage.getItem('invitedRoom');
            console.log('Invitado: ' + invitedRoom);
            connect(invitedRoom);
            getCurrentPlayers(invitedRoom);
        }

});





    /*connect(nickname1,function (){
        thief(nickname1);
    })*/



