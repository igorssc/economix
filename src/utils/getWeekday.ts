export const getWeekday = (formattedDate: string) => {
  const currentDate = new Date();
  const [dia, mes] = formattedDate.split("/");

  let ano = currentDate.getFullYear(); // Obtém o ano corrente
  if (parseInt(mes) > currentDate.getMonth() + 1) {
    // Se o mês da data fornecida for maior que o mês atual, subtrai 1 do ano
    ano--;
  }

  const data = new Date(`${ano}-${mes}-${dia}:00:00`);

  const weekday = data.getDay(); // Retorna um número de 0 a 6, onde 0 é domingo e 6 é sábado

  return weekday;
};
