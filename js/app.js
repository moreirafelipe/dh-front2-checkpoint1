//selecionando todos os inputs para verificação se está vazio
const inputs = document.querySelectorAll('input')
//pegando o comentário
const comentario = document.querySelector("textarea")
//peguei o botao enviar pelo ID
const botaoEnviar = document.getElementById("botaoEnviar")
//selecionando elemento calendario
let calendar = document.getElementById("calendar");
//selecionar a div que conterá os cards
let divCards = document.getElementById("cards")
//selecionar o numero de caracteres da textarea
let divCaracteres = document.getElementById("numCaracteres");


/* INICIO: ATUALIZEI EM 07/09 - FELIPE */
//propriedade para executar quaisquer funções ao carregar a página
window.onload = _ => {

    defineCalendario();

}

//Funções gerais
//Função para criar calendário e ajustar sua data atual
const defineCalendario = _ => {

    /* Ajustando data inicial do calentádio */
    let today = new Date()

    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();

    /* Adiciona 0 na frente de numeros menores que 10*/
    day < 10 ? day = '0'+ day : null;
    month < 10 ? month = '0'+ month : null;

    /* Definindo valor do input do calendario para a data atual */
    calendar.value = `${day}/${month}/${year}`;

    /*Instanciando objeto calendário com opções personalizadas*/
    flatpickr(calendar, {
        /* Definindo data minima e data padrão como data atual */
        minDate: new Date(year, month, day),
        defaultDate: new Date(year, month, day),

        /* Definindo formato de data para pt-BR */
        dateFormat: "d/m/Y",
        "locale": "pt"
    });
    
}/* FIM: ATUALIZEI EM 07/09 - FELIPE */

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

/* CONTAR NUMERO DE CARACTERES - 07/09 - Dâmares */
/* OBS: usando apenas um evento (keydown, keypress, keyup) ele não conta o primeiro caracter
por isso foram add dois eventos e assim é contado corretamente*/
comentario.addEventListener("keydown", function(){
    divCaracteres.innerHTML = comentario.value.length + "/" + 150;
})
comentario.addEventListener("keyup", function(){
    divCaracteres.innerHTML = comentario.value.length + "/" + 150;
})



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
        userImg.src = `../assets/${element}.jpg`
        userImg.alt = `Fotografia de uma viagem à ${element}`
    }
})



/* Criar cards - 07/09 - Dâmares */
botaoEnviar.addEventListener('click', function(event){
    event.preventDefault();

    //INICIO: ATUALIZEI EM 08/09 - DUYLLYAN
    //zerando o contador do textarea
    comentario.value = "";
    divCaracteres.innerHTML = comentario.value.length + "/" + 150;
    //FIM: ATUALIZEI EM 08/09 - DUYLLYAN

    const card = document.createElement("div");
    card.setAttribute("class", "cards")

    const title = document.createElement("h2");
    title.setAttribute("class", "tituloCard")
    title.innerHTML = perfil.value

    const img = document.createElement("img")
    img.setAttribute("src", userImg.src)

    const text = document.createElement("p");
    text.setAttribute("class", "paragCard")
    text.innerHTML = comentario.value
    
    card.appendChild(title)
    card.appendChild(img)
    card.appendChild(text)
    
    divCards.appendChild(card) 
})