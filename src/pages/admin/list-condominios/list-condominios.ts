import { CondominioProvider } from './../../../providers/condominio/condominio';
import { Usuario } from './../../../models/usuario';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListCondominioDetailsPage } from '../list-condominio-details/list-condominio-details';

@IonicPage()
@Component({
  selector: 'page-list-condominios',
  templateUrl: 'list-condominios.html',
})
export class ListCondominiosPage {
  condominios: Observable<any>;
  usuario: Usuario;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private cProvider: CondominioProvider) {
  }

  ionViewDidEnter() {
    this.condominios = this.cProvider.getAllCondominios();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListCondominioDetailsPage, {
      item: item
    });
  }

}
