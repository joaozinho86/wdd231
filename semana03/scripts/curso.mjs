const cursoBYUI = {
  titulo: "Curso BYUI",
  secoes: [
    { numero: 1, matriculados: 25 },
    { numero: 2, matriculados: 30 },
    { numero: 3, matriculados: 28 }
  ],
  mudarMatricula(numeroSecao, adicionar = true) {
    const secao = this.secoes.find(s => s.numero === numeroSecao);
    if (secao) {
      adicionar ? secao.matriculados++ : secao.matriculados--;
    }
  }
};

export default cursoBYUI;