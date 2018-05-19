var stompClient = null;
var connect = function () {
    var socket = new SockJS('/stompendpoint');
    var nickname = sessionStorage.getItem('nickname');
    console.log("nickname: ",nickname);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/updateGame.', function (data) {
            players = JSON.parse(data.body);
        });
        stompClient.subscribe('/topic/end.', function () {

        });
    });
};

$(document).ready(
    function () {
        console.info('loading script!...');
        connect();
        canvas = document.getElementById('cnv');
        ctx = canvas.getContext('2d');


        window.addEventListener('keydown', function (e) {
            key = e.keyCode;
            moverPersonaje(key);
            console.log(key);
        });
        window.addEventListener('keyup', function (e) {
            key = false;
        });
    });
