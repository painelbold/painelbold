import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register'
import { ListPage } from '../list/list'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  selectedItem: any;
  registerPage = RegisterPage;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login(event) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.setRoot(ListPage);
  }
}
