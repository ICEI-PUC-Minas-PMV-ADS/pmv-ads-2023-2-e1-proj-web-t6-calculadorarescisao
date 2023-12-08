import utils from "./utils.js"

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
  Dec: "Dezembro",
}

const motivos = {
  justacausa: "Dispensa de justa causa",
  semjustacausa: "Dispensa sem justa causa",
  pedidodemissao: "Pedido de demissão",
  demissaocomumacordo: "Demissão de comum acordo",
  contratonoprazo: "Encerramento de contrato de experiência no prazo",
  contratoantesprazo: "Encerramento de contrato de experiência antes do prazo",
  aposentadoria: "Aposentadoria do Empregado",
  falecimento: "Falecimento do Empregador",
}

window.addEventListener("load", (event) => {
  const cards = document.getElementsByClassName("cards-historico");
  for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", (event) => {
      const cardId = utils.getCardId(event.target)
      const cardValue = utils.getCardValue(cardId);
      if (cardValue){
        utils.adicionarTabelaRescisao(cardValue);
      }
    })
  }
});

function dateFormatter(date) {
  const arrayDate = date.split(" ")
  return `${arrayDate[2]} de ${mes[arrayDate[1]]}, ${arrayDate[3]}`
}

function getHistory() {
  if (localStorage.getItem("calculos")) {
    const calculos = JSON.parse(localStorage.getItem("calculos"));
    const historico = document.getElementById("historico");

    calculos.valores.forEach(element => {
      historico.children[0].innerHTML += `
        <div class="w-96 h-64 shadow-lg cards-historico hover:shadow-xl" card-id="${element.id}">
          <div class="historico-data bg-blue-500 rounded-t-lg">
            <time datetime="2023-10-24">${dateFormatter(element.data)}</time>
          </div>
          <div class="historico-texto text-black">
            <p>Calculo de ${motivos[element.motivo.replaceAll("-", "")]},</p>
            <p>tendo o valor da rescisão de ${utils.formatarValorMonetario(element.valor.rescisao.total)}</p>
          </div>
        </div>
        `
    });
  }
}

function showOnHistory(valor, data, motivo, id) {
  const historico = document.getElementById("historico");
  historico.children[0].innerHTML += `
        <div class="w-96 h-64 shadow-lg cards-historico hover:shadow-xl" card-id="${id}">
          <div class="historico-data bg-blue-500 rounded-t-lg">
            <time datetime="2023-10-24">${dateFormatter(data)}</time>
          </div>
          <div class="historico-texto text-black">
            <p>Calculo de ${motivos[motivo.replaceAll("-", "")]},</p>
            <p>tendo o valor da rescisão de ${utils.formatarValorMonetario(valor)}</p>
          </div>
        </div>
        `
} 

export function saveCalc(valoresRescicao, motivo) {
  let calculos = JSON.parse(localStorage.getItem("calculos")) || {valores: []}
  const tamanhoValores = calculos.valores.length;
  if (tamanhoValores === 5) {
    calculos.valores.splice(0, 1);
    const cards = document.getElementsByClassName("cards-historico");
    cards[0].remove();
  }
  const dataCalculo = new Date();

  calculos.valores.push({
    data: dataCalculo.toDateString(),
    valor: valoresRescicao,
    motivo: motivo,
  })

  calculos.valores.forEach((valor, index) => {
    calculos.valores[index] = {...valor, id: index};
  });

  localStorage.setItem("calculos", JSON.stringify(calculos));
  showOnHistory(
    utils.formatarValorMonetario(valoresRescicao.rescisao.total),
    dataCalculo.toDateString(),
    motivo,
    tamanhoValores
  );
}

getHistory()
