import { Address } from './address';

export class User {
    constructor(
        public fullName: string,
        public document: number,
        public admin: boolean,
        public address: Address,
        public email: string,
        public phone: number,
        public password: string,
        public assinante: boolean,
    ){  }
}