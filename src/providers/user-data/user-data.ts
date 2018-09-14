import { map } from 'rxjs/operators';
import { Usuario } from './../../models/usuario';
import { Injectable, ViewChild } from '@angular/core';
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
             unit: usuario.unit || '',
             assinante: usuario.assinante,
             admin: usuario.admin,
             sindico: usuario.sindico,
             edificioId: usuario.edificioId,
             })
      }
    });
  }

  getAllUsersEdificio(keyEdificio: string){
    return this.db.list(this.PATH, ref =>
      ref.orderByChild('edificioId')
      .equalTo(keyEdificio))
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(u => ({ key: u.payload.key, ...u.payload.val() }));
      }));
  }

  getUserData(uid: string){
      return this.db.object(this.PATH + uid)
      .snapshotChanges()
      .pipe(map(u =>{
        return { key: u.key, ...u.payload.val()};
      }));
    }

  alterarSindico(key: string, isSindico: boolean){
    return new Promise((resolve,reject)=>{
      this.db
      .object(this.PATH + key)
      .update( { sindico: isSindico } )
      .then(()=> resolve())
      .catch((e) => reject(e))
    })
  }
}
