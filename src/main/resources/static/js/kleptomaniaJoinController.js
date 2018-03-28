

/**
**/
var nickname;



    function joinRoom () {
        nickname = document.getElementById('nickname').value;
        sessionStorage.setItem('nickname', document.getElementById('nickname').value);

    }


    function redirect() {
        document.location.href = "teamSelection.html";
    }

    function newRoom() {
        axios({
            method: 'post',
            url: 'lobby/1',
            data: {user: nickname}
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

$(document).ready(
    newRoom()
);