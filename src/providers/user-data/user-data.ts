import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Usuario } from '../../models/usuario';

@Injectable()
export class UserDataProvider {
  private PATH='users/';

  constructor(private db: AngularFireDatabase) {
    
  }

  saveUserData(usuario: Usuario, uid: string){
    return new Promise((resolve, reject) => {
      this.db.database
      .ref(this.PATH + uid)
      .set({ fullName: usuario.fullName,
             cpf: usuario.document,
             email: usuario.email,
             phone: usuario.phone,
             assinante: usuario.assinante,
             admin: usuario.admin,
             })
    });
  }
}
