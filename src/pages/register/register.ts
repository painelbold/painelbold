import { ListPage } from './../list/list';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth-service';
import { User } from '../../models/user';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  selectedItem: any;

  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  
  user: User = new User();
  @ViewChild('registerForm') form = NgForm;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastController: ToastController,
    private authService: AuthService) {   
  }

  goBack(event) {
    this.navCtrl.pop();
  }

  onRegister(form: NgForm) {
    
  }
}
