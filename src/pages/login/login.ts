import { User } from './../../models/user';
import { AuthService } from './../../providers/auth/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register'
import { ListPage } from '../list/list'
import { NgForm } from '@angular/forms';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  selectedItem: any;
  user: User = new User();
  
  loginFields = { email: '', password: '', stayConnected: '' };
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService: AuthService,
    private toastController: ToastController) {
    
  }

  login(form: NgForm) {
    if(form.valid){
      this.authService.signIn(this.user)
      .then(()=> {
        this.navCtrl.setRoot(ListPage)
      })
      .catch((error)=>{
        let toast = this.toastController.create({duration: 500, position: "bottom"});

        switch(error.code){
          case "auth/invalid-email":
          toast.setMessage("O e-mail inserido não é válido.");
          break;
          case "auth/user-disabled":
          toast.setMessage("O usuário está desabilitado.");          
          break;
          case "auth/user-not-found":
          toast.setMessage("Usuário não encontrado.");          
          break;
          case "auth/wrong-password":
          toast.setMessage("E-mail ou senha incorretos.");          
          break;
          default:
          toast.setMessage("Erro: " + error.code);
          break;
        }
        toast.present();
      });
    }
  }

  createAccount(event) {
    this.navCtrl.push(RegisterPage);
  }

  resetPassword(event){
    this.navCtrl.push(ResetPasswordPage);
  }
}
