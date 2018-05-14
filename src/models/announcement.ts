import { User } from './user';
export class Announcement {
    constructor(
        public title: string, 
        public message: string, 
        public publishDate: Date,  
        public user: User) { }
}