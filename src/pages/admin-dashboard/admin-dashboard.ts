import { RegisterEdificioPage } from './../register-edificio/register-edificio';
import { RegisterCondominioPage } from './../register-condominio/register-condominio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  cadastraSindico(event){
  }

  cadastraAdmin(event){
  }

  cadastraCondominio(event){
    this.navCtrl.push(RegisterCondominioPage);
  }

  cadastraEdificio(event){
    this.navCtrl.push(RegisterEdificioPage);
  }

}
