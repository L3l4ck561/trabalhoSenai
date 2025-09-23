const input = document.querySelectorAll('.inputArea')
const print = document.querySelectorAll('.print')

function salvar(cod = 0) {
    switch (cod) {
        case 0:
            localStorage.setItem("nome-usuario", input[0].value)
            break;
        case 1:
            sessionStorage.setItem("nome-usuario2", input[1].value)
            break;
        case 2:
            const preferencias = {
                tema: "escuro",
                notificacaoes: true,
                idioma: 'pt-BR',
                nomeUsuario: localStorage.getItem("nome-usuario")
            }
            // convertendo objeto para string
            //salvando string localstorage
            localStorage.setItem("preferencias-usuario", JSON.stringify(preferencias))
            break;
    }
    printar()
}
function printar() {
    const nome = localStorage.getItem("nome-usuario")
    if (nome) {
        print[0].textContent = nome
    } else {
        print[0].textContent = 'resuntado...'
    }

    const nome2 = sessionStorage.getItem("nome-usuario2")
    if (nome2) {
        print[1].textContent = nome2
    } else {
        print[1].textContent = 'resuntado...'
    }

    const preferenciasUsuarioString = localStorage.getItem("preferencias-usuario")
    print[2].textContent = preferenciasUsuarioString
}

function pagar(cod = 0) {
    switch (cod) {
        case 0:
            localStorage.removeItem("nome-usuario")
            input[0].value = ''
            break;
        case 1:
            sessionStorage.removeItem("nome-usuario2")
            input[1].value = ''
            break;
        case 2:
            localStorage.removeItem("preferencias-usuario")
            print[2].innerHTML = ''
            break;
    }
    printar()
}

window.onload = function () {
    printar()
}