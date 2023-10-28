const calculoModalidade = (type) => {
  var salario = document.getElementsByName("salario");
  var dependentes = document.getElementsByName("dependentes");
  var motivo = document.getElementsByName("motivo");
  var dataAdimissao = document.getElementsByName("dt-admissao");
  var dataRecisao = document.getElementsByName("dt-demissao");
  var AvisoPrevio = document.getElementsByName("aviso-previo");
  var feriasVencidas = document.getElementsByName("ferias-vencidas");
  const tercoSalario = salario/3

  const tercoSalario = salario/3
  const diasTrabalhadosMes = parseInt(dataDemissao.split('/')[0])
  const saldoFerias = feriasVencidas(salario, tercoSalario, ferias)
  const diasTrabalhados = DiasTrabalhados(dataAdmissao, dataDemissao)
  const saldoSalario = (salario/30) * diasTrabalhadosMes
  
  switch (motivo) {
      case "justa-causa":
        const recisaoJustaCausa = saldoFerias + saldoSalario;
        console.log(recisaoJustaCausa);
      case "pedido-demissao":
        const recisaoPedidoDemissao = ferias + decimoTerceiro + salario;
        console.log(recisaoJustaCausa)
      case "demissao-comum-acordo":
        const recisaoComumAcordo = ferias + decimoTerceiro + salario;
        console.log(recisaoJustaCausa)
      case "contrato-no-prazo":
        const recisaoContratoNoPrazo = ferias + decimoTerceiro + salario;
        console.log(recisaoJustaCausa)
      case "contrato-antes-prazo":
        const recisaoContratoAntesPrazoIniciativaEmpregador =
          ferias + decimoTerceiro + salario + metadeDosSalariosRestantes;
        console.log(recisaoJustaCausa)
      case "contrato-antes-prazo":
        const recisaoContratoAntesPrazoIniciativaEmpregado =
          ferias + decimoTerceiro + salario - metadeDosSalariosRestantes;
        console.log(recisaoJustaCausa)
      case "aposentadoria":
        const recisaoAposentadoria = ferias + decimoTerceiro + salario;
        console.log(recisaoJustaCausa)
      case "falecimento":
        const recisaoFalecimento = ferias + decimoTerceiro + salario;
        console.log(recisaoJustaCausa)
      case "sem-justa-causa":
        const recisaoSemJustaCausa = ferias + decimoTerceiro + salario;
        console.log(recisaoJustaCausa)
      
      default:
        console.log('Não existe')
  }
  
  
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

