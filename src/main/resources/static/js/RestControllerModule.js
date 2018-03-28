/*var RestControllerModule = (function () {

    var getOrders = function (callback) {}
    ;

    var addThief = function (room,nickname,callback) {
        console.log("ROOM REST: " + room);
        console.log("Nickname REST: " + nickname);
        axios({
            method: 'put',
            url: 'lobby/'+room+"/thief",
            data: JSON.stringify({user: nickname})
        });
    };

    return {
        getOrders: getOrders,
        updateOrder: updateOrder
    };

})();*/