var nickname;
function redirectLobby() {

    nickname = document.getElementById('nickname').value;

    if (nickname==="") {
        //alert("Enter your username");
    }

    else {
        sessionStorage.setItem('nickname', document.getElementById('nickname').value);
        document.location.href = "roomSelection.html";
    }

}

var nickname1;
function redirectTeam() {

    nickname1 = document.getElementById('nickname1').value;


    if (nickname1==="" ) {
        //console.log(rooms);
    }

    else {
        newLobby();
        sessionStorage.setItem('nickname1', document.getElementById('nickname1').value);
        document.location.href = "teamSelection.html";
    }


}

