mes = {
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

document.getElementById("formCalculo").addEventListener("submit", (event) => {
  event.preventDefault();
  
  let salario = document.getElementById("salario").value;
  let dependentes = document.getElementById("dependentes").value;
  let motivo = document.getElementById("motivo").value;
  let dataAdmissao = document.getElementById("dtAdmissao").value;
  let dataRecisao = document.getElementById("dtDemissao").value;
  let AvisoPrevio = document.getElementById("avisoPrevio").value;
  let temFeriasVencidas = document.getElementById("feriasVencidas").value;

  let tercoSalario = salario/3
  let saldoFerias = feriasVencidas(salario, tercoSalario, temFeriasVencidas)
  
  let diasTrabalhadosMes = parseInt(dataRecisao.split('/')[0])
  let diasTrabalhadosTotal = DiasTrabalhados(dataAdmissao, dataRecisao)
  let saldoSalario = (salario/30) * diasTrabalhadosMes

  let resultado = 0;

  switch (motivo) {
    case "justa-causa":
      resultado = saldoFerias + saldoSalario;
      let recisaoJustaCausa = formatarValorMonetario(resultado);
      document.getElementById("informacoes").textContent = "O valor de sua rescisão será de " + recisaoJustaCausa;
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

  if (!localStorage.getItem("calculos")){
    localStorage.setItem("calculos", JSON.stringify({valores: []}))
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

function DiasTrabalhados(dataAdmissao, dataDemissao){
  const [diaA, mesA, anoA] = dataAdmissao.split('/').map(Number)
  const [diaD, mesD, anoD] = dataDemissao.split('/').map(Number)
  
  const jsMonthA = mesA - 1;
  const jsMonthD = mesD - 1;
  
  let dtAdmissao = new Date(anoA, jsMonthA, diaA)
  let dtDemissao = new Date(anoD, jsMonthD, diaD)
  
  let diferencaMilli = dtDemissao - dtAdmissao
  let difDias = diferencaMilli / (1000 * 60 * 60 * 24)
  return difDias
}

function feriasVencidas(salario, tercoSalario, ferias){
  if (ferias == 'Sim'){
      return salario + tercoSalario
  } else {
      return 0
  }
}

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
  if (localStorage.getItem("calculos")){
    const calculos = JSON.parse(localStorage.getItem("calculos"));
    const cards = document.getElementById("cards");

    calculos.valores.forEach(element => {
      cards.children[0].innerHTML+=`
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

saveResult()
