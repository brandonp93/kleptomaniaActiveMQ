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
        console.log('Ejecutando---------');
        axios.get('/lobby').then(function (response) {
            console.log(response);
            rooms = response['data'];
            RoomControllerModule.putRooms(rooms);
        }).catch(function (error) {
            console.log('There are no rooms currently, please create a new one.');
        });
    };

    var joining = function (roomNumber){
        console.log("Entre al puto put " + roomNumber);
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
        console.log("GET CUREEN players prueba PAPU: " +lobby );
        axios.get('/lobby/'+lobby+'/thief').then(function (response) {
            console.log(response);
            console.log("Get current players respuesta: " +response['data']);
            TeamControllerModule.putPlayers(response['data']);
        }).catch(function (error) {
            console.log(error);
        });

    }

    return {
        newLobby: newLobby,
        getRooms: getRooms,
        joining: joining,
        getCurrentPlayers: getCurrentPlayers
    };

})();