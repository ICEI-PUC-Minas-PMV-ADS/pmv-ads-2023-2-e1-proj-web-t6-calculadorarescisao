import { showOnHistory } from "./history.js";

const nomenclatura = {
  verbas: "Verbas Rescisórias",
  deducoes: "Deduções",
  fgts: "FGTS",
  rescisao: "Total Rescisão",
  saldoSalario: "Saldo de Salário",
  feriasVencidas: "Férias Vencidas",
  feriasProps: "Férias Proporcionais",
  decimoTerceiro: "13° proporcional ",
  tercoFerias: "1/3 das Férias",
  inss: "INSS",
  inssDecimo: "INSS 13°",
  irrf: "IRRF",
  depositado: "Depositado",
  multa: "Multa"
}

const formCalculo = document.getElementById("formCalculo");
formCalculo.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(formCalculo);
  const motivo = data.get('motivo');
  const aviso = data.get('avisoPrevio');
  const salario = parseFloat(data.get('salario'));
  const dataAdmissao = new Date(formataData(data.get('dtAdmissao')));
  const dataRecisao = new Date(formataData(data.get('dtDemissao')));
  const temFeriasVencidas = data.get('feriasVencidas');
  let feriasVencidas = 0;
 
  let avisoValor = 0;
  switch (aviso){
    case "indenizado":
    case "nao-cumprido":
      let diasAviso = 30 + (dataRecisao.getFullYear() - dataAdmissao.getFullYear()) * 3;
      if (diasAviso > 60) diasAviso = 60;
      avisoValor = diasAviso * (salario/30);
      break;
    case "trabalhado":
    case "dispensado":
    default:
      break;
  }

  // verbas rescisorias
  const saldoSalario = (salario / 30) * dataRecisao.getDate();
  const decimoTerceiro = calcDecimoTerceiro(salario, dataAdmissao, dataRecisao);
  const feriasProps = decimoTerceiro;

  if (temFeriasVencidas == "Sim") {
    feriasVencidas = salario;
  }
  const tercoFerias = (feriasVencidas + feriasProps)/3;

  // deducoes
  const inss = saldoSalario * 0.075;
  const inssDecimo = decimoTerceiro * 0.076;
  const irrf = saldoSalario * 0.00;

  // fgts
  const contribuicao = salario * 0.08;
  const meses = mesesDiferenca(dataAdmissao, dataRecisao);
  const depositado = contribuicao * meses;
  const saldoSalarioFgts = (contribuicao/30) * dataRecisao.getDate();
  const decimoTerceiroFgts = calcDecimoTerceiro(contribuicao, dataAdmissao, dataRecisao);
  const multa = depositado * 0.4;

  let verbasRescisorias = (aviso === "indenizado")? avisoValor : 0;
  let deducoes = (aviso === "nao-cumprido")? avisoValor: 0;
  let fgts = 0;
  let totalRescisao = 0;
  switch (motivo) {
    case "justa-causa":
      verbasRescisorias = verbasRescisorias + saldoSalario + feriasVencidas
        + feriasProps + tercoFerias + decimoTerceiro;
      deducoes = deducoes + inss + inssDecimo + irrf;
      totalRescisao = verbasRescisorias - deducoes;
      adicionarTabelaRescisao({
          verbas: {
            saldoSalario: saldoSalario,
            feriasVencidas: feriasVencidas,
            feriasProps: feriasProps,
            decimoTerceiro: decimoTerceiro,
            tercoFerias: tercoFerias,
            total: verbasRescisorias
          },
          deducoes: {
            inss: inss,
            inssDecimo: inssDecimo,
            irrf: irrf,
            total: deducoes
          },
          fgts: {
            depositado: depositado,
            multa: multa,
            total: fgts
          },
          rescisao: {
            total: totalRescisao,
          },
        })
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
      verbasRescisorias = saldoSalario + feriasVencidas + feriasProps + tercoFerias + decimoTerceiro;
      deducoes = inss + inssDecimo + irrf;
      fgts = depositado + saldoSalarioFgts + decimoTerceiroFgts + multa;

      totalRescisao = verbasRescisorias + fgts - deducoes;
      adicionarTabelaRescisao({
          verbas: {
            saldoSalario: saldoSalario,
            feriasVencidas: feriasVencidas,
            feriasProps: feriasProps,
            decimoTerceiro: decimoTerceiro,
            tercoFerias: tercoFerias,
            total: verbasRescisorias
          },
          deducoes: {
            inss: inss,
            inssDecimo: inssDecimo,
            irrf: irrf,
            total: deducoes
          },
          fgts: {
            depositado: depositado,
            multa: multa,
            total: fgts
          },
          rescisao: {
            total: totalRescisao,
          },
        })
      break;
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
    valor: formatarValorMonetario(totalRescisao),
    motivo: motivo,
  })

  localStorage.setItem("calculos", JSON.stringify(calculos))
  showOnHistory(formatarValorMonetario(totalRescisao), dataCalculo.toDateString(), motivo);
});

