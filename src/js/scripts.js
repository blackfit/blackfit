window.onload = function () {

    const cpf = document.getElementById("cpf");
    const busca = document.getElementById("pesquisa");

    const maskOptions = {
        mask: '000.000.000-00'
    };

    const maskCpf = IMask(cpf, maskOptions);

    busca.addEventListener("click", () => {
        carregarTreino(maskCpf.masked.value);
    });
};


function desativaCampo(idElement) {
    let obj = document.getElementById(idElement);

    if (!obj.style.color) {
        obj.classList.add('selected')
        upDownProgress(true);
    } else {
        obj.classList.remove('selected')
        upDownProgress(false);
    }

}

function upDownProgress(cond) {

    const qtd_selected = document.querySelectorAll('.selected').length

    const statusBar = document.querySelector(".progress"); 
    statusBar.style.transition = "all 0.8s ease-in-out";
    
    const per = document.querySelector(".treino-aluno").childElementCount;
    const qtd = 172 / per;

    const valorAtual = (statusBar.style.padding).split('px')[0];

    const result = cond ? qtd + Math.round(valorAtual) : Math.round(valorAtual) - qtd;
    const resultFinal = Math.round(Math.abs(result))

    statusBar.style.padding = `${ resultFinal }px`;  

    const totalPerCent = Math.round(((100/per) * qtd_selected))

    console.warn(`Total per cent: ${totalPerCent}`)
    axios.patch('https://blackfitapp.herokuapp.com/api/alunos/progress', {
        cpf: localStorage.getItem('cpf'),
        dia: localStorage.getItem('dia'),
        progresso: totalPerCent
    })
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
        console.log( { msg: error } )
    })

    if (Math.round(result + 1) >= 172 ) {
        let name = document.getElementById("aluno").innerHTML;
        setTimeout(() => alert(`Parabéns ${name}, treino concluido!`), 800);

    }

}


function carregarTreino(cpf) {

    console.log(cpf)

    axios.get(`https://blackfitapp.herokuapp.com/api/alunos/${cpf}`)
    .then(function (response) {
        const dpns = document.querySelectorAll('.dpn')

        for(let dpn of dpns) {
          dpn.classList.remove('dpn')
        }

        const card = document.querySelector(".card")
        card.remove()
        montarTreino(response.data);
    })
    .catch(function (error) {
        console.log(error)
        return alert("Este aluno não existe")
    })
}


function salvarBrowser(cpf, dia){
    deleteBrowser()
    localStorage.setItem('cpf', cpf)
    localStorage.setItem('dia', dia)
}

function deleteBrowser(){
    localStorage.removeItem('cpf')
    localStorage.removeItem('dia')
}

function montarTreino(user) {

    const data = new Date(); 

    const { cpf, nome, semana } = user
    const { dia, serie, legenda } = semana[data.getDay()]

   salvarBrowser(cpf, data.getDay())

    document.getElementById("dia").textContent = `${dia} -`
    document.getElementById("aluno").textContent = `${nome.toUpperCase()}`


    const raiz = document.querySelector(".treino-aluno")

    for (let i in serie) {

        let filhoTemp = document.createElement("li")

        let labelTemp = document.createElement("label")
        labelTemp.setAttribute("class", "checkbox-label")

        let inputTemp = document.createElement("input")
        inputTemp.setAttribute("type", "checkbox")

        let spanTemp = document.createElement("span")
        spanTemp.setAttribute("class", "checkbox-custom")

        let endId = `selecionar-${i}`
        filhoTemp.setAttribute("id", endId)

        let spanText = document.createElement("span")
        let text = document.createTextNode(serie[i])

        spanText.appendChild(text)
        filhoTemp.appendChild(spanText)

        filhoTemp.appendChild(labelTemp)

        inputTemp.setAttribute("onchange", `desativaCampo('${endId}')`)

        labelTemp.appendChild(inputTemp)
        labelTemp.appendChild(spanTemp)

        raiz.appendChild(filhoTemp)
    }

    const ol = document.getElementById("legenda")
    const legendas = legenda


    for (let t in legendas)  {

        let elementLi = document.createElement("li")
        let textLi = document.createTextNode(legendas[t])

        elementLi.appendChild(textLi)
        ol.appendChild(elementLi)
    }

}
