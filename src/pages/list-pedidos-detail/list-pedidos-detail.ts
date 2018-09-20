import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { Pedido } from '../../models/pedido';
import { Edificio } from '../../models/edificio';
import { EdificioProvider } from '../../providers/edificio/edificio';
import { Condominio } from '../../models/condominio';
import { CondominioProvider } from '../../providers/condominio/condominio';
import { Address } from '../../models/address';

@IonicPage()
@Component({
  selector: 'page-list-pedidos-detail',
  templateUrl: 'list-pedidos-detail.html',
})
export class ListPedidosDetailPage {
  user: Usuario;
  edificio: Edificio;
  condominio: Condominio;
  pedido: Pedido;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private edfProvider: EdificioProvider,
    private condProvider: CondominioProvider,
    private loadCtrl: LoadingController) {
      this.pedido = this.navParams.data.pedido;
      this.user = new Usuario();
      this.edificio = new Edificio();
      this.condominio = new Condominio();
      this.condominio.endereco = new Address();
      this.loadUserData();
  }

  loadUserData(){
    this.createLoading("Carregando dados do usuário...");

    let userSubscribe = this.udProvider.getUserData(this.pedido.userId)
    .subscribe((user: any) => {
      this.loading.dismiss();
      this.user = user;
      userSubscribe.unsubscribe();
      this.loadEdificioData();
    });
  }

  loadEdificioData(){
    this.createLoading("Carregando dados do edifício...");

    let edificioSubscribe = this.edfProvider.getEdificio(this.pedido.edificioId)
    .subscribe((edf: any) => {
      this.loading.dismiss();
      this.edificio = edf;
      edificioSubscribe.unsubscribe();
      this.loadCondominioData(this.edificio.condominioId);
    });
  }

  loadCondominioData(condKey: string){
    this.createLoading("Carregando dados do condomínio...");

    let condSubscribe = this.condProvider.getCondominio(condKey)
    .subscribe((cond: any) => {
      this.loading.dismiss();
      this.condominio = cond;
      condSubscribe.unsubscribe();
    });
  }

  createLoading(msg: string){
    this.loading = this.loadCtrl.create({
      content: msg
    });
    this.loading.present();
  }


}
