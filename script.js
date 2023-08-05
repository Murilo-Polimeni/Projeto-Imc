const ESTADO_MAGRO = "Abaixo do peso"
const ESTADO_PESOIDEAL = "Peso ideal"
const ESTADO_SOBREPESO = "SobrePeso"
const ESTADO_OBESIDADE = "Obesidade"
const ESTADO_OBESIDADEGRAVE = "Obesidade grave!"

function calcularImc() {
  const sexo = document.querySelector("input[name='sexo']:checked")

  const nome = document.querySelector("input#nome").value
  const altura = Number(document.querySelector("input#altura").value) / 100
  const peso = Number(document.querySelector("input#peso").value)
  const resultado = peso / (altura * altura)
  let paragrafo = document.querySelector("p.feedback")
  let html = ``
  let estado = ``

  if (!nome || !altura || !peso) {
    alert("Preencha os campos corretamente")
    return
  }

  if (resultado < 18.5) {
    estado = ESTADO_MAGRO
    html += `Você está muito a baixo de seu peso certo, se alimente melhor`
  } else if (resultado >= 18.5 && resultado < 24.9) {
    estado = ESTADO_PESOIDEAL
    html += `Você está em seu peso normal, muito bem! continue cuidando de sua saude`
  } else if (resultado >= 25.0 && resultado < 29.9) {
    estado = ESTADO_SOBREPESO
    html += `Você está com sobrepeso`
  } else if (resultado >= 30.0 && resultado < 39.9) {
    estado = ESTADO_OBESIDADE
    html += `Você está com obesidade`
  } else if (resultado >= 40.0) {
    estado = ESTADO_OBESIDADEGRAVE
    html += `Você está com obesidade grave, cuidado !!`
  }

  paragrafo.innerText = html
  InserirLinha(nome, altura, peso, estado)
  inserirNoLocalStorage(nome, altura, peso, estado)
}

function inserirNoLocalStorage(nome, altura, peso, estado) {
  const historicoArmazenado = localStorage.getItem("historico")
  let historico = []
  if (historicoArmazenado) {
    historico = JSON.parse(historicoArmazenado)
  }

  const pessoa = {
    nome: nome,
    altura: altura,
    peso: peso,
    estado: estado,
  }
  historico.push(pessoa)
  localStorage.setItem("historico", JSON.stringify(historico))
}

function exibirDados() {
  const historico = JSON.parse(localStorage.getItem("historico"))
  historico.forEach(function (pessoa) {
    InserirLinha(pessoa.nome, pessoa.altura, pessoa.peso, pessoa.estado)
  })
}

function limparCampos() {
  const nome = document.querySelector("input#nome")
  const altura = document.querySelector("input#altura")
  const peso = document.querySelector("input#peso")
  nome.value = ""
  altura.value = ""
  peso.value = ""
}

function InserirLinha(nome, altura, peso, estado) {
  const tbody = document.querySelector("table.historico-tabela tbody")
  const cor = getCorLinha(estado)
  tbody.insertAdjacentHTML(
    "beforeend",
    `
  <tr class="${cor}">
    <td>${nome}</td>
    <td>${altura.toFixed(2).replace(".", ",")}</td>
    <td>${peso}</td>
    <td>${estado}</td>
  </tr>
  `
  )
}

// function getCorLinha(estado) {
//   let cor = "azul"
//   if (estado === ESTADO_MAGRO || estado === ESTADO_SOBREPESO) {
//     cor = "amarelo"
//   } else if (estado === ESTADO_OBESIDADE) {
//     cor = "laranja"
//   } else if (estado === ESTADO_OBESIDADEGRAVE) {
//     cor = "vermelho"
//   }
//   return cor
// }

function getCorLinha(estado) {
  if (estado === ESTADO_MAGRO || estado === ESTADO_SOBREPESO) {
    return "amarelo"
  }
  if (estado === ESTADO_OBESIDADE) {
    return "laranja"
  }
  if (estado === ESTADO_OBESIDADEGRAVE) {
    return "vermelho"
  }
  return "azul"
}
