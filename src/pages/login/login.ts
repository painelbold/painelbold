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
  loginFields = { email: '', password: '', stayConnected: '' };
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  login(event) {
    this.navCtrl.setRoot(ListPage);
  }

  createAccount(event) {
    this.navCtrl.push(RegisterPage);
  }
}
