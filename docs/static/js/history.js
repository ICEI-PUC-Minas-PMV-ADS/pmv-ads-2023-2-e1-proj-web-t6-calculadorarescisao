const mes = {
  Jan: "Janeiro",
  Feb: "Fevereiro",
  Mar: "Março",
  Apr: "Abril",
  May: "Maio",
  Jun: "Junho",
  Jul: "Julho",
  Aug: "Agosto",
  Sep: "Setembro",
  Oct: "Outubro",
  Nov: "Novembro",
  Dez: "Dezembro",
}

function dateFormatter(date) {
  const arrayDate = date.split(" ")
  return `${arrayDate[2]} de ${mes[arrayDate[1]]}, ${arrayDate[3]}`
}

function showValue(value) {
  document.getElementById("informacoes").textContent = `O valor de sua rescisão será de ${value}`;
}

function getHistory() {
  if (localStorage.getItem("calculos")) {
    const calculos = JSON.parse(localStorage.getItem("calculos"));
    const cards = document.getElementById("cards");

    calculos.valores.forEach(element => {
      cards.children[0].innerHTML += `
        <div class="w-96 h-64 shadow-lg hover:shadow-xl" onclick=showValue("${element.valor}")>
          <div class="historico-data bg-blue-500 rounded-t-lg">
            <time datetime="2023-10-24">${dateFormatter(element.data)}</time>
          </div>
          <div class="text-black">
            <p>Resultado: ${element.valor}</p>
            <br>
            <p>Motivo: ${element.motivo}</p>
          </div>
        </div>
        `
    });
  }
}

export function showOnHistory(valor, data, motivo) {
  const cards = document.getElementById("cards");
  cards.children[0].innerHTML += `
        <div class="w-96 h-64 shadow-lg hover:shadow-xl" onclick=showValue("${valor}")>
          <div class="historico-data bg-blue-500 rounded-t-lg">
            <time datetime="2023-10-24">${dateFormatter(data)}</time>
          </div>
          <div class="text-black">
            <p>Resultado: ${valor}</p>
            <br>
            <p>Motivo: ${motivo}</p>
          </div>
        </div>
        `
} 

getHistory()
