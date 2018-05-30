import { User } from './user';
export class Announcement {
    public key: string;
    public title: string;
    public message: string;
    public publishDate: Date;
    public user: User;
}