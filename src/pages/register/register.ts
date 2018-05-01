import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  selectedItem: any;
  tipoRegistro: string;
  tipoCond: string;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tipoRegistro = 'u';
    this.tipoCond = 'a';
  }

  goBack(event){
    this.navCtrl.pop();
  } 

  registrar(event){
    this.navCtrl.setRoot(ListPage)
  }
}
