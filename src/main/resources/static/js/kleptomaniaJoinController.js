var rooms;
/*function makeTableScroll() {
    console.log("ME ejecute");
    var maxRows = 5;

    var table = document.getElementById('blueTable');
    var wrapper = table.parentNode;
    var rowsInTable = table.rows.length;
    var height = 0;
    if (rowsInTable > maxRows) {
        for (var i = 0; i < maxRows; i++) {
            height += table.rows[i].clientHeight;
        }
        wrapper.style.height = height + "px";
    }
    rooms = getRooms(function(){
        loadCurrentGames();
    });
}*/
/**
**/
var nickname;


    function loadCurrentGames() {
        currentGames = document.getElementById('blueTable').value;
        var row = table.insertRow(table.length);
        console.log(rooms);
    }

    function joinRoom () {
        nickname = document.getElementById('nickname').value;
        sessionStorage.setItem('nickname', document.getElementById('nickname').value);

    }




    function newLobby() {

        var numero = document.getElementById("nickname1").value;
        console.log("NUM; " +numero);

        axios({
            method: 'post',
            url: '/lobby',
            data: {roomNumber: numero,host: {nickname: sessionStorage.getItem('nickname')}}
        }).then(function (response) {
            console.log(response);

        })
            .catch(function (error) {
                console.log(error);

            });

    }

    function getRooms(){
        console.log('Ejecutando---------');
        axios.get('/lobby').then(function (response) {
            console.log(response);
            rooms = response['data'];
            showCurrentRooms(rooms);
        }).catch(function (error) {
            console.log(error);
        });
    }

    function showCurrentRooms(rooms) {
        var table = document.getElementById("currentRooms");
        var row = table.insertRow(table.length);
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        for (var i in rooms){
            console.log("i: " + rooms[i])
            var tr = document.createElement("tr");
            var td0 = document.createElement("td");
            var td = document.createElement("td");
            td.setAttribute('value',rooms[i]['roomNumber']);
            td.setAttribute('onClick','goToRoom(this)');

            td.appendChild(document.createTextNode(rooms[i]['roomNumber']));
            td0.appendChild(document.createTextNode(rooms[i]['host']['nickname']));
            tr.appendChild(td);
            tr.appendChild(td0);
            table.appendChild(tr);
        }
    }

    function joining(roomNumber){
        console.log("Entre al puto put " + roomNumber);
        axios({
            method: 'put',
            url: 'lobby/'+roomNumber+'/thief',
            data: {nickname: sessionStorage.getItem('nickname')}
        }).then(function (response) {
            console.log(roomNumber);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    var invitedRoom;
    function goToRoom(roomNumber) {
        console.log('Lo lograste papu: ' + roomNumber.innerText)
        invitedRoom = roomNumber.innerText;
        sessionStorage.setItem('invitedRoom', invitedRoom);
        joining(roomNumber.innerText);
        //getCurrent(roomNumber.innerText);
        document.location.href = "teamSelection.html";
    }



$( document ).ready(function() {
    console.log( "ready! to start room Conecct" );
    roomsConnect();
});
