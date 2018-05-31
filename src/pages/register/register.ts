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
    if (form.valid){
      this.authService.createUser(this.user)
      .then((user: any)=> {
        this.toastController.create({message: "Usuário criado com sucesso", duration: 500, position: "bottom"}).present;
        this.navCtrl.setRoot(ListPage);
      })
      .catch((error:any)=>{
        switch (error.code){
          case "auth/email-already-in-use":
          this.toastController.create({message: "O e-mail inserido já está em uso.", duration: 500, position: "bottom"}).present;
          break;
          case "auth/invalid-email":
          this.toastController.create({message: "O e-mail inserido é inválido.", duration: 500, position: "bottom"}).present;
          break;
          case "auth/operation-not-allowed":
          this.toastController.create({message: "A operação não é permitida.", duration: 500, position: "bottom"}).present;
          break;
          case "auth/weak-password":
          this.toastController.create({message: "A senha escolhida é fraca.", duration: 500, position: "bottom"}).present;
          break;
          default:
          console.log("Erro ao registrar usuário: " + error.code);
          break;
        }
      })
    }
  }
}
