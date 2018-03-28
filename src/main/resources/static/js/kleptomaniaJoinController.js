var rooms;
function makeTableScroll() {
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
}
/**
**/
var nickname;
    function getRooms(callback){
        axios.get('/lobby')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        callback();
    }

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

        var numero = document.getElementById("createNewRoom").value;
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

