const inputs = document.querySelectorAll('input')
let nome = document.getElementById('campoNome')
let email = document.getElementById('campoEmail')
let password = document.getElementById('password')
const loginChecked = document.getElementById('loginChecked')
const btnLogin = document.getElementById('fazerLogin')


window.onload = _ => {
    /* Se houver login salvo, ele carrega dados do usuario no form de login*/
    localStorage.length != 0 ?  mantemLogin() : null;
}


/* armazenar dados de login no local storage */
btnLogin.addEventListener("click",function(){

    /* Array temporario para criar/ atualizar objetos */
    let localArray = [];

    /* Cria novo n]objeto card */
    /* Contém dados de login, e dados do card por login realizado */
    /* No primeiro login de sessão, dados de card da sessão são nulos */

    let newData = {"nome": nome.value, "email": email.value, "password": password.value ,"id": null, "titulo": null, "imagem": null, "comentario": null, lastIndex: null}

    /* Se usuario quer guardar login, e nunca salvou dados, ele só coloca novo login no localStorage */
    if(loginChecked.checked == true && localStorage.length == 0){
        localArray.push(newData);
        localStorage.setItem('login', JSON.stringify(localArray));
        /* Atualiza LocalStorage com dados antigos e novo login de sessão caso não seja primeiro login */
    } else if (loginChecked.checked == true && loginDates.length == 0) {
        let loginData = JSON.parse(localStorage.getItem('login'));
        loginData.push(newData);
        localStorage.setItem('login', JSON.stringify(loginData));
    }
})


/* recuperar dados de login do localstorage */
const mantemLogin = () => {
    let loginDates = JSON.parse(localStorage.getItem('login'));
    nome.value = loginDates[loginDates.length - 1].nome
    email.value = loginDates[loginDates.length - 1].email
    password.value = loginDates[loginDates.length - 1].password
}


/* verificar se campos estão vazios */
btnLogin.addEventListener("click", (event) => {
        if (nome.value == "") {
            event.preventDefault()
            alert("Informe seu nome completo") 
        }
        if (email.value == "") {
            event.preventDefault()
            alert("Informe o seu email") 
        }
        if (password.value == "") {
            event.preventDefault()
            alert("Informe a sua senha") 
        }
    })

