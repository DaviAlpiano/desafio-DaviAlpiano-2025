import { animaisDtBase, brinquedosDtBase } from './animaisDTBase.js';
import { Animal } from './animais.js';
import { Pessoa } from './pessoa.js';

class AbrigoAnimais {
  static animais = [];

  constructor() {
    animaisDtBase.forEach(animal => this.constructor.animais
      .push(new Animal(animal.nome, animal.especie, animal.brinquedos)));    
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoa1 = new Pessoa("pessoa 1", brinquedosPessoa1.split(","));
    const pessoa2 = new Pessoa("pessoa 2", brinquedosPessoa2.split(","));
    const animais = ordemAnimais.split(",");
    
    const errors = this.errors(pessoa1.brinquedos, pessoa2.brinquedos, animais)
    if(errors) {
      return errors;
    };
    
    const resultado = this.adocao(pessoa1, pessoa2, animais);
    return resultado;
  };

  errors(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const duplicado = arr => new Set(arr).size !== arr.length;
    const brinquedoValido = arr => arr.every(brin => brinquedosDtBase.includes(brin));
    
    const nomes = animaisDtBase.map(animal => animal.nome);
    const animal = ordemAnimais.every(animal => nomes.includes(animal));

    if(duplicado(brinquedosPessoa1)
      || duplicado(brinquedosPessoa2)
      || !brinquedoValido(brinquedosPessoa1)
      || !brinquedoValido(brinquedosPessoa2)) {
      return { erro: 'Brinquedo inválido', lista: null };
    }

    else if(duplicado(ordemAnimais) || !animal) {
      return { erro: 'Animal inválido', lista: null };
    }
  }

  animaisSelecionados(ordemAnimais) {
    const animaisSelecionados = AbrigoAnimais.animais.filter(animal => ordemAnimais.includes(animal.nome));
    return ordemAnimais.map(nome => animaisSelecionados.find(animal => animal.nome === nome));
  }

 

  adocao(pessoa1, pessoa2, ordemAnimais) {
    const resultado = {
      lista: []
    };

    const animais = this.animaisSelecionados(ordemAnimais);

    animais.forEach(animal => {      
      if(animal.podeSerAdotadoPor(pessoa1.brinquedos)
        && animal.podeSerAdotadoPor(pessoa2.brinquedos)) {
      return;
    }
      else if(animal.podeSerAdotadoPor(pessoa1.brinquedos)) {
      pessoa1.filtrarAdocao(animal);
    } else if(animal.podeSerAdotadoPor(pessoa2.brinquedos)) {
      pessoa2.filtrarAdocao(animal);
    } 
    });

    pessoa1.filtrarLoco();
    pessoa2.filtrarLoco();

    const animaisOrdenados= animais.sort((a, b) => a.nome.localeCompare(b.nome));

    animaisOrdenados.forEach(animal => {
        const pessoa1Ok = pessoa1.podeAdotar(animal.nome);
        const pessoa2Ok = pessoa2.podeAdotar(animal.nome);

        if (pessoa1Ok) {
          resultado.lista.push(`${ animal.nome } - ${pessoa1.nome}`);
        } 
        else if (pessoa2Ok) {
          resultado.lista.push(`${ animal.nome } - ${pessoa2.nome}`);
        } else {
          resultado.lista.push(`${ animal.nome } - abrigo`);
        }
      }
    )

    resultado.lista.sort();

    return resultado;
  }
};

export { AbrigoAnimais as AbrigoAnimais };
