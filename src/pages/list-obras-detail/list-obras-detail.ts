import { Obra } from './../../models/obra';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the ListObrasDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-obras-detail',
  templateUrl: 'list-obras-detail.html',
})
export class ListObrasDetailPage {
  obra: Obra;
  user: Usuario;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private loadingCtrl: LoadingController) {
      this.obra = this.navParams.data.obra;
      this.user = this.navParams.data.user
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListObrasDetailPage');
  }

  loadCondomino(){
    this.createLoading("Carregando dados do condômino...");

    let condSubscribe = this.udProvider.getUserData(this.obra.userCreatedId)
    .subscribe((user: any) => {
      this.loading.dismiss();
      this.user = user;
    })
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

}
