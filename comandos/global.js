class AcaoGlobal {
  getDataAtual() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return date;
  }

  calcularSenha() {
    const d = new Date();
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    let dia = d.getDate();
    let mes = d.getMonth() + 1;
    let ano = d.getFullYear();
    let dataCompleta =
      days[d.getDay()] +
      " - " +
      dia +
      "/" +
      mes +
      "/" +
      ano +
      " - " +
      d.toLocaleTimeString();
    let senhaDia = Math.trunc(((ano + dia) * mes) / 1.5).toString();

    return senhaDia;
  }
}

module.exports = AcaoGlobal;