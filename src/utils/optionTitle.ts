export const optionsTitle = {
  depositsOptions: ["Salário", "Serviço", "Prêmiação", "Outros"]
    .filter(function (elem, pos, self) {
      return self.indexOf(elem) == pos;
    })
    .sort(),
  withdrawsOptions: [
    "Reforma",
    "Subway",
    "Oficina",
    "Outros",
    "Supermercado",
    "Combustível",
    "Ifood",
    "Fast Food",
    "Alimentação",
    "Perfume",
    "Cinema",
    "Shopping",
    "Compra online",
    "Cartão de crédito",
    "Pagamentos",
    "Boletos",
    "Faculdade",
    "Streaming",
    "Netflix",
    "Amazon Prime",
    "Item doméstico",
    "Móvel",
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
