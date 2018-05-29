import { AuthService } from './../../providers/auth/auth-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  userEmail: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    private toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword(form: NgForm){
    if(form.valid){
      let toast = this.toastController.create({duration: 500, position: "bottom"});

      this.authService.resetPassword(this.userEmail)
      .then(()=>{
        toast.setMessage("E-mail de recuperação de senha enviado com sucesso para " + this.userEmail);
        toast.present();

        this.navCtrl.pop();
      }).catch((error)=>{
        switch(error.code){
          case "auth/invalid-email":
          toast.setMessage("O e-mail inserido é inválido.");
          break;
          case "auth/user-not-found":
          toast.setMessage("O usuário não encontrado.");
          break;
          default:
          toast.setMessage("Erro: " + error.code);
          break;
        }
        toast.present();
      });
    }
  }

}
