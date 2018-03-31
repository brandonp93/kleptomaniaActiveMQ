var nickname;
var nickname1;
var RedirectControllerModule = (function () {
    var redirectLobby = function () {
        nickname = document.getElementById('nickname').value;
        if (nickname==="") {
            //alert("Enter your username");
        }
        else {
            console.log("Nickname(var nickname) Redirect: " + nickname);
            sessionStorage.setItem('nickname', document.getElementById('nickname').value);
            document.location.href = "roomSelection.html";
        }
    };
    var redirectTeam = function () {
            nickname1 = document.getElementById('nickname1').value;
            console.log("REDIRECTEAM: " + nickname1)
            if (nickname1==="" ) {
                //console.log(rooms);
            }
            else {
                RestControllerModule.newLobby();
                console.log("Sala(var nickname1) Redirect: " + nickname1);
                sessionStorage.setItem('nickname1', document.getElementById('nickname1').value);
                document.location.href = "teamSelection.html";
            }
    };

    return{
        redirectLobby: redirectLobby,
        redirectTeam: redirectTeam
    }
});