function formatarValorMonetario(numero) {
  const options = {
    style: 'currency',
    currency: 'BRL'
  };
  return numero.toLocaleString('pt-BR', options);
}

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

  for (let item in valoresRescicao) {
    const novaLinha = document.createElement("tr");
    novaLinha.className = 'resumo'
    if (item !== 'rescisao'){
      for (let d in valoresRescicao[item]){
        const detalhes = document.createElement("tr");
        detalhes.className = 'detalhes hidden';
        if (d !== 'total') {detalhes.innerHTML = `
            <td class="border px-4 py-2">${nomenclatura[d]}</td>
            <td class="border px-4 py-2">${formatarValorMonetario(valoresRescicao[item][d])}</td>
          `
          tbody.appendChild(detalhes);
        }
      }
    }
    novaLinha.innerHTML = `
    <td class="border px-4 py-2">${nomenclatura[item]}</td>
    <td class="border px-4 py-2">${formatarValorMonetario(valoresRescicao[item].total)}</td>
  `;
    
    tbody.appendChild(novaLinha);
  };

  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  if (document.getElementById("informacoes")) {
    divResultado.removeChild(document.getElementById("informacoes"))
  }
  divResultado.appendChild(tabela);
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.value = "mais";
  checkBox.id = "check";
  checkBox.onclick = () => {
    if (document.querySelector('input[type="checkbox"]').checked){
      const linhasOcultas = document.querySelectorAll("tr.detalhes");
      const linhasResumo = document.querySelectorAll("tr.resumo");
      removerClasses(linhasOcultas, "hidden");
      adicionarClasses(linhasResumo, "bg-gray-300");
      document.querySelector('label').textContent = " Mostrar Menos";
    } else{
      const linhasOcultas = document.querySelectorAll("tr.detalhes");
      const linhasResumo = document.querySelectorAll("tr.resumo");
      adicionarClasses(linhasOcultas, "hidden");
      removerClasses(linhasResumo, "bg-gray-300");
      document.querySelector('label').textContent = " Mostrar Mais";
    }
  }
  const checkLabel = document.createElement("label");
  checkLabel.innerText = "  Mostrar mais";
  divResultado.appendChild(checkBox);
  divResultado.appendChild(checkLabel);
}

function mesesDiferenca(dateAdmissao, dataRecisao) {
  return dataRecisao.getMonth() - dateAdmissao.getMonth() + 
      (12 * (dataRecisao.getFullYear() - dateAdmissao.getFullYear()))
}

function formataData(data){
  return `${data.split('/')[1]}/${data.split('/')[0]}/${data.split('/')[2]}`
}

function calcDecimoTerceiro(salario, dataAdmissao, dataRecisao){
  const decimoTerceiro = (salario/12) * dataRecisao.getMonth() - dataAdmissao.getMonth();
  return Math.round(decimoTerceiro*100)/100;
}

function removerClasses(elementos, valor) {
  elementos.forEach(e => {
    e.classList.remove(valor);
  });
}

function adicionarClasses(elementos, valor) {
  elementos.forEach(e => {
    e.classList.add(valor);
  });
}
