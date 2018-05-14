export class Address {
    constructor(
        public tipoLogradouro: string,
        public logradouro: string,
        public complemento: string,
        public bairro: string,
        public numero: number,
        public cep: number,
        public estado: string,
        public cidade: string,
    ) { }
}