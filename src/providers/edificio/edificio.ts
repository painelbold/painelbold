import { Edificio } from './../../models/edificio';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from './../auth/auth-service';
import { Injectable } from '@angular/core';

@Injectable()
export class EdificioProvider {
  
  private PATH="edificios/";
  uid: string;
  condominios: AngularFireList<any[]>;

  constructor(public auth: AuthService,
              public db: AngularFireDatabase,
              private authService: AuthService,) {
        this.uid = authService.getLoggedUser().uid;
  }

  saveEdificio(edificio: Edificio){
    return new Promise((resolve, reject) => {
      if(edificio.key){
        this.db.list(this.PATH + edificio.condominioId)
        .update(edificio.key, edificio )
      .then(() =>resolve())
      .catch((e) => reject(e))
      }
      else{
        edificio.userCreatedId = this.uid;
      this.db.list(this.PATH + edificio.condominioId)
      .push( edificio )
      .then((result: any) =>resolve(result.key))
      }
    });
  }

}
