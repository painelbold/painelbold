import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { map } from 'rxjs/operators';
import { Pedido } from '../../models/pedido';
import firebase from 'firebase';

@Injectable()
export class PedidoProvider {
  private PATH='pedidos/'

  constructor(private db: AngularFireDatabase,) {
  }

  getAllPedidos(keyEdificio: string){
    return this.db.list(this.PATH + keyEdificio)
    .snapshotChanges()
    .pipe(map(changes => {
      return changes.map(e => ({key: e.payload.key, ...e.payload.val()}));
    }));
  }

  savePedido(pedido: Pedido){
    return new Promise((resolve, reject) => {
      if(pedido.key){
        this.db.list(this.PATH + pedido.edificioId)
        .update(pedido.key, pedido)
        .then(() => resolve())
        .catch((e) => reject(e))
      }
      else{
        pedido.dateCreated = firebase.database.ServerValue.TIMESTAMP;

        this.db.list(this.PATH + pedido.edificioId)
        .push(pedido)
        .then((result: any) => resolve(result.key))
      }
    });
  }

}
