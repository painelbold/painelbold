import { Usuario } from "./usuario";

export class Announcement {
    public key: string;
    public title: string;
    public message: string;
    public publishDate: Date;
    public user: Usuario;
}