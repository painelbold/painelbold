import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register-buildings',
  templateUrl: 'register-buildings.html',
})
export class RegisterBuildingsPage {
  tipoRegistro: string;
  tipoCond: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tipoRegistro = 'c';
    this.tipoCond = 'a';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterBuildingsPage');
  }

  register(){
    this.navCtrl.setRoot(ListPage);
  }

}
