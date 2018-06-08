import { AuthService } from './../auth/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Condominio } from './../../models/condominio';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CondominioProvider {
  private PATH='/condominios/';
  uid: string;
  condominios: Observable<any>;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    this.uid = authService.getLoggedUser().uid;
    this.condominios = this.db.list(this.PATH).valueChanges();
  }

  getAllCondominios(){
    return this.condominios;
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
