import { User } from './user';
export class Announcement {
    constructor(
        public key: string,
        public title: string, 
        public message: string, 
        public publishDate: Date,  
        public user: User) { }
}