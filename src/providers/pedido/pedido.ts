import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { map } from 'rxjs/operators';
import { Pedido } from '../../models/pedido';
import firebase from 'firebase';

export enum StatusPedido{
  Pendente,
  Encaminhado,
  Recebido
};

@Injectable()
export class PedidoProvider {
  private PATH='pedidos/';

  constructor(private db: AngularFireDatabase,) {

  }

  getAllPedidos(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(e => ({key: e.payload.key, ...e.payload.val()}));
    }));
  }

  getAllPedidosCondomino(keyCondomino: string){
    return this.db.list(this.PATH, ref =>
    ref.orderByChild("userId").equalTo(keyCondomino))
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(e => ({key: e.payload.key, ...e.payload.val()}));
    }));
  }

  savePedido(pedido: Pedido){
    return new Promise((resolve, reject) => {
      if(pedido.key){
        this.db.list(this.PATH)
        .update(pedido.key, pedido)
        .then(() => resolve())
        .catch((e) => reject(e))
      }
      else{
        pedido.dateCreated = firebase.database.ServerValue.TIMESTAMP;
        pedido.status = StatusPedido.Pendente;

        this.db.list(this.PATH)
        .push(pedido)
        .then((result: any) => resolve(result.key))
      }
    });
  }

}
