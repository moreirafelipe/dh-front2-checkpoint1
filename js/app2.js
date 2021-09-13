const inputs = document.querySelectorAll('input')
let nome = document.getElementById('campoNome')
let email = document.getElementById('campoEmail')
let password = document.getElementById('password')
const loginChecked = document.getElementById('loginChecked')
const btnLogin = document.getElementById('fazerLogin')


window.onload = _ => {
    mantemLogin();
}


/* armazenar dados de login no local storage */
btnLogin.addEventListener("click",function(){
    if(loginChecked.checked == true){
        let loginDates = {nome: nome.value, email: email.value, password: password.value}
        localStorage.setItem('login', JSON.stringify(loginDates));
    }
})


/* recuperar dados de login do localstorage */
const mantemLogin = () => {
    let loginDates = JSON.parse(localStorage.getItem('login'));
    nome.value = loginDates.nome
    email.value = loginDates.email
    password.value = loginDates.password
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

