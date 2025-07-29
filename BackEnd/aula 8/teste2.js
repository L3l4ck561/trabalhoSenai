function checaCookie(){
    if (navigator.cookieEnabled == true){
        alert('cookie permitido')
    }else{
        alert('cookie não permitido')
    }
}

document.onload = checaCookie();