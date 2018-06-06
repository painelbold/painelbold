import { Address } from './address';
import { Edificio } from './edificio';
import { Usuario } from './usuario';

export class Condominio {
    constructor(
        public endereco: Address,
        public sindico: Usuario,
        public blocos: Edificio[],
    ) { }
}