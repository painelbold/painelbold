import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { Obra } from '../../models/obra';

@Injectable()
export class ObraProvider {
  private PATH='obra/'

  constructor(private db: AngularFireDatabase,) {

  }

  getAllObras(keyEdificio: string){
    return this.db.list(this.PATH + keyEdificio)
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(e => ({key: e.payload.key, ...e.payload.val()}));
    }));
  }

  saveObra(obra: Obra){
    return new Promise((resolve, reject) => {
      if(obra.key){
        this.db.list(this.PATH + obra.edificioId)
        .update(obra.key, obra)
        .then(() => resolve())
        .catch((e) => reject(e))
      }
      else{
        obra.dateCreated = firebase.database.ServerValue.TIMESTAMP;

        this.db.list(this.PATH + obra.edificioId)
        .push(obra)
        .then((result: any) => resolve(result.key))
      }
    });
  }

}
