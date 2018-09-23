import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Pedido } from '../../models/pedido';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { ListPedidosDetailPage } from '../list-pedidos-detail/list-pedidos-detail';
import { StatusPedido } from './../../providers/pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-list-pedidos',
  templateUrl: 'list-pedidos.html',
})
export class ListPedidosPage {
  loading: Loading;
  pedidos: Array<Pedido>;
  pedidosPendentes: Array<Pedido>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pedidoProvider: PedidoProvider,
    private loadingCtrl: LoadingController,) {
      this.pedidos = new Array<Pedido>();
      this.pedidosPendentes = new Array<Pedido>();
  }

  ionViewDidEnter() {
    this.loadPedidos();
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  private loadPedidos() {
    this.createLoading("Carregando pedidos...");
    this.pedidos = new Array<Pedido>();
    let pedidoSubscribe = this.pedidoProvider.getAllPedidos()
      .subscribe((p: Array<Pedido>) => {
        this.pedidosPendentes = p.filter( pedido =>
          pedido.status == StatusPedido.Pendente)
          .sort((a,b) =>
            a.dateCreated <= b.dateCreated ? -1 : 1
          );
        this.loading.dismiss();
        pedidoSubscribe.unsubscribe();
      });
  }

  itemTapped(event, p: Pedido){
    this.navCtrl.push(ListPedidosDetailPage, {
      pedido: p,
    });
  }

}
