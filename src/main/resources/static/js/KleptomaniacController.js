

/**
**/
function compare(){
    if (len(document.getElementById("Nick").value)>0){
        document.getElementById("addUser").setAttribute("disabled","false");
    }
}
function registerUser(){
    var usern = document.getElementById("nick");
    alert("Usuario "+usern.value+" agregado");
}