class Pessoa {
    animaisQuePodeAdotar = [];

    constructor(nome, brinquedos) {
        this.nome = nome;
        this.brinquedos = brinquedos;
        this.brinquedosGato = brinquedos;
    }

    podeAdotar(nome) {
        return this.animaisQuePodeAdotar.map(animal => animal.nome).includes(nome);
    }

    verificarBrinquedosGato(brinquedos) {
        return brinquedos.every(brinquedo => this.brinquedosGato.includes(brinquedo));
    }

    verficarGatos() {
        return this.animaisQuePodeAdotar.some(animal => animal.tipo === 'gato');
    }

    filtrarLoco() {
        const locoOk = this.animaisQuePodeAdotar.find(animal => animal.nome === "Loco");
        if(this.animaisQuePodeAdotar.length === 1 && locoOk) {
            this.animaisQuePodeAdotar.pop();
        }
    }

    filtrarAdocao(animal) {
        const okBrinquedos = this.verificarBrinquedosGato(animal.brinquedos);
        const okGatos = this.verficarGatos();
        const MAX_ANIMAIS = 3;

        if(this.animaisQuePodeAdotar.length >= MAX_ANIMAIS) {
            return;
        }
        
        if(okBrinquedos && animal.tipo === "gato") {
            this.animaisQuePodeAdotar.push(animal);
            this.brinquedosGato = this.brinquedosGato.filter(brinquedo => !animal.brinquedos.includes(brinquedo));
        }
        
        else if(okGatos && okBrinquedos && animal.tipo === "cão" || animal.tipo === "jabuti") {
            this.animaisQuePodeAdotar.push(animal);
            this.brinquedosGato = this.brinquedosGato.filter(brinquedo => !animal.brinquedos.includes(brinquedo));
        }
        else if(!okGatos && animal.tipo === "cão" || animal.tipo === "jabuti") {
            this.animaisQuePodeAdotar.push(animal);
            this.brinquedosGato = this.brinquedosGato.filter(brinquedo => !animal.brinquedos.includes(brinquedo));
        }
    }
}

export { Pessoa };