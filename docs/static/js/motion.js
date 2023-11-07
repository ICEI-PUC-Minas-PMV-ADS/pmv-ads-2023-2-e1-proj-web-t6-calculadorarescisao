const meuForm = document.getElementById("formCalculo");
var divParaMudarTexto = document.getElementById('informacoes');

// Adiciona um ouvinte de evento ao formulário
meuForm.addEventListener('keydown', function(event) {
    console.log("tab")
    if (event.key === 'Tab') {
        var activeElement = document.activeElement;
        switch (activeElement.id) {
            case "salario":
                divParaMudarTexto.innerText = ' O último salário do funcionário é a base para cálculos essenciais, como o valor do aviso prévio, férias proporcionais e 13º salário. Portanto, seu correto registro é crucial para garantir que o trabalhador receba o que lhe é devido na rescisão';
                break;
            case "dependentes":
                divParaMudarTexto.innerText = 'O número de dependentes influencia diretamente o cálculo do Imposto de Renda retido na fonte. Quanto mais dependentes, menor será o desconto, aumentando o valor líquido a receber pelo funcionário';
                break;
            case "motivo":
                divParaMudarTexto.innerText = 'O motivo da rescisão define os direitos do empregado e do empregador. Por exemplo, em casos de justa causa, o empregado pode perder diversos benefícios que teria em uma demissão sem justa causa';
                break;
            case "dtAdmissao":
                divParaMudarTexto.innerText = 'A data de início do contrato de trabalho é essencial para determinar o tempo de serviço do funcionário na empresa, impactando benefícios como férias, 13º salário e a multa sobre o Fundo de Garantia por Tempo de Serviço (FGTS) no caso de demissão sem justa causa';
                break;
            case "dtDemissao":
                divParaMudarTexto.innerText = 'A data de término do contrato de trabalho é fundamental para calcular com precisão os valores devidos ao empregado na rescisão, como o aviso prévio e o pagamento das férias vencidas';
                break;
            case "avisoPrevio":
                divParaMudarTexto.innerText = 'O aviso prévio é um período de tempo durante o qual o empregado deve continuar trabalhando ou receber uma indenização, sendo vital para que tanto empregado quanto empregador se planejem adequadamente para o término do vínculo empregatício.';
                break;
            case "feriasVencidas":
                divParaMudarTexto.innerText = 'As férias vencidas representam o direito do empregado a períodos de descanso não usufruídos em anos anteriores. Essas férias não gozadas devem ser pagas na rescisão, incluindo o terço constitucional, ou podem ser utilizadas pelo empregado antes da saída, a critério das partes.';
                break;
            default:
                break;
        }
    }
});

// Adiciona um ouvinte de evento ao formulário
meuForm.addEventListener('click', function(event) {
    console.log("click")
    
    var activeElement = document.activeElement;
    switch (activeElement.id) {
        case "salario":
            divParaMudarTexto.innerText = ' O último salário do funcionário é a base para cálculos essenciais, como o valor do aviso prévio, férias proporcionais e 13º salário. Portanto, seu correto registro é crucial para garantir que o trabalhador receba o que lhe é devido na rescisão';
            break;
        case "dependentes":
            divParaMudarTexto.innerText = 'O número de dependentes influencia diretamente o cálculo do Imposto de Renda retido na fonte. Quanto mais dependentes, menor será o desconto, aumentando o valor líquido a receber pelo funcionário';
            break;
        case "motivo":
            divParaMudarTexto.innerText = 'O motivo da rescisão define os direitos do empregado e do empregador. Por exemplo, em casos de justa causa, o empregado pode perder diversos benefícios que teria em uma demissão sem justa causa';
            break;
        case "dtAdmissao":
            divParaMudarTexto.innerText = 'A data de início do contrato de trabalho é essencial para determinar o tempo de serviço do funcionário na empresa, impactando benefícios como férias, 13º salário e a multa sobre o Fundo de Garantia por Tempo de Serviço (FGTS) no caso de demissão sem justa causa';
            break;
        case "dtDemissao":
            divParaMudarTexto.innerText = 'A data de término do contrato de trabalho é fundamental para calcular com precisão os valores devidos ao empregado na rescisão, como o aviso prévio e o pagamento das férias vencidas';
            break;
        case "avisoPrevio":
            divParaMudarTexto.innerText = 'O aviso prévio é um período de tempo durante o qual o empregado deve continuar trabalhando ou receber uma indenização, sendo vital para que tanto empregado quanto empregador se planejem adequadamente para o término do vínculo empregatício.';
            break;
        case "feriasVencidas":
            divParaMudarTexto.innerText = 'As férias vencidas representam o direito do empregado a períodos de descanso não usufruídos em anos anteriores. Essas férias não gozadas devem ser pagas na rescisão, incluindo o terço constitucional, ou podem ser utilizadas pelo empregado antes da saída, a critério das partes.';
            break;
        default:
            break;
    }
});