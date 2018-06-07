import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../auth/auth-service';

@Injectable()
export class UserDataProvider {
  private PATH='users/';

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    
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

  getUserData(){
    return this.db.object(this.PATH + this.authService.getLoggedUser());
  }
}
