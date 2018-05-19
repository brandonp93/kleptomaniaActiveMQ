var RestControllerModule = (function () {

    var newLobby = function () {
        var numero = document.getElementById("nickname1").value;
        console.log("REsT controller room: POST " + numero);
        axios({
            method: 'post',
            url: '/lobby',
            data: {roomNumber: numero,host: {nickname: sessionStorage.getItem('nickname')}}
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
                console.log(error);
            });
    };

    var getRooms = function (){
        axios.get('/lobby').then(function (response) {
            console.log(response);
            rooms = response['data'];
            RoomControllerModule.putRooms(rooms);
        }).catch(function (error) {
            console.log('There are no rooms currently, please create a new one.');
        });
    };

    var joining = function (roomNumber){
        axios({
            method: 'put',
            url: 'lobby/'+roomNumber+'/thief',
            data: {nickname: sessionStorage.getItem('nickname')}
        }).then(function (response) {
            console.log(roomNumber);
        }).catch(function (error) {
                console.log(error);
            });
    };


    var getCurrentPlayers =  function (lobby) {
        axios.get('/lobby/'+lobby+'/thief').then(function (response) {
            console.log(response);
            console.log("Get current players respuesta: " +response['data']);
            TeamControllerModule.putPlayers(response['data']);
        }).catch(function (error) {
            console.log(error);
        });

    }

    var getPlayerId = function (lobby,nickname) {
        console.log("Imprimiendo el nickname que llega por parametro: ", nickname);
        console.log("Imprimiendo el lobby que llega por parametro: ", lobby);
        axios.get('/lobby/'+lobby+'/'+nickname).then(function (response) {
            console.log(response);
            console.log("Se deberia imprimir la letra con creatingposition")
            GameModelModule.creatingPosition(response['data']);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return {
        newLobby: newLobby,
        getRooms: getRooms,
        joining: joining,
        getPlayerId: getPlayerId,
        getCurrentPlayers: getCurrentPlayers
    };

})();
