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

  if (!document.querySelector('#check')){
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

  divResultado.appendChild(tabela);
}

function mesesDiferenca(dateAdmissao, dataRecisao) {
  return dataRecisao.getMonth() - dateAdmissao.getMonth() + 
      (12 * (dataRecisao.getFullYear() - dateAdmissao.getFullYear()))
}

function formataData(data){
  return `${data.split('/')[1]}/${data.split('/')[0]}/${data.split('/')[2]}`
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

function getCardId(eventTarget) {
  if (eventTarget.getAttribute("card-id")){
    return eventTarget.getAttribute("card-id")
  } else{
    return getCardId(eventTarget.parentElement)
  }
}

function getCardValue(cardId) {
  const calculos = JSON.parse(localStorage.getItem("calculos"))
  let retorno = false
  calculos.valores.forEach(calculo => {
    if (calculo.id === parseInt(cardId)) {
      retorno = calculo.valor
    }
  })
  return retorno;
}

function getElements() {
  const inputs = Array.from(document.querySelectorAll("input"));
  const selects = Array.from(document.querySelectorAll("select"));
  const elements = inputs.slice(0,4);
  return elements.concat(selects)
}

export default {
  formatarValorMonetario,
  adicionarTabelaRescisao,
  mesesDiferenca,
  formataData,
  removerClasses,
  adicionarClasses,
  getCardId,
  getCardValue,
  getElements,
}
