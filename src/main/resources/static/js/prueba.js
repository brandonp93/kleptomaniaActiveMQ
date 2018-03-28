var stompClient = null;
function thief(){
    console.log("ENTROOOOOOOOOOOOOOO");
    axios({
        method: 'put',
        url: 'lobby/1/thief',
        data: {nickname: nickname}
    }).then(function (response) {
        console.log("ENTROOOOOOOOOOOOOOO");
    })
        .catch(function (error) {
            console.log(error);
    });
}

function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/currentPlayers', function (data) {
            dataa = JSON.parse(data.body);

    });


    });
}

$(document).ready(
    nickname = sessionStorage.getItem('nickname'),
    thief(),
    function () {
        axios.get('/lobby/1/thief').then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        console.info('loading script!...');
        connect();

    });