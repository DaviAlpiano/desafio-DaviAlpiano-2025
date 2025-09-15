class Animal {
   constructor(nome, tipo, brinquedos) {
    this.nome = nome;
    this.tipo = tipo;
    this.brinquedos = brinquedos;
  }

  podeSerAdotadoPor(brinquedosPessoa) {
    if (this.nome === "Loco"
      && brinquedosPessoa.includes('SKATE')
      && brinquedosPessoa.includes('RATO')) {
        return true;
      }
    let i = 0;
    return brinquedosPessoa.some(b => {
      if (b === this.brinquedos[i]) i++;
      return i === this.brinquedos.length;
    });
  }
}

export { Animal };
