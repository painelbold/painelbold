import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Condominio } from '../../../models/condominio';
import { Edificio } from '../../../models/edificio';
import { Usuario } from '../../../models/usuario';
import { CondominioProvider } from '../../../providers/condominio/condominio';
import { ListMoradoresDetailsPage } from '../list-moradores-details/list-moradores-details';
import { EdificioProvider } from './../../../providers/edificio/edificio';
import { UserDataProvider, UserType } from './../../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: "page-list-moradores",
  templateUrl: "list-moradores.html"
})
export class ListMoradoresPage {
  condominios: Array<Condominio>;
  edificios: Array<Edificio>;
  users: Array<Usuario>;
  sindicos: Array<Usuario>;
  condominioId: any;
  edificioId: string;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private condProvider: CondominioProvider,
    private edfProvider: EdificioProvider,
    private loadingCtrl: LoadingController,
  ) {
    this.users = new Array<Usuario>();
    this.sindicos = new Array<Usuario>();
  }

  ionViewDidEnter() {
    this.createLoading("Carregando condomínios...");
    let condSubscribe = this.condProvider.getAllCondominios()
    .subscribe((cond: any) => {
      this.loading.dismiss();
      this.condominios = cond;
      condSubscribe.unsubscribe();
    });
  }

  condChange() {
    this.createLoading("Carregando edifícios...");
    let edfSubscriber = this.edfProvider.getAllEdificiosCond(this.condominioId)
    .subscribe((edf: any) => {
      this.loading.dismiss();
      this.edificios = edf;
      edfSubscriber.unsubscribe();
    });
  }

  edfChange() {
    this.createLoading("Carregando moradores...");
    let userDataSubscribe = this.udProvider
      .getAllUsersEdificio(this.edificioId)
      .subscribe((u: any) => {
        this.loading.dismiss();
        this.orderMoradores(u);
        userDataSubscribe.unsubscribe();
      });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListMoradoresDetailsPage, {
      item: item
    });
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg,
    });
    this.loading.present();
  }

  orderMoradores(users: Array<Usuario>){
    this.sindicos = users.filter(
      u => u.userType == UserType.Sindico
    );
    this.users = users.filter(
      u => u.userType == UserType.Condomino
    );
  }
}
