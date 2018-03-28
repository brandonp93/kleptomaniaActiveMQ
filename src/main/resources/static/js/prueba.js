var stompClient = null;
function thief(lobby){

    axios({
        method: 'put',
        url: 'lobby/'+lobby+'/thief',
        data: {nickname: nickname}
    }).then(function (response) {
        console.log(lobby);
    })
        .catch(function (error) {
            console.log(error);
    });
}

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
        stompClient.subscribe('/topic/Player.', function () {
            console.log("lobby: " + lobby)
            console.log("DARA");
            console.log(dataa);

        });
        callback(lobby);
    });

}

function getCurrent(lobby) {
    console.log("GET CUREEN PAPU");
    axios.get('/lobby/'+lobby+'/thief').then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });

}
function cargar() {
    stompClient.send("/topic/currentPlayers.1", {},JSON.stringify([{"nickname":"brendon","identification":null}]));


}

$(document).ready(
    nickname = sessionStorage.getItem('nickname'),

    console.info('loading script!... '),
    connect(1,function (){
        thief(1);
    })



    );