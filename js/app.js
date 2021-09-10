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
//Selecionar checkbox de memorizar cartao
let cardCheck = document.getElementById('cardcheck')
//PERFIL
const perfil = document.getElementById('perfil');
let userImg = document.getElementById('userImg')

let novaUrl = document.getElementById('urlUser');

/* INICIO: ATUALIZEI EM 07/09 - FELIPE */
//propriedade para executar quaisquer funções ao carregar a página
window.onload = _ => {

    defineCalendario();
    localStorage.length != 0 ? mantemCards() : null;

}

//Funções gerais
//Função que cria cards e mantem cards - ATUALIZEI - 08/09 - FELIPE
const criarCards = (titulo, imrUrl, comentario) => {

    const card = document.createElement("div");
    card.setAttribute("class", "cards")

    const title = document.createElement("h2");
    title.setAttribute("class", "tituloCard")
    title.innerHTML = titulo

    const img = document.createElement("img")
    img.setAttribute("src", imrUrl)

    const text = document.createElement("p");
    text.setAttribute("class", "paragCard")
    text.innerHTML = comentario
    
    card.appendChild(title)
    card.appendChild(img)
    card.appendChild(text)
    
    divCards.appendChild(card)
}

//Função para recuperar dados do usuario ao fechar página
const mantemCards = () => {

    let obj = JSON.parse(localStorage.getItem('card'));

    console.log(obj)

    obj.forEach((element) => {

        /* Chamando função para criar os cards com dados recuperados do localStorage*/
        criarCards(element.titulo, element.imagem, element.comentario);

    });
}//FIM - Função que cria cards e mantem cards - ATUALIZEI - 08/09 - FELIPE

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

//ATUALIZEI INSERIR IMAGENS ALEATORIAS POR URL - FELIPE - 09/09
//TODO: CONSERTAR O ERRO QUE CRUIA VARIOS INPUTS QUANDO 'OUTROS' é selecionado
//TODO: Ajustar o ALT
perfil.addEventListener('change', event => {
    let element = event.target.value

    /* Verifica se usuario escolheu perfil de viajem como outro e se a div de nova url não tem inpus*/
    /* Isto evita que um novo input seja criado sempre que ele escolher a opção outro */
    if (element == 'outro' && novaUrl.innerHTML == '') {
        novaUrl = document.getElementById('urlUser')
        let label = document.createElement('label')
        let labelText = document.createTextNode("URL")
        label.append(labelText)

        let novoPerfil = document.createElement('input')
        novoPerfil.setAttribute('type', 'URL')
        novoPerfil.setAttribute('placeholder', 'Informe a url da sua imagem')
        novaUrl.appendChild(label)
        novaUrl.appendChild(novoPerfil)

        /* Escutador de eventos que define imagem do preview ao tirar foco do campo de url */
        /* Ajustado para quando o usuario cola a url com teclado ou mouse */
        novoPerfil.addEventListener('focusout', _ => {       

            /* Se o usuário deixar o campo de url vazio, a imagem padrão ficará */
            if(novoPerfil.value.length == 0) {
                userImg.src="../assets/mala.jpeg"
    
            } else {

                /* Se o campo não for vazio, uma requisição http é feita via API JS de consulta - fetch */
                /* Se o link retornar como válido, ele define a imagem, senão, ele define imagem invállida */
                fetch(novoPerfil.value, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        userImg.setAttribute("src", `${novoPerfil.value}`)
                    } else {
                        userImg.setAttribute("src", "../assets/invalida.jpg")
                    }
                }).catch(err => {
                    userImg.setAttribute("src", "../assets/invalida.jpg")
                    console.log(err)
                });
            }
        })
    }

    /* Se usuario escolher opção diferente de "outro", ele apaga o input de url */
    else if (element != '') {
        novaUrl.innerHTML='';
        userImg.src = `../assets/${element}.jpg`
        userImg.alt = `Fotografia de uma viagem à ${element}`
    }
})//FIM - ATUALIZEI INSERIR IMAGENS ALEATORIAS POR URL - FELIPE - 09/09

/* Criar cards - 07/09 - Dâmares */
/* ATUALIZEI - 08/09 - FELIPE - localStorage */
botaoEnviar.addEventListener('click', function(event){
    event.preventDefault();

    /* Chamando função para criar os cards */
    criarCards(perfil.value, userImg.src, comentario.value);

    /* Definindo array local temporário para ser inicicializado a cada inserção de card */
    let arrayObjetos = [];
    /* Definindo objeto com dados do card atual */
    let newObj = {"titulo": perfil.value, "imagem": userImg.src, "comentario": comentario.value};

    /* Verifica se o localStorage esta vazio e se o usuario quer memorizar cards para decidir se deve recuperar dados do localStorage */
    if(localStorage.length == 0 && cardCheck.checked == true) {
        arrayObjetos.push(newObj)

        /* Insere o array temporario convertido em JSON no localStorage */
        localStorage.setItem('card', JSON.stringify(arrayObjetos));

    } else if (cardCheck.checked == true) {    
        /* Recupera dados dos cards antigos do localStorage para renderizar na tela e insere cada um no array com forEach*/ 
        let getObj = JSON.parse(localStorage.getItem('card'));
        getObj.forEach(element => {
            arrayObjetos.push(element);
        });

        /* Insere dados do novo card no array de objetos temporario */
        arrayObjetos.push(newObj)
        /* Apaga localStorage para receber array atualizado com cards antigos e novos */
        localStorage.removeItem('card');

        /* Insere o array temporario convertido em JSON no localStorage */
        localStorage.setItem('card', JSON.stringify(arrayObjetos));
    }

    /* FIM ATUALIZEI - 08/09 - FELIPE - localStorage */

    //INICIO: ATUALIZEI EM 08/09 - DUYLLYAN
    //zerando o contador do textarea
    comentario.value = "";
    divCaracteres.innerHTML = comentario.value.length + "/" + 150;
    //FIM: ATUALIZEI EM 08/09 - DUYLLYAN
})

console.log(this.localStorage.length)