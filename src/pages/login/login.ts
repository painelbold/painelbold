import { AuthService } from './../../providers/auth/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register'
import { ListPage } from '../list/list'
import { NgForm } from '@angular/forms';
import { ResetPasswordPage } from '../reset-password/reset-password';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  selectedItem: any;

  loginFields = { email: '', password: '', stayConnected: '' };

  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private menu: MenuController,
    private toastController: ToastController) {

  }

  ionViewDidEnter(){
    this.menu.enable(false, 'sideMenu');
  }

  login(form: NgForm) {
    if(form.valid){
      this.authService.signIn(this.loginFields)
      .then(()=> {
        if(this.loginFields.stayConnected){
          this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        }
        else{
          this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        }
        this.menu.enable(true, 'sideMenu');
        this.navCtrl.setRoot(ListPage);
      })
      .catch((error)=>{
        let toast = this.toastController.create({duration: 2000, position: "bottom"});

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
