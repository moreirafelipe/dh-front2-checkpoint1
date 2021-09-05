//selecionando todos os inputs para verificação se está vazio
const inputs = document.querySelectorAll('input')
//pegando o comentário
const comentario = document.querySelector("textarea")
//peguei o botao enviar pelo ID
const botaoEnviar = document.getElementById("botaoEnviar")

//função para verificação se está vazio
botaoEnviar.addEventListener("click", (event) => {//event recebe o click
    inputs.forEach(element => {
        if (element.value == "") {
            event.preventDefault()
            // alert("Preencha corretamente") decidir o que vamos fazer, se vai ser div, texto, etc...
            //pode ser um createelement, appendchild e depois um p
        }
    })
})

//função para limitar a quantidade de caracteres
// comentario.addEventListener("keyup", (event)=>{
//     let conteudoComentario = comentario.value
//     if(conteudoComentario.length > 1){
//         console.log(conteudoComentario)
//         event.target.preventDefault()
//     }
// })

//evitar de colocar datas passadas
// console.log(Date().toString())

//adicionar contador regressivo na textarea

//PERFIL
const perfil = document.getElementById('perfil');
const userImg = document.getElementById('userImg')

//TODO: CONSERTAR O ERRO QUE CRUIA VARIOS INPUTS QUANDO 'OUTROS' é selecionado
//TODO: Ajustar o ALT
perfil.addEventListener('change', event => {
    let element = event.target.value

    if (element == 'outro') {
        // const novoPerfil = document.createElement('input')
        //     novoPerfil.placeholder = 'Digite o perfil'
        //     novoPerfil.id = 'novoPerfil'
        //     document.getElementById('perfilContainer').appendChild(novoPerfil)
    }
    else if (element != '') {
        userImg.src = `/assets/${element}.jpg`
        userImg.alt = `Fotografia de uma viagem à ${element}`
    }
})