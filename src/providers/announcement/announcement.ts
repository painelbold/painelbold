import { Announcement } from './../../models/announcement';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class AnnouncementProvider {
  private PATH='announcements/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes=>{
      return changes.map(c=>({ key: c.payload.key, ...c.payload.val() }))
    });
  }
  
  get(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => {
      return { key: c.key, ...c.payload.val() };
    })

  }

  save(announcement: Announcement){
    return new Promise((resolve, reject) => {
      if(announcement.key){
        this.db.list(this.PATH)
        .update(announcement.key, announcement )
        .then(() =>resolve())
        .catch((e) => reject(e))
      } else {
        this.db.list(this.PATH)
        .push( announcement )
        .then((result: any) =>resolve(result.key))
      }
    });
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }
}
