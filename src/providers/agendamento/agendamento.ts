import { Usuario } from './../../models/usuario';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth/auth-service';
import { Agendamento } from '../../models/agendamento';

@Injectable()
export class AgendamentoProvider {
  private PATH = "agendamentos/";
  private agendamento: Agendamento;

  constructor(private db: AngularFireDatabase,
    private authService: AuthService) {

  }

  saveAgendamento(usuario: Usuario, data: Date){
    this.agendamento = new Agendamento();
    this.agendamento.dataAgendamento = data;
    this.agendamento.idUsuario = usuario.key;

    return new Promise((resolve,reject) =>{
      this.db.list(this.PATH)
      .update(usuario.edificioId, this.agendamento)
      .then(()=> resolve())
      .catch((e) => reject(e))
    })
  }

  getAgendamentoUsuario(usuario: Usuario){
    return this.db.object(this.PATH + usuario.edificioId)
    .snapshotChanges()
    .pipe(map(a =>{
      return {key: a.key, ...a.payload.val()};
    }));
  }

}
