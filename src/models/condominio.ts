import { Address } from './address';
import { Edificio } from './edificio';
import { DateTime } from 'ionic-angular';

export class Condominio {
    public key: string;
    public nome: string;
    public cnpj: string;
    public endereco: Address;
    public sindicoId: string;
    public userCreatedId: string;
    public dateCreated: Date;
}