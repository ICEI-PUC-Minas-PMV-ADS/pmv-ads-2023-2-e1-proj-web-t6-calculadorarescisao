const calculoModalidade = (type) => {
  var salario = document.getElementsByName("salario");
  var dependentes = document.getElementsByName("dependentes");
  var motivo = document.getElementsByName("motivo");
  var dataAdimissao = document.getElementsByName("dt-admissao");
  var dataRecisao = document.getElementsByName("dt-demissao");
  var AvisoPrevio = document.getElementsByName("aviso-previo");
  var feriasVencidas = document.getElementsByName("ferias-vencidas");

  switch (type) {
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

    default:
      const recisaoSemJustaCausa = ferias + decimoTerceiro + saldoSalario;
      return recisaoSemJustaCausa;
  }
};
