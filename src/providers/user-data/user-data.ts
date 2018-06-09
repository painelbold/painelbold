import { Usuario } from './../../models/usuario';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth/auth-service';

@Injectable()
export class UserDataProvider {
  private PATH='users/';

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {                  
    }
  
  saveUserData(usuario: Usuario, key: string){
    return new Promise((resolve, reject) => {
      if(key){
        this.db.list(this.PATH)
        .update(key, usuario)
        .then(() => resolve())
        .catch((e) => reject(e))
      }
      else{
        this.db.database
        .ref(this.PATH + this.authService.getLoggedUser().uid)
        .set({ fullName: usuario.fullName || '',
             cpf: usuario.cpf || '',
             email: usuario.email || '',
             phone: usuario.phone || '',
             assinante: usuario.assinante,
             admin: usuario.admin,
             edificioId: usuario.edificioId,
             })
      }
    });
  }

  getUserData(){
      return this.db.object(this.PATH + this.authService.getLoggedUser().uid)
      .snapshotChanges()
      .map(u =>{
        return { key: u.key, ...u.payload.val()};
      });
    }
}
