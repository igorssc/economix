export const optionsTitle = {
  revenuesOptions: [
    "Salário",
    "Serviço",
    "Prêmiação",
    "Estorno",
    "Comissão",
    "Outros",
  ]
    .filter(function (elem, pos, self) {
      return self.indexOf(elem) == pos;
    })
    .sort(),
  expendituresOptions: [
    "Reforma",
    "Salão",
    "Oficina",
    "Outros",
    "Combustível",
    "Alimentação",
    "Perfume",
    "Shopping",
    "Compra online",
    "Cartão de crédito",
    "Pagamentos",
    "Boletos",
    "Faculdade",
    "Assinatura",
    "Item doméstico",
    "Aparelho eletrônico",
    "Ferramenta",
    "Loteria",
    "Farmácia",
  ]
    .filter(function (elem, pos, self) {
      return self.indexOf(elem) == pos;
    })
    .sort(),
};
