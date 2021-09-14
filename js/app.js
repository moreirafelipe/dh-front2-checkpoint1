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
let perfil = document.getElementById('perfil');
let userImg = document.getElementById('userImg')
//Guardando div de input para url de imagem personalizada
let novaUrl = document.getElementById('urlUser');
//atribui um valor como parâmetro para a função deletarCard() e que servirá para comparar c/ o index dele no array
let indexCard=0;




/* INICIO: ATUALIZEI EM 07/09 - FELIPE */
//propriedade para executar quaisquer funções ao carregar a página
window.onload = _ => {

    defineCalendario(); 

    let getObj = JSON.parse(localStorage.getItem('login'));
    getObj[getObj.length - 1].id != null ? mantemCards() : null;
    getObj[getObj.length - 1].lastIndex != null ? indexCard =  getObj[getObj.length - 1].lastIndex : null;
}

//Funções gerais
//Função que cria cards e mantem cards - ATUALIZEI - 08/09 - FELIPE
const criarCards = (titulo, imrUrl, comentario, id) => {
   
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
    

  
    //botão para deletar o card
    const btnDeletarCard = document.createElement("button")
    btnDeletarCard.setAttribute('type', 'submit')
    btnDeletarCard.setAttribute("id", "btnCard")

    // evento onclick que recebe o valor da variável indexCard como parâmetro
    btnDeletarCard.setAttribute('onclick', "excluirCard("+ id+")")
    
    const textButton = document.createTextNode("X")
    btnDeletarCard.append(textButton)
    card.appendChild(btnDeletarCard)

  
    card.appendChild(title)
    card.appendChild(img)
    card.appendChild(text)
    
    
    divCards.appendChild(card)
}

//Função para recuperar dados do usuario ao fechar página
const mantemCards = () => {

    let getObj = JSON.parse(localStorage.getItem('login'));

   /*  indexCard=0; */
    getObj.forEach((element) => {

        /* Chamando função para criar os cards com dados recuperados do localStorage*/
        criarCards(element.titulo, element.imagem, element.comentario, element.id);

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
    if (element == 'outro') {
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
                fetch(novoPerfil.value, { method: 'HEAD' })//possivel tbm usar GET
                .then(res => {
                    if (res.ok) {
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

        
        // Dâmares - input para informar o destino - início 09/09
        // captura a div no html que conterá o input para nome do destino
        let localUser = document.getElementById('localUser')

        // cria label para input do destino
        let labelDestino = document.createElement('label')
        let labelText2 = document.createTextNode("Destino")
        labelDestino.append(labelText2)

        // criar input para digitar o nome do destino
        let destino = document.createElement('input')
        destino.setAttribute('type', 'text')
        destino.setAttribute('placeholder', 'Digite o nome do destino')
        
        localUser.appendChild(labelDestino)
        localUser.appendChild(destino)

        //O destino digitado é armazenado na varíavel perfil
        perfil = destino;
        // Fim - criação do input para digitar nome do destino - Dâmares - 09/09
    }

    /* Se usuario escolher opção diferente de "outro", ele apaga o input de url */
    else if (element != '') {
        novaUrl.innerHTML='';
        localUser.innerHTML='';
        userImg.src = `../assets/${element}.jpg`
        userImg.alt = `Fotografia de uma viagem à ${element}`
    }
})//FIM - ATUALIZEI INSERIR IMAGENS ALEATORIAS POR URL - FELIPE - 09/09

/* CRIAR CARDS - 07/09 - Dâmares */
/* ATUALIZEI - 08/09 - FELIPE - localStorage */
botaoEnviar.addEventListener('click', function(event){
    event.preventDefault();

    /* Definindo array local temporário para ser inicicializado a cada inserção de card */
    let arrayObjetos = [];

    indexCard+=1;

    /* Definindo objeto com dados do card atual */
    /* let newObj = {"id": indexCard, "titulo": perfil.value, "imagem": userImg.src, "comentario": comentario.value}; */

     /* Recupedando array de objetos atual*/
     let getObj = JSON.parse(localStorage.getItem('login'));

      /* Chamando função para criar os cards */
      criarCards(perfil.value, userImg.src, comentario.value, indexCard);

    /* Verifica se o localStorage esta vazio e se o usuario quer memorizar cards para decidir se deve recuperar dados do localStorage */
    if(getObj[getObj.length - 1].id==null && cardCheck.checked == true) {
        getObj[0].id = indexCard;
        getObj[0].titulo = perfil.value;
        getObj[0].imagem = userImg.src;
        getObj[0].comentario = comentario.value;
        getObj[0].lastIndex = indexCard;

        localStorage.removeItem('login');

        /* Insere o array temporario convertido em JSON no localStorage */
        localStorage.setItem('login', JSON.stringify(getObj));
        indexCard = getObj[getObj - 1].id;

    } else if (cardCheck.checked == true) {   
    
        /* Recupera dados dos cards antigos do localStorage para renderizar na tela e insere cada um no array com forEach*/ 
        let getObj = JSON.parse(localStorage.getItem('login'));
        indexCard =  getObj[getObj.length - 1].lastIndex + 1;

        let newObj = {"nome": getObj[getObj.length - 1].nome, "email": getObj[getObj.length - 1].email, "password": getObj[getObj.length - 1].password ,"id": indexCard, "titulo": perfil.value, "imagem": userImg.src, "lastIndex": indexCard, "comentario": comentario.value}

        getObj.forEach(element => {
            element.lastIndex = indexCard;
            arrayObjetos.push(element);
        });

        /* Insere dados do novo card no array de objetos temporario */
        arrayObjetos.push(newObj)

        /* Apaga localStorage para receber array atualizado com cards antigos e novos */
        localStorage.removeItem('login');

        /* Insere o array temporario convertido em JSON no localStorage */
        localStorage.setItem('login', JSON.stringify(arrayObjetos));

        indexCard = arrayObjetos[arrayObjetos - 1].id;
    }

    /* FIM ATUALIZEI - 08/09 - FELIPE - localStorage */

    //INICIO: ATUALIZEI EM 08/09 - DUYLLYAN
    //zerando o contador do textarea
    comentario.value = "";
    divCaracteres.innerHTML = comentario.value.length + "/" + 150;

    //FIM: ATUALIZEI EM 08/09 - DUYLLYAN
})


/* Função para deletar o card individualmente - 10/09*/
function excluirCard(id){
    let getArray= JSON.parse(localStorage.getItem('login'))

    // findIndex percorre o array e compara o valor do index de cada objeto com o parâmetro passado
    let index = getArray.findIndex(element => element.id == id)

    // splice deleta um elemento do array e retorna o array modificado. Recebe dois parâmetros: posição do primeiro item a ser excluído e o número de elementos a serem excluídos.
    
    if(getArray.length > 1) {
        getArray.splice(index, 1)
    } else {
        getArray[0].id = null;
        getArray[0].titulo = null;
        getArray[0].imagem = null;
        getArray[0].comentario = null;
    }
    
    // retorna o novo array para o localstorage
    let arrayJson = JSON.stringify(getArray)
    localStorage.setItem('login', arrayJson)

    // recarrega a página após a exclusão do card
    document.location.reload(true);
}
