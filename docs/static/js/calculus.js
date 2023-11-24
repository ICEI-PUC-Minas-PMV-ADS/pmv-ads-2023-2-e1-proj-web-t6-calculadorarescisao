import { saveCalc } from "./history.js";
import motion from "./motion.js";
import utils from "./utils.js";

const formCalculo = document.getElementById("formCalculo");
formCalculo.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(formCalculo);
  const motivo = data.get('motivo');
  const aviso = data.get('avisoPrevio');
  const salario = parseFloat(data.get('salario'));
  const dataAdmissao = new Date(utils.formataData(data.get('dtAdmissao')));
  const dataRecisao = new Date(utils.formataData(data.get('dtDemissao')));
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
  const meses = utils.mesesDiferenca(dataAdmissao, dataRecisao);
  const depositado = contribuicao * meses;
  const saldoSalarioFgts = (contribuicao/30) * dataRecisao.getDate();
  const decimoTerceiroFgts = calcDecimoTerceiro(contribuicao, dataAdmissao, dataRecisao);
  const multa = depositado * 0.4;

  let verbasRescisorias = (aviso === "indenizado")? avisoValor : 0;
  let deducoes = (aviso === "nao-cumprido")? avisoValor: 0;
  let fgts = 0;
  let totalRescisao = 0;

  // objeto valores rescisao
  let valoresRescicao = null
  switch (motivo) {
    case "justa-causa":
      verbasRescisorias = verbasRescisorias + saldoSalario + feriasVencidas
        + feriasProps + tercoFerias + decimoTerceiro;
      deducoes = deducoes + inss + inssDecimo + irrf;
      totalRescisao = verbasRescisorias - deducoes;

      valoresRescicao = {
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
      }
      utils.adicionarTabelaRescisao(valoresRescicao)
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

      valoresRescicao = {
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
      }
      utils.adicionarTabelaRescisao(valoresRescicao)
      break;
    default:
      document.getElementById("informacoes").textContent = "nao existe";
  }

  saveCalc(valoresRescicao, motivo);

  for(let i = 0; i < 7; i++) {
    event.target[i].disabled = true;
  }
  const botao = document.getElementById("submitButton");
  botao.value = "Novo Cálculo";
  botao.type = "button";
  botao.addEventListener("click", e => {
    const elementos = utils.getElements();
    for(let i = 0; i < 7; i++) {
      elementos[i].disabled = false;
    }
    const botaoDiv = document.querySelector('#formCalculo .mt-6')
    botaoDiv.removeChild(document.getElementById("submitButton"))
    botaoDiv.innerHTML = `
      <input type="submit" id="submitButton" class="custom-submit-color px-4 py-2 block w-full text-white rounded-md" value="Calcular">
    `
    
    const divInfo = document.getElementById('divInfo')

    divInfo.removeChild(document.querySelector('table'))
    divInfo.removeChild(document.querySelector('#divInfo label') )
    divInfo.removeChild(document.querySelector('#check'))
    
    const informacoes = document.createElement('p')
    informacoes.id = 'informacoes'
    informacoes.className = 'text-lg mb-4'
    informacoes.textContent = `Aqui são apresentadas informações úteis para preencher os campos dos cálculos,
        bem como o resultado do seu cálculo.`
    divInfo.appendChild(informacoes);
    motion.infos()
  })

});

function calcDecimoTerceiro(salario, dataAdmissao, dataRecisao){
  const decimoTerceiro = (salario/12) * dataRecisao.getMonth() - dataAdmissao.getMonth();
  return Math.round(decimoTerceiro*100)/100;
}
