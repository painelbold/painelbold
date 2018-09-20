import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { Pedido } from '../../models/pedido';
import { Edificio } from '../../models/edificio';
import { EdificioProvider } from '../../providers/edificio/edificio';

@IonicPage()
@Component({
  selector: 'page-list-pedidos-detail',
  templateUrl: 'list-pedidos-detail.html',
})
export class ListPedidosDetailPage {
  user: Usuario;
  edificio: Edificio;
  pedido: Pedido;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private edfProvider: EdificioProvider,
    private loadCtrl: LoadingController) {
      this.pedido = this.navParams.data.pedido;
      this.user = new Usuario();
      this.edificio = new Edificio();
      this.loadUserData();
      this.loadEdificioData();
  }

  loadUserData(){
    this.createLoading("Carregando dados do usuário...");

    let userSubscribe = this.udProvider.getUserData(this.pedido.userId)
    .subscribe((user: any) => {
      this.loading.dismiss();
      this.user = user;
      userSubscribe.unsubscribe();
    });
  }

  loadEdificioData(){

    let edificioSubscribe = this.edfProvider.getEdificioById(this.pedido.edificioId)
    .subscribe((edf: any) => {
      this.edificio = edf;
      edificioSubscribe.unsubscribe();
    });
  }

  createLoading(msg: string){
    this.loading = this.loadCtrl.create({
      content: msg
    });
    this.loading.present();
  }


}
