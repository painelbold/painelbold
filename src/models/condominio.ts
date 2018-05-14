import { Address } from './address';
import { User } from './user';
import { Edificio } from './edificio';

export class Condominio {
    constructor(
        public endereco: Address,
        public sindico: User,
        public blocos: Edificio[],
    ) { }
}