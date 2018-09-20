import { Pedido } from './../../models/pedido';
import { PedidoProvider } from './../../providers/pedido/pedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the MyPedidosListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-pedidos-list',
  templateUrl: 'my-pedidos-list.html',
})
export class MyPedidosListPage {
  pedidos: Array<Pedido>;
  user: Usuario;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pedidoProvider: PedidoProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
      this.user = this.navParams.data;
      this.pedidos = new Array<Pedido>();
  }

  ionViewDidEnter() {
    this.loadPedidos();
  }

  loadPedidos(){
    this.createLoading("Carregando pedidos...");
    let pedidoSubscribe = this.pedidoProvider.getAllPedidosCondomino(this.user.key)
    .subscribe((p: any) => {
      this.loading.dismiss();
      this.pedidos = p;
      pedidoSubscribe.unsubscribe();
    });
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  refazPedido(p: Pedido){
    this.createLoading("Refazendo pedido...");
    p.key = null;
    p.dateCreated = null;

    this.pedidoProvider.savePedido(p)
    .then(() => {
      this.loading.dismiss();
      this.createToast("Pedido refeito com sucesso!");
      this.loadPedidos();
    })
    .catch((error: any) => {
      this.loading.dismiss();
      this.createToast("Erro ao refazer pedido.");
    });
  }

  createToast(msg: string){
    this.toastCtrl.create({
      duration: 2000,
      message: msg,
      position: "bottom"
    }).present();
  }

}
