window.onload = function () {

  const cpf = document.getElementById("cpf");
  const busca = document.getElementById("pesquisa");

  const maskOptions = {
      mask: '000.000.000-00'
  };

  const maskCpf = IMask(cpf, maskOptions);

  if(busca) {
    busca.addEventListener("click", () => {
      if (maskCpf.unmaskedValue === '12345678910') 
        return pageAdmin()
      return alert('Opa, você não é o ThiagoBlackFit')
  });
  }
  

};


function pageAdmin() {
  console.log('chegou aq')
  axios.get(`https://blackfitapp.herokuapp.com/api/alunos`)
  .then(function (response) {

      console.log(response.data)
      
      // montarTreino(response.data);
  })
  .catch(function (error) {
      console.log(error)
      return alert("Este aluno não existe")
  })



}

function definirDia(dia) {
  console.log(dia)
}

function novoCampo() {

  console.log('entrou campos')
  const pai = document.querySelector('.so-treino')

  console.log(pai.childElementCount)

  const input = document.createElement('input')

  input.setAttribute('type', 'text')
  input.setAttribute('class', 'treinos')
  input.setAttribute('name', `treino-${pai.childElementCount}`)
  input.setAttribute('id', `treino-${pai.childElementCount}`)
  input.setAttribute('placeholder', 'Digite o treino')

  pai.appendChild(input)

}

function novaLegenda() {

  console.log('entrou legendas')
  const pai = document.querySelector('.so-legendas')

  console.log(pai.childElementCount)

  const input = document.createElement('input')

  input.setAttribute('type', 'text')
  input.setAttribute('class', 'legendas')
  input.setAttribute('name', `legenda-${pai.childElementCount}`)
  input.setAttribute('id', `legenda-${pai.childElementCount}`)
  input.setAttribute('placeholder', 'Digite a legenda')

  pai.appendChild(input)

}
