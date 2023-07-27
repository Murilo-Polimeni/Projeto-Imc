function calcularImc() {
  const sexo = document.querySelector("input[name='sexo']:checked").value

  const altura = Number(document.querySelector("input#altura").value) / 100
  const peso = Number(document.querySelector("input#peso").value)
  const resultado = peso / (altura * altura)
  let paragrafo = document.querySelector("p.feedback")
  let html = ``

  if (resultado < 18.5) {
    html += `Você está muito a baixo de seu peso certo, se alimente melhor`
  } else if (resultado >= 18.5 && resultado < 24.9) {
    html += `Você está em seu peso normal, muito bem! continue cuidando de sua saude`
  } else if (resultado >= 25.0 && resultado < 29.9) {
    html += `Você está com sobrepeso`
  } else if (resultado >= 30.0 && resultado < 39.9) {
    html += `Você está com obesidade`
  } else if (resultado >= 40.0) {
    html += `Você está com obesidade grave, cuidado !!`
  }

  paragrafo.innerText = html
}
