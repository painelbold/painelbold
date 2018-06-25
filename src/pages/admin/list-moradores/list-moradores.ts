import { AngularFireList } from 'angularfire2/database';
import { EdificioProvider } from './../../../providers/edificio/edificio';
import { UserDataProvider } from './../../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CondominioProvider } from '../../../providers/condominio/condominio';


@IonicPage()
@Component({
  selector: 'page-list-moradores',
  templateUrl: 'list-moradores.html',
})
export class ListMoradoresPage {
  condominios: Observable<any>;
  edificios: Observable<any>;
  users: AngularFireList<any>;
  condominioId: any;  
  edificioId: any;

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

}
