function checaCookie(){
    if (navigator.cookieEnabled == true){
        alert('cookie permitido')
    }else{
        alert('cookie não permitido')
    }
}

function minhaFuncao()
{
    var minhaInput=document.getElementById("meuInput");
    minhaInput.value=(minhaInput.value).toUpperCase();
}

//tipos de elementos
// <input> com type="checkbox", "color", "date"
// "datetime", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range"
// "reset", "search", "submit", "tel", "text", "time", "url", "week"
// <select>
// <textarea>

function aperta(){
    var status = document.getElementById("status")
    status.innerHTML = "você soltou o botão do mouse"
}

function clica(){
    var status = document.getElementById("status2")
    status.innerHTML = "você clicou o botão do mouse"
}