import { Condominio } from './../../models/condominio';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CondominioProvider {
  private PATH='condominios/';

  constructor(private db: AngularFireDatabase) {
    
  }
  
  saveCondominio(condominio: Condominio){
    return new Promise((resolve, reject) => {
      if(condominio.key){
        this.db.list(this.PATH)
        .update(condominio.key, condominio )
        .then(() =>resolve())
        .catch((e) => reject(e))
      } else {
        this.db.list(this.PATH)
        .push( condominio )
        .then((result: any) =>resolve(result.key))
      }
    });
  }
}
