# Especificação do Projeto

## Perfis de Usuários
<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil Empregado</th>
</tr>
<tr>
<td width="150px"><b>Descrição:</b></td>
<td width="600px">Trabalhador que pediu demissão ou foi demitido. </td>
</tr>
<tr>
<td><b>Necessidades:</b></td>
<td>
    1.Saber se irá receber algum valor e quanto será, após a rescisão do contrato.<br>
    2.Entender o cálculo que será feito.<br>
    3.Possibilidade de exportar o cálculo.<br>
    4.Ter a possibilidade de estudar se vale a pena cumprir o aviso prévio.<br>
</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil Empregador</th>
</tr>
<tr>
<td width="150px"><b>Descrição:</b></td>
<td width="600px">Empregador estudando rescisão de contratos.</td>
</tr>
<tr>
<td><b>Necessidades:</b></td>
<td>
    1.Estudar possibilidade de demissão em comum acordo.<br>
    2.Evitar acionar a contabilidade até saber aproximadamente o valor que será gasto com a demissão.<br>
    3.Estudar se vale a pena dar férias antes da demissão.<br>
    4.Em caso de aposentadoria do empregado ter uma ideia aproximada do valor a ser pago.<br>
</td>
</tr>
</tbody>
</table>


## Histórias de Usuários
|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Empregado | saber quanto vou receber caso peça demissão cumprindo aviso prévio | Que dependendo da diferença de valores posso optar em não cumprir o aviso prévio. |
| Empregador | Entender as vantagens da demissão de comum acordo | Avaliar a possibilidade de realizá-la com meu empregado. |
| Empregador | Entender o cálculo e saber valores a pagar em caso de aposentadoria do empregado | Realizar a rescisão de forma correta. |
| Empregado | quero entender o valor que vai ser pago após o aviso de demissão dado pelo empregador | Que eu possa me organizar financeiramente enquanto busco um novo emprego. |
| Empregado | Entender o cálculo e saber os valores a receber/pagar | Me organizar financeiramente. |
| Empregado | Entender como fica minha situação em relação ao contrato de experiência | Que eu possa saber como agir caso surja uma oportunidade de efetivação. |
| Empregado | Entender se tenho direto a algo caso meu empregador venha a óbito | Que fique resguardado caso algo venha a ocorrer com meu empregador. |
| Empregado | Saber quanto posso vir a receber em caso de demissão em comum acordo | Que assim tanto eu como meu empregador saiamos satisfeitos. |
| Empregador | Consultar o valor a pagar em uma dispensa sem justa causa | Avaliar se vale a pena encaminhar a dispensa para a empresa de contabilidade. |
| Empregador | Consultar os valores a pagar caso o empregado tenha férias vencidas | Entender se vale a pena realizar o pagamento da rescisão junto as férias ou exigir que o empregado as tire antes. |
| Empregado | Entender se tenho algum valor a receber caso meu empregador venha a indenizar meu aviso prévio | Me organizar financeiramente. |

## Requisitos do Projeto

### Requisitos Funcionais
|ID    | Descrição                | Prioridade |
|-------|---------------------------------|----|
| RF-01 | A aplicação deverá realizar o cálculo de dispensas de justa causa. | ALTA | 
| RF-02 | A aplicação deverá realizar o cálculo de dispensas sem justa causa. | ALTA |
| RF-03 | A aplicação deverá realizar o cálculo de pedido de demissão. | ALTA |
| RF-04 | A aplicação deverá realizar o cálculo de demissão de comum acordo. | ALTA |
| RF-05 | A aplicação deverá realizar o cálculo de encerramento de contrato de experiência no prazo. | ALTA |
| RF-06 | A aplicação deverá realizar o cálculo de encerramento de contrato de experiência antes prazo. | ALTA |
| RF-07 | A aplicação deverá realizar o cálculo de aposentadoria do empregado. | ALTA |
| RF-08 | A aplicação deverá realizar o cálculo de falecimento do empregador. | ALTA |
| RF-09 | A aplicação deve permitir ao usuário selecionar que não cumprirá aviso prévio. | ALTA |
| RF-10 | A aplicação deve permitir ao usuário selecionar que cumprirá o aviso prévio. | ALTA |
| RF-11 | A aplicação deve permitir ao usuário selecionar que foi dispensado de cumprir aviso prévio. | ALTA |
| RF-12 | A aplicação deve permitir ao usuário selecionar que teve seu aviso prévio indenizado pelo empregado. | ALTA |
| RF-13 | A aplicação deve permitir que o usuário veja a explicação e os detalhes dos cálculos. | ALTA |
| RF-14 | A aplicação deve permitir que o usuário faça exportação dos dados. | MÉDIA |
| RF-15 | A aplicação deve conter uma área voltada para explicação de rescisão contratual. | BAIXO |

### Requisitos não Funcionais
|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 | A aplicação deve ser publicada em um ambiente acessível público na Internet. | ALTA |
| RNF-02 | A aplicação deverá ser responsiva permitindo a visualização em dispositivos diversos de forma adequada. | ALTA |
| RNF-03 | A aplicação deve ser compatível com os navegadores do mercado: Google Chrome, Firefox e Microsoft Edge. | ALTA |
| RNF-04 | A aplicação deve ser intuitiva e dinâmica. | ALTA |
| RNF-05 | Assegurar a privacidade dos usuários conforme a LGPD. | MÉDIA | 