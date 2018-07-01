import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Announcement } from './../../models/announcement';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class AnnouncementProvider {
  private PATH='announcements/';

  constructor(private db: AngularFireDatabase,
              private auth: AngularFireAuth,) {
  }

  getAllByEdificio(key: string){
    return this.db.list(this.PATH + key, ref =>
    ref.orderByChild("publishDate"))
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

  save(announcement: Announcement, key: string){
    return new Promise((resolve, reject) => {
      if(announcement.key){
        this.db.list(this.PATH + key)
        .update(announcement.key, announcement )
        .then(() =>resolve())
        .catch((e) => reject(e))
      } else {
        announcement.publishDate = firebase.database.ServerValue.TIMESTAMP;

        this.db.list(this.PATH + key)
        .push( announcement )
        .then((result: any) =>resolve(result.key))
      }
    });
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }
}
