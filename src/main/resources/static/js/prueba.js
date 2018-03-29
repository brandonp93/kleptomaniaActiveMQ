var stompClient = null;


function connect(lobby,callback) {
    console.log("CONEECT PAPU");
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/currentPlayers.'+lobby, function (data) {
            dataa = JSON.parse(data.body);
            console.log("lobby: " + lobby)
            console.log("DARA");
            console.log(dataa);

        });
        callback(lobby);
    });

}

function getCurrent(lobby) {
    console.log("GET CUREEN PAPU: " +lobby );
    axios.get('/lobby/'+lobby+'/thief').then(function (response) {
        console.log(response);
        showCurrentPlayers(response['data'])
    }).catch(function (error) {
        console.log(error);
    });

}

function showCurrentPlayers(players) {
    var table = document.getElementById("currentPlayers");
    var row = table.insertRow(table.length);
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
                connect(nickname1,function (){
                    getCurrent(nickname1);
                })
        }
        else{
            invitedRoom = sessionStorage.getItem('invitedRoom');
            console.log('Invitado: ' + invitedRoom);
        }


}


    /*connect(nickname1,function (){
        thief(nickname1);
    })*/

    );

