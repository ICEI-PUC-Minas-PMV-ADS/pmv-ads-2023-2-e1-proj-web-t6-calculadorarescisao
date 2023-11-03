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

const formCalculo = document.getElementById("formCalculo");
formCalculo.addEventListener("submit", (event) => {
  event.preventDefault();
  let resultado = 0;
  const data = new FormData(formCalculo);
  let motivo = data.get('motivo');
  switch (motivo) {
    case "justa-causa":
      justaCausa(data);
      break;
    case "pedido-demissao":
      const recisaoPedidoDemissao = ferias + decimoTerceiro + saldoSalario;
      return recisaoPedidoDemissao;
    case "demissao-comum-acordo":
      const recisaoComumAcordo = ferias + decimoTerceiro + saldoSalario;
      return recisaoComumAcordo;
    case "contrato-no-prazo":
      const recisaoContratoNoPrazo = ferias + decimoTerceiro + saldoSalario;
      return recisaoContratoNoPrazo;
    case "contrato-antes-prazo":
      const recisaoContratoAntesPrazoIniciativaEmpregador =
        ferias + decimoTerceiro + saldoSalario + metadeDosSalariosRestantes;
      return recisaoContratoAntesPrazoIniciativaEmpregador;
    case "contrato-antes-prazo":
      const recisaoContratoAntesPrazoIniciativaEmpregado =
        ferias + decimoTerceiro + saldoSalario - metadeDosSalariosRestantes;
      return recisaoContratoAntesPrazoIniciativaEmpregado;
    case "aposentadoria":
      const recisaoAposentadoria = ferias + decimoTerceiro + saldoSalario;
      return recisaoAposentadoria;
    case "falecimento":
      const recisaoFalecimento = ferias + decimoTerceiro + saldoSalario;
      return recisaoFalecimento;
    case "sem-justa-causa":
      const recisaoSemJustaCausa = ferias + decimoTerceiro + saldoSalario;
      return recisaoSemJustaCausa;

    default:
      document.getElementById("informacoes").textContent = "nao existe";
  }

  if (!localStorage.getItem("calculos")) {
    localStorage.setItem("calculos", JSON.stringify({ valores: [] }))
  }

  let calculos = JSON.parse(localStorage.getItem("calculos"))
  const dataCalculo = new Date();

  calculos.valores.push({
    data: dataCalculo.toDateString(),
    valor: formatarValorMonetario(resultado),
    motivo: motivo,
  })

  localStorage.setItem("calculos", JSON.stringify(calculos))
  saveResult()
});

function formatarValorMonetario(numero) {
  const options = {
    style: 'currency',
    currency: 'BRL'
  };
  return numero.toLocaleString('pt-BR', options);
}

function dateFormatter(date) {
  const arrayDate = date.split(" ")
  return `${arrayDate[2]} de ${mes[arrayDate[1]]}, ${arrayDate[3]}`
}

function showValue(value) {
  document.getElementById("informacoes").textContent = `O valor de sua rescisão será de ${value}`;
}

function saveResult() {
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

function justaCausa(data) {
  let salario = parseFloat(data.get('salario'));
  let dataRecisao = data.get('dtDemissao');
  let temFeriasVencidas = data.get('feriasVencidas');
  let ferias = 0;
  let saldoSalario = (salario / 30) * dataRecisao.split("/")[0];

  if (temFeriasVencidas == "Sim") {
    ferias = salario;
    tercoFerias = saldoSalario;
  }
  let totalRescisao = saldoSalario + ferias + tercoFerias;
  let valoresRescicao = {
    Saldo_Salario: saldoSalario,
    Ferias: ferias,
    Terco_Ferias: tercoFerias,
    Total_Rescisao: totalRescisao
  }

  adicionarTabelaRescisao(valoresRescicao)

};

function adicionarTabelaRescisao(valoresRescicao) {

  const divResultado = document.getElementById("divInfo");
  if (document.getElementById("table-resultado")) {
    document.getElementById("divInfo").removeChild(document.getElementById("table-resultado"))
  }
  const tabela = document.createElement("table");
  tabela.className = "w-full table-auto bg-white shadow-md rounded-lg table-custom";
  tabela.id = "table-resultado"
  const thead = document.createElement("thead");
  thead.innerHTML = `
  <tr>
    <th class="px-4 py-2 bg-gray-200 text-gray-700">Descrição</th>
    <th class="px-4 py-2 bg-gray-200 text-gray-700">Valor (R$)</th>
  </tr>
  `;

  const tbody = document.createElement("tbody");

  for (var item in valoresRescicao) {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
    <td class="border px-4 py-2">${item.replace("_", " ")}</td>
    <td class="border px-4 py-2">${formatarValorMonetario(valoresRescicao[item])}</td>
  `;

    tbody.appendChild(novaLinha);
  };

  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  if (document.getElementById("informacoes")) {
    divResultado.removeChild(document.getElementById("informacoes"))
  }
  divResultado.appendChild(tabela);
}

saveResult()
