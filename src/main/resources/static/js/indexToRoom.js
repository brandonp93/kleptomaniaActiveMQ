var nickname;
function redirectLobby() {

    nickname = document.getElementById('nickname').value;
    sessionStorage.setItem('nickname', document.getElementById('nickname').value);
    console.log("userORM: " + nickname)

}

var userRoom;
function redirectTeam() {

    userRoom = document.getElementById('createNewRoom').value;
    sessionStorage.setItem('createNewRoom', document.getElementById('createNewRoom').value);
    console.log("userORM: " + userRoom)



}