window.onload = function () {

  const cpf = document.getElementById("cpf");
  const busca = document.getElementById("pesquisa");



  if(localStorage.getItem('cpf')) {
    cpf.value = localStorage.getItem('cpf')
  }


  const maskOptions = {
    mask: '000.000.000-00'
  };

  const maskCpf = IMask(cpf, maskOptions)


  if(busca) {
    busca.addEventListener("click", () => {
      if (maskCpf.masked.value === '123.456.789-10') 
        return pageAdmin(maskCpf.masked.value)
      return alert('Opa, você não é o ThiagoBlackFit')
  });
  }
  

};


function redirecionarInicio(){
  window.location.href = "http://blackfit.github.io/admin.html"
}

function salvarBrowser(cpf){
  deleteBrowser()
  localStorage.setItem('cpf', cpf)
}

function deleteBrowser(){
  localStorage.removeItem('cpf')
}

function pageAdmin(cpf) {


  salvarBrowser(cpf)


  const dpns = document.querySelectorAll('.dpn')

  for(let dpn of dpns) {
    dpn.classList.remove('dpn')
  }
  
  const card_admin = document.querySelector('.card-admin')
  card_admin.classList.add('dpn')


  axios.get(`https://blackfitapp.herokuapp.com/api/alunos`)
  .then(function (response) {  
      startHome(response.data);
  })
  .catch(function (error) {
      console.log(error)
      return alert("Este aluno não existe")
  })



}


function startHome(data) {

  const pai = document.querySelector('.alunos')

  const dia = new Date().getDay()

  for(let aluno of data) {

    let classAluno = document.createElement('div')
    classAluno.setAttribute('class', 'aluno')

    let nomeAlunoElement = document.createElement('p')
    let nomeAlunoText    = document.createTextNode(`Aluno: ${aluno.nome}`)

    nomeAlunoElement.appendChild(nomeAlunoText)
    classAluno.appendChild(nomeAlunoElement)

    let progressoAlunoElement = document.createElement('p')
    let progressoAlunoText    = document.createTextNode(`PROGRESSO DO DIA: ${aluno.semana[dia].progresso}%`)

    progressoAlunoElement.appendChild(progressoAlunoText)
    classAluno.appendChild(progressoAlunoElement)


    /* ACOES */

    let editarAlunoAncora = document.createElement('a')
    editarAlunoAncora.setAttribute('onclick', `editarAluno('${aluno.cpf}')`)
    editarAlunoAncora.setAttribute('href', '#void')
    let editarAlunoText = document.createTextNode('Editar')
    editarAlunoAncora.appendChild(editarAlunoText)

    classAluno.appendChild(editarAlunoAncora)

    let excluirAlunoAncora = document.createElement('a')
    excluirAlunoAncora.setAttribute('onclick', `excluirAluno('${aluno.cpf}')`)
    excluirAlunoAncora.setAttribute('href', '#void')
    let excluirAlunoText = document.createTextNode('Excluir')
    excluirAlunoAncora.appendChild(excluirAlunoText)

    classAluno.appendChild(excluirAlunoAncora)

    pai.appendChild(classAluno)
    
  }


}


/* START FUNC CRIAR AULO */

