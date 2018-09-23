import { ListObrasDetailPage } from './../list-obras-detail/list-obras-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

import { Obra } from '../../models/obra';
import { Usuario } from '../../models/usuario';
import { ObraProvider } from './../../providers/obra/obra';

@IonicPage()
@Component({
  selector: 'page-list-obras',
  templateUrl: 'list-obras.html',
})
export class ListObrasPage {
  obras: Array<Obra>;
  user: Usuario;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private obraProvider: ObraProvider,
    private loadingCtrl: LoadingController) {
    this.user = this.navParams.data.user;
    this.obras = new Array<Obra>();
    this.loadObras();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListObrasPage');
  }

  itemTapped(event, obra: Obra){
    this.navCtrl.push(ListObrasDetailPage, {
      obra: obra,
      user: this.user,
    });
  }

  loadObras(){
    this.createLoading("Carregando obras...");

    let obraSubscribe = this.obraProvider.getAllObras(this.user.edificioId)
    .subscribe((obras: any) => {
      this.loading.dismiss();
      this.obras = obras.sort((a,b) =>
        a.dateCreated <= b.dateCreated ? -1 : 1
      );
      obraSubscribe.unsubscribe();
    });
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

}
