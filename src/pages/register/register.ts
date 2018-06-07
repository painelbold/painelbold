import { UserDataProvider } from './../../providers/user-data/user-data';
import { ListPage } from './../list/list';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth-service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerCredentials = { email: '', password: '', confirmPassword: ''};
  usuario: Usuario = new Usuario();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastController: ToastController,
    private authService: AuthService,
    private userProvider: UserDataProvider) {   
  }

  goBack(event) {
    this.navCtrl.pop();
  }

  onRegister(form: NgForm) {
    if (form.valid){
      if(this.registerCredentials.password == this.registerCredentials.confirmPassword){
        this.authService.createUser(this.registerCredentials)
        .then((result: any)=> {
          this.usuario.email = this.registerCredentials.email;
          this.usuario.admin = false;
          this.usuario.assinante = false;
          
          this.userProvider.saveUserData(JSON.parse(JSON.stringify(this.usuario)), result.user.uid);
  
          this.toastController.create({message: "Usuário criado com sucesso", duration: 2000, position: "bottom"}).present();
          this.navCtrl.setRoot(ListPage);
        })
        .catch((error:any)=>{
          switch (error.code){
            case "auth/email-already-in-use":
            this.toastController.create({message: "O e-mail inserido já está em uso.", duration: 2000, position: "bottom"}).present();
            break;
            case "auth/invalid-email":
            this.toastController.create({message: "O e-mail inserido é inválido.", duration: 2000, position: "bottom"}).present();
            break;
            case "auth/operation-not-allowed":
            this.toastController.create({message: "A operação não é permitida.", duration: 2000, position: "bottom"}).present();
            break;
            case "auth/weak-password":
            this.toastController.create({message: "A senha escolhida é fraca.", duration: 2000, position: "bottom"}).present();
            break;
            default:
            console.log("Erro ao registrar usuário: " + error.code);
            break;
          }
        })
      }
      else
      {
        this.toastController.create({message: "As senhas digitadas são diferentes.", duration: 2000, position: "bottom"}).present();
      }
    }
  }
}
