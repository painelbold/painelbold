import * as firebase from 'firebase';
import { AuthService } from './../auth/auth-service';
import { map } from 'rxjs/operators';
import { Condominio } from './../../models/condominio';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CondominioProvider {
  private PATH='condominios/';
  uid: string;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
                if(authService.getLoggedUser())
                  this.uid = authService.getLoggedUser().uid;
  }

  getAllCondominios(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
  }

  getCondominio(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .pipe(map(e => {
      return { key: e.key, ...e.payload.val()};
    }));
  }

  saveCondominio(condominio: Condominio){
    return new Promise((resolve, reject) => {
      if(condominio.key){
        this.db.list(this.PATH)
        .update(condominio.key, condominio )
        .then(() =>resolve())
        .catch((e) => reject(e))
      } else {
        condominio.userCreatedId = this.uid;
        condominio.dateCreated = firebase.database.ServerValue.TIMESTAMP;

        this.db.list(this.PATH)
        .push( condominio )
        .then((result: any) =>resolve(result.key))
      }
    });
  }
}
