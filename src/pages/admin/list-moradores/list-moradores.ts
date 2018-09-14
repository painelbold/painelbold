import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import { Usuario } from "../../../models/usuario";
import { CondominioProvider } from "../../../providers/condominio/condominio";
import { ListMoradoresDetailsPage } from "../list-moradores-details/list-moradores-details";
import { EdificioProvider } from "./../../../providers/edificio/edificio";
import { UserDataProvider } from "./../../../providers/user-data/user-data";
import { Condominio } from "../../../models/condominio";
import { Edificio } from "../../../models/edificio";

@IonicPage()
@Component({
  selector: "page-list-moradores",
  templateUrl: "list-moradores.html"
})
export class ListMoradoresPage {
  condominios: Array<Condominio>;
  edificios: Array<Edificio>;
  users: Array<Usuario>;
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
  ) {}

  ionViewDidEnter() {
    this.createLoading("Carregando condomínios...");
    let condSubscribe = this.condProvider.getAllCondominios()
    .subscribe((cond: any) => {
      this.loading.dismiss();
      this.condominios = cond;
    });
  }

  condChange() {
    this.createLoading("Carregando edifícios...");
    let edfSubscriber = this.edfProvider.getAllEdificiosCond(this.condominioId)
    .subscribe((edf: any) => {
      this.loading.dismiss();
      this.edificios = edf;
    });
  }

  edfChange() {
    this.createLoading("Carregando moradores...");
    let userDataSubscribe = this.udProvider
      .getAllUsersEdificio(this.edificioId)
      .subscribe((u: any) => {
        this.loading.dismiss();
        this.users = u;
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

  }
}
