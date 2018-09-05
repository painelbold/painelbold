import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { EspacoFisico } from '../../models/espacoFisico';
import { AuthService } from '../auth/auth-service';
import * as firebase from 'firebase';

@Injectable()
export class EspacoFisicoProvider {
  private PATH='espaco-fisico/';
  uid: string;

  constructor(private db: AngularFireDatabase,
    private authService: AuthService,) {
    if(authService.getLoggedUser())
      this.uid = authService.getLoggedUser().uid;
  }

  getAllEspacosEdificio(keyEdificio: string){
    return this.db.list(this.PATH + keyEdificio)
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(e => ({key: e.payload.key, ...e.payload.val()}));
    }));
  }

  saveEspaco(espaco: EspacoFisico){
    return new Promise((resolve, reject) => {
      if(espaco.key){
        this.db.list(this.PATH + espaco.edificioId)
        .update(espaco.key, espaco)
        .then(() => resolve())
        .catch((e) => reject(e))
      }
      else{
        espaco.userCreatedId = this.uid;
        espaco.dateCreated = firebase.database.ServerValue.TIMESTAMP;

        this.db.list(this.PATH + espaco.edificioId)
        .push(espaco)
        .then((result: any) => resolve(result.key))
      }
    });
  }

  removerEspaco(ef: EspacoFisico){
    return this.db.object(this.PATH + ef.edificioId + '/' + ef.key).remove();
  }
}
