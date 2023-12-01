# Plano de Testes de Software

[Apresente os cenários de testes a serem utilizados na realização dos testes da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo atendidos. ]

Os testes funcionais a serem realizados na aplicação são descritos a seguir. [Utilize a estrutura abaixo para cada caso de teste]

|Caso de Teste    | CT-01 - Cálculos |
|:---|:---|
| Requisitos Associados | RF-01, RF-02, RF-03, RF-04, RF-05, RF-06, RF-07, RF-08, RF-09, RF-10, RF-11, RF-12|
| Objetivo do Teste | Realizar o cálculo da rescisão e obter o resultado do mesmo|
| Passos | 1. Na página inicial, preencha os campos, selecionando conforme quiser o motivo e o aviso prévio<br> 2. Clique em "Calcular" |
| Critérios de êxito | Tabela contendo o resultado do cálculo e cálculo armazenado dentro do objeto `calculos` localizado no local storage |
| Responsável pela elaborar do caso de Teste | Fábio Barkoski |
 
|Caso de Teste    | CT-02 - Histórico |
|:---|:---|
| Requisitos Associados | RF-X|
| Objetivo do Teste | Armazenar no histórico cálculo realizado, além de acessar cálculos antigos |
| Passos | 1. Na página inicial, preencha os campos, selecionando conforme quiser o motivo e o aviso prévio<br> 2. Clique em "Calcular"<br> 3. Nos cards abaixo do cálculo, selecione o último cálculo realizado ou outro que desejar|
| Critérios de êxito | Tabela contendo o resultado do antigo cálculo a ser consultado, além de valores iguais aos armazenados no objeto `calculos` no local storage|
| Responsável pela elaborar do caso de Teste | Fábio Barkoski |
 