import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Condominio } from '../../models/condominio';
import { Pedido } from '../../models/pedido';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { ListPedidosDetailPage } from '../list-pedidos-detail/list-pedidos-detail';
import { Edificio } from './../../models/edificio';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { EdificioProvider } from './../../providers/edificio/edificio';

@IonicPage()
@Component({
  selector: 'page-list-pedidos',
  templateUrl: 'list-pedidos.html',
})
export class ListPedidosPage {
  loading: Loading;
  pedidos: Array<Pedido>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pedidoProvider: PedidoProvider,
    private loadingCtrl: LoadingController,) {
      this.pedidos = new Array<Pedido>();
  }

  ionViewDidLoad() {
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
      .subscribe((p: any) => {
        this.pedidos = p;
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
