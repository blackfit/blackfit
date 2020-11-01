window.onload = function () {

    const cpf = document.getElementById("cpf");
    const busca = document.getElementById("pesquisa");

    const maskOptions = {
        mask: '000.000.000-00'
    };

    const maskCpf = IMask(cpf, maskOptions);

    busca.addEventListener("click", () => {
        carregarTreino(maskCpf);
    });
};


function desativaCampo(idElement) {
    let obj = document.getElementById(idElement);

    if (!obj.style.color) {
        obj.style.color = "#7A7A7A";
        upDownProgress(true);
    } else {
        obj.style.color = null;
        upDownProgress(false);
    }

}

function upDownProgress(cond) {

    const statusBar = document.querySelector(".progress"); 
    statusBar.style.transition = "all 0.8s ease-in-out";
    
    const per = document.querySelector(".treino").childElementCount;
    const qtd = 172 / per;

    const valorAtual = (statusBar.style.padding).split('px')[0];

    const result = cond ? qtd + Math.round(valorAtual) : Math.round(valorAtual) - qtd;

    statusBar.style.padding = `${ Math.round(Math.abs(result)) }px`;  

    if (Math.round(result + 1) >= 172 ) {
        let name = document.getElementById("aluno").innerHTML;
        setTimeout(() => alert(`Parabéns ${name}, treino concluido!`), 800);
    }

}


function carregarTreino(cpf) {

    axios.get(`https://blackfitapp.herokuapp.com/api/alunos/${cpf}`)
    .then(function (response) {


        const dpns = document.querySelectorAll('.dpn')

        for(let dpn of dpns) {
          dpn.classList.remove('dpn')
        }

        const card = document.querySelector(".card")
        card.remove()
 
        console.log(response.data)
        
        montarTreino(response.data);

    })
    .catch(function (error) {
        console.log(error)
        return alert("Este aluno não existe")
    })
}


function salvarBrowser(cpf){
    localStorage.setItem('id', cpf);
}

function montarTreino(user) {

    const data = new Date(); 

    const { nome, semana } = user
    const { dia, serie, legenda } = semana[data.getDay()]

    document.getElementById("dia").textContent = `${dia} -`;
    document.getElementById("aluno").textContent = `${nome.toUpperCase()}`;

    const raiz = document.querySelector(".treino");

    for (let i in serie) {

        let filhoTemp = document.createElement("li");

        let labelTemp = document.createElement("label");
        labelTemp.setAttribute("class", "checkbox-label");

        let inputTemp = document.createElement("input");
        inputTemp.setAttribute("type", "checkbox");

        let spanTemp = document.createElement("span");
        spanTemp.setAttribute("class", "checkbox-custom");

        let endId = `selecionar-${i}`;
        filhoTemp.setAttribute("id", endId);

        let spanText = document.createElement("span");
        let text = document.createTextNode(serie[i]);

        spanText.appendChild(text);
        filhoTemp.appendChild(spanText);

        filhoTemp.appendChild(labelTemp);

        inputTemp.setAttribute("onchange", `desativaCampo('${endId}')`);

        labelTemp.appendChild(inputTemp);
        labelTemp.appendChild(spanTemp);

        raiz.appendChild(filhoTemp);
    }

    const ol = document.getElementById("legenda");
    const legendas = legenda;


    for (let t in legendas)  {

        let elementLi = document.createElement("li");
        let textLi = document.createTextNode(legendas[t]);

        elementLi.appendChild(textLi);
        ol.appendChild(elementLi);
    }

}
