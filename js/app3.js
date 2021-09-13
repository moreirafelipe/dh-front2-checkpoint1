let email = document.getElementById('campoEmail')
let recuperarLogin = document.getElementById('recuperarLogin')
let msgConfirmacao = document.getElementById('confirmEnvio')



recuperarLogin.addEventListener("click", function(event){
    event.preventDefault()
    if(email.value == ""){
        alert("Por favor, informe o e-mail")
    }else{
        email.value = "";
        msgConfirmacao.style.margin = '50px 0'
        msgConfirmacao.innerHTML = 'E-mail para recuperação de senha enviado !';
    }
    
})
