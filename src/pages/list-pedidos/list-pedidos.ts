import { Usuario } from './../../models/usuario';
import { ListPedidosDetailPage } from '../list-pedidos-detail/list-pedidos-detail';
import { Edificio } from './../../models/edificio';
import { EdificioProvider } from './../../providers/edificio/edificio';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { Condominio } from '../../models/condominio';
import { Pedido } from '../../models/pedido';

@IonicPage()
@Component({
  selector: 'page-list-pedidos',
  templateUrl: 'list-pedidos.html',
})
export class ListPedidosPage {
  condominioId: string;
  edificioId: string;
  loading: Loading;
  condominios: Array<Condominio>;
  edificios: Array<Edificio>;
  pedidos: Array<Pedido>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pedidoProvider: PedidoProvider,
    private condProvider: CondominioProvider,
    private loadingCtrl: LoadingController,
    private edfProvider: EdificioProvider) {
  }

  ionViewDidLoad() {
    this.getCondominios();
  }

  getCondominios(){
    this.createLoading("Carregando condomínios");

    let condSubscribe = this.condProvider.getAllCondominios()
    .subscribe((c: any) => {
      this.loading.dismiss();
      this.condominios = c;
      condSubscribe.unsubscribe();
    });
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  condChange(){
    this.getEdificios();
  }

  getEdificios(){
    let edSubscribe = this.edfProvider.getAllEdificiosCond(this.condominioId)
    .subscribe((e: any) => {
      this.edificios = e;
      edSubscribe.unsubscribe();
    });
  }

  edfChange(){
    this.loadPedidos();
  }

  private loadPedidos() {
    this.createLoading("Carregando espaços físicos...");
    this.pedidos = new Array<Pedido>();
    let pedidoSubscribe = this.pedidoProvider.getAllPedidos(this.edificioId)
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
