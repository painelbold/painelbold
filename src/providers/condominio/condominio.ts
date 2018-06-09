import { AuthService } from './../auth/auth-service';
import { Condominio } from './../../models/condominio';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CondominioProvider {
  private PATH='condominios/';
  uid: string;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    this.uid = authService.getLoggedUser().uid;
  }

  getAllCondominios(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })
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
        this.db.list(this.PATH)
        .push( condominio )
        .then((result: any) =>resolve(result.key))
      }
    });
  }
}
