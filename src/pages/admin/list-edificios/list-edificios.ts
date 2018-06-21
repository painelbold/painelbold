import { ListEdificiosDetailsPage } from './../../admin/list-edificios-details/list-edificios-details';
import { EdificioProvider } from './../../../providers/edificio/edificio';
import { CondominioProvider } from './../../../providers/condominio/condominio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-list-edificios',
  templateUrl: 'list-edificios.html',
})
export class ListEdificiosPage {
  condominios: Observable<any>;
  edificios: Observable<any>;
  condominioId: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private cProvider: CondominioProvider,
    private eProvider: EdificioProvider) {
  }

  ionViewDidEnter() {
    this.condominios = this.cProvider.getAllCondominios();
  }

  condChange(){
    this.edificios = this.eProvider.getAllEdificiosCond(this.condominioId);
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListEdificiosDetailsPage, {
      item: item
    });
  }
}
