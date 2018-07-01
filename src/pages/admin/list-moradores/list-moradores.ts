import { EdificioProvider } from './../../../providers/edificio/edificio';
import { UserDataProvider } from './../../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CondominioProvider } from '../../../providers/condominio/condominio';
import { ListMoradoresDetailsPage } from '../list-moradores-details/list-moradores-details';

@IonicPage()
@Component({
  selector: 'page-list-moradores',
  templateUrl: 'list-moradores.html',
})
export class ListMoradoresPage {
  condominios: Observable<any>;
  edificios: Observable<any>;
  users: Observable<any>;
  condominioId: any;  
  edificioId: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private cProvider: CondominioProvider,
    private eProvider: EdificioProvider
    ) {
  }

  ionViewDidEnter() {
    this.condominios = this.cProvider.getAllCondominios();
  }

  condChange(){
    this.edificios = this.eProvider.getAllEdificiosCond(this.condominioId);
  }

  edfChange(){
    this.users = this.udProvider.getAllUsersEdificio(this.edificioId);
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListMoradoresDetailsPage, {
      item: item
    });
  }

}