function concluirTreino() {

  /* DADOS ALUNO */


  const cpf  = document.querySelector('#cpf').value
  const nome = document.querySelector('#nome').value

  
  console.log(`Aluno: ${nome} Cpf: ${cpf}`)

  

  if(nome && cpf) {
    

    /* ====== SEGUNDA ======== */

    const serie_seg_exer   =  document.querySelectorAll('.so-treino-seg input')
    const legenda_seg_exer = document.querySelectorAll('.so-legendas-seg input')

    const serie_seg = arrayTreinoSerie(serie_seg_exer)
    const legenda_seg = arrayTreinoLegenda(legenda_seg_exer)

    /* ====== TERÇA ======== */

    const serie_ter_exer  = document.querySelectorAll('.so-treino-ter input')
    const legenda_ter_exer = document.querySelectorAll('.so-legendas-ter input')

    const serie_ter = arrayTreinoSerie(serie_ter_exer)
    const legenda_ter = arrayTreinoLegenda(legenda_ter_exer)

    /* ====== QUARTA ======== */


    const serie_qua_exer  = document.querySelectorAll('.so-treino-qua input')
    const legenda_qua_exer = document.querySelectorAll('.so-legendas-qua input')

    const serie_qua = arrayTreinoSerie(serie_qua_exer)
    const legenda_qua = arrayTreinoLegenda(legenda_qua_exer)


    /* ====== QUINTA ======== */

    const serie_qui_exer  = document.querySelectorAll('.so-treino-qui input')
    const legenda_qui_exer = document.querySelectorAll('.so-legendas-qui input')

    const serie_qui = arrayTreinoSerie(serie_qui_exer)
    const legenda_qui = arrayTreinoLegenda(legenda_qui_exer)


    /* ====== SEXTA ======== */


    const serie_sex_exer  = document.querySelectorAll('.so-treino-sex input')
    const legenda_sex_exer = document.querySelectorAll('.so-legendas-sex input')

    const serie_sex   = arrayTreinoSerie(serie_sex_exer)
    const legenda_sex = arrayTreinoLegenda(legenda_sex_exer)

    /* ====== SABADO ======== */


    const serie_sab_exer   =  document.querySelectorAll('.so-treino-sab input')
    const legenda_sab_exer =  document.querySelectorAll('.so-legendas-sab input')

    const serie_sab   = arrayTreinoSerie(serie_sab_exer)
    const legenda_sab = arrayTreinoLegenda(legenda_sab_exer) 

    const novoAluno = {
      cpf,
      nome,
      semana: [
        {
          legenda: ['Sem observações de treino'],
          serie: ['DIA LIVRE'],
          dia: "DOMINGO"
        },{
          legenda: legenda_seg,
          serie: serie_seg,
          dia: "SEGUNDA"
        },{
          legenda: legenda_ter,
          serie: serie_ter,
          dia: "TERÇA"
        },{
          legenda: legenda_qua,
          serie: serie_qua,
          dia: "QUARTA"
        },{
          legenda: legenda_qui,
          serie: serie_qui,
          dia: "QUINTA"
        },{
          legenda: legenda_sex,
          serie: serie_sex,
          dia: "SEXTA"
        },{
          legenda: legenda_sab,
          serie: serie_sab,
          dia: "SABÁDO"
        }
      ]
    }

    console.log(JSON.stringify(novoAluno))
  
    axios.post('https://blackfitapp.herokuapp.com/api/alunos/criar', novoAluno)
    .then(function (response) {
      console.log(response)
      return alert('Novo aluno criado')
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {
      redirecionarInicio()
    })
  }else{
    return alert("Você esqueceu de digitar o nome ou cpf")
  }

}

function arrayTreinoSerie(serie) {

  const result = []

  for (let i = 0; i < serie.length; i++) {
    if(serie[i].value) {
      result.push(serie[i].value)
    }
  }

  if(result.length == 0) return 'DIA LIVRE'
  return result

}

function arrayTreinoLegenda(legenda) {
  const result = []

  for (let i = 0; i < legenda.length; i++) {
    if(legenda[i].value) {
      result.push(legenda[i].value)
    }
  }

  if(result.length == 0) return 'Sem observações de treino...'
  return result
}

function getDayNumber(dia) {
  if(dia === 'seg') return 0
  else if (dia === 'ter') return 1
  else if(dia === 'qua') return 2
  else if(dia === 'qui') return 3
  else if(dia === 'sex') return 4
  else if(dia === 'sab') return 5
  return 1
}

function definirDia(dia) {


  const treino_ativo_button = document.querySelector('.ondayactive')
  treino_ativo_button.classList.add('offdayactive')
  treino_ativo_button.classList.remove('ondayactive')
  

  const treino_ativo_form = document.querySelector('.onday')
  treino_ativo_form.classList.add('offday')
  treino_ativo_form.classList.remove('onday')

  const buttons = document.querySelectorAll('.semana button')
  const this_button = buttons[getDayNumber(dia)]
  this_button.classList.add('ondayactive')
  this_button.classList.remove('offdayactive')

  const treino_inative_form = document.querySelector(`#${dia}`)
  treino_inative_form.classList.add('onday')
  treino_inative_form.classList.remove('offday')

}

function novoCampo() {


  const dia = document.querySelector('.onday').getAttribute('id')

  console.log('entrou campos')
  const pai = document.querySelector(`.so-treino-${dia}`)

  console.log(pai.childElementCount)

  const input = document.createElement('input')

  input.setAttribute('type', 'text')
  input.setAttribute('class', 'treinos')
  input.setAttribute('name', `treino-${dia}-${pai.childElementCount}`)
  input.setAttribute('id', `treino-${dia}-${pai.childElementCount}`)
  input.setAttribute('placeholder', 'Digite o treino')

  pai.appendChild(input)

}

function novaLegenda() {

  const dia = document.querySelector('.onday').getAttribute('id')

  console.log('entrou legendas')
  const pai = document.querySelector(`.so-legendas-${dia}`)

  console.log(pai.childElementCount)

  const input = document.createElement('input')

  input.setAttribute('type', 'text')
  input.setAttribute('class', 'legendas')
  input.setAttribute('name', `legenda-${dia}-${pai.childElementCount}`)
  input.setAttribute('id', `legenda-${dia}-${pai.childElementCount}`)
  input.setAttribute('placeholder', 'Digite a legenda')

  pai.appendChild(input)

}


/* END FUNC CRIAR ALUNO */


/* STAR FUNC EXCLUIR ALUNO */

function excluirAluno(id) {
  axios.delete(`https://blackfitapp.herokuapp.com/api/alunos/${id}`)
  .then(function (response) {
    console.log(response)
    return alert('Aluno deletado..')
  })
  .catch(function (error) {
    console.log(error)
  })
  .finally(function () {
    redirecionarInicio()
  })
}

/* END FUNC EXCLUIR ALUNO */
