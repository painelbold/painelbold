import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from '../../../../node_modules/rxjs/Observable';
import { CondominioProvider } from '../../../providers/condominio/condominio';
import { EdificioProvider } from '../../../providers/edificio/edificio';

/**
 * Generated class for the ListEspacoFisicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-espaco-fisico',
  templateUrl: 'list-espaco-fisico.html',
})
export class ListEspacoFisicoPage {
  condominios: Observable<any>;
  edificios: Observable<any>;
  condominioId: any;
  edificioId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cProvider: CondominioProvider,
    private eProvider: EdificioProvider) {
  }

  ionViewDidLoad() {
    this.condominios = this.cProvider.getAllCondominios();
  }

  condChange(){
    this.edificios = this.eProvider.getAllEdificiosCond(this.condominioId);
  }

  edfChange(){
  }

}
