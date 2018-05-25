import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  selectedItem: any;

  tipoRegistro: string;
  tipoCond: string;

  icons: string[];

  items: Array<{ title: string, note: string, icon: string }>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tipoRegistro = 'u';
    this.tipoCond = 'a';
  }

  goBack(event) {
    this.navCtrl.pop();
  }

  onRegister(form: NgForm) {
    console.log(form);
    this.navCtrl.setRoot(ListPage);
  }
}
