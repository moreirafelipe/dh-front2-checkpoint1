//selecionando todos os inputs para verificação se está vazio
const inputs = document.querySelectorAll('input')
//pegando o comentário
const comentario = document.querySelector("textarea")
//peguei o botao enviar pelo ID
const botaoEnviar = document.getElementById("botaoEnviar")
//selecionando elemento calendario
let calendar = document.getElementById("calendar");

//Função para manipulação de dados dos campos do formulário ao carregar a página
window.onload = _ => {

    /* Ajustando data inicial do calentádio */
    let today = new Date()

    let year = today.getFullYear();
    /* Definindo getMonth() + 1 pois, o método returna os meses a partir do index 0 */
    let month = today.getMonth()+1;
    let day = today.getDate();

    /* Adiciona 0 na frente de numeros menores que 10*/
    day < 10 ? day = '0'+ day : null;
    month < 10 ? month = '0'+ month : null;

    let minDate= year+"-"+month+"-"+day;
/*    Teste para definição de periodo personalizado: let maxDate= year+"-"+month+"-"+30; */
    calendar.setAttribute("min", minDate)
/*  Teste para definição de periodo personalizado: calendar.setAttribute("max", maxDate) */
    calendar.value=minDate
    console.log(calendar);
}

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