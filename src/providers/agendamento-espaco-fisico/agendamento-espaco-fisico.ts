import { AgendamentoEspacoFisico } from './../../models/agendamentoEspacoFisico';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable()
export class AgendamentoEspacoFisicoProvider {
  private PATH='agendamentos-espaco-fisico/';

  constructor(private db: AngularFireDatabase,) {
  }

  getAllAgendamentos(edificioKey: string){
    return this.db.list(this.PATH + edificioKey)
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(e => ({key: e.payload.key, ...e.payload.val()}));
    }));
  }

  saveAgendamento(agendamento: AgendamentoEspacoFisico){
    return new Promise((resolve,reject) => {
      if(agendamento.key){
        this.db.list(this.PATH + agendamento.edificioKey)
        .update(agendamento.key, agendamento)
        .then(() => resolve())
        .catch((e) => reject(e));
      }
      else{
        agendamento.dateCreated = firebase.database.ServerValue.TIMESTAMP;

        this.db.list(this.PATH + agendamento.edificioKey)
        .push(agendamento)
        .then((result: any) => resolve(result.key));
      }
    });
  }

  getAllAgendamentosUser(edificioKey: string, uid: string){
    return this.db.list(this.PATH + edificioKey, ref =>
      ref.orderByChild("userKey")
      .equalTo(uid))
      .snapshotChanges()
      .pipe(map(changes =>{
        return changes.map(a => ({key: a.payload.key, ...a.payload.val()}));
      }));
  }

  getAgendamentosEspacoFisico(edificioKey: string, espacoFisicoKey: string){
    return this.db.list(this.PATH + edificioKey, ref =>
    ref.orderByChild("espacoFisicoKey"))
    .snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(a => ({key: a.payload.key, ...a.payload.val()}))
    }));
  }

}
