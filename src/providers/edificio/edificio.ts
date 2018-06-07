import { Edificio } from './../../models/edificio';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './../../app/app.module';
import { AuthService } from './../auth/auth-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EdificioProvider {
  
  private PATH="edificios/";

  constructor(public auth: AuthService,
              public db: AngularFireDatabase) {
  }
  
  createEdificio(edificio: Edificio, idCond: string){
    return new Promise((resolve, reject) => {
      this.db.database
      .ref(this.PATH + idCond)
      .set({ bloco: edificio.bloco,
             nome: edificio.nome,
             })
    });
  }

}
