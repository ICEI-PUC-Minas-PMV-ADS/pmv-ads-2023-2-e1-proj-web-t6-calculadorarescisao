document.getElementByTagName("form")[0].addEventListener("submit", (event) => {
  const valores = event.target
  
  const salario = valores[0]
  const dependentes = valores[1]
  const motivo = valores[2]
  const dataAdmissao = valores[3]
  const dataDemissao = valores[4]
  const avisoPrevio = valores[5]
  const ferias = valores[6]

  switch (motivo) {
    case "justa-causa":
      const recisaoJustaCausa = ferias + saldoSalario;
      return recisaoJustaCausa;
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
      return "nao existe";
  }

});
