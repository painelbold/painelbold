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
    console.log("entrou");
    console.log(form.form.valid);
    if (form.valid){
      console.log("é valido");
      console.log(this.user.email);
      console.log(this.user.password);
      let toast = this.toastController.create({duration: 100, position: "bottom"});

      this.authService.createUser(this.user)
      .then((user: any)=> {
        toast.setMessage("Usuário criado com sucesso");
        toast.present();
        this.navCtrl.setRoot(ListPage);
      })
      .catch((error:any)=>{
        console.log("catch");
        switch (error.code){
          case "auth/email-already-in-use":
          toast.setMessage("O e-mail inserido já está em uso.");
          break;
          case "auth/invalid-email":
          toast.setMessage("O e-mail inserido é inválido.");
          break;
          case "auth/operation-not-allowed":
          toast.setMessage("A operação não é permitida");
          break;
          case "auth/weak-password":
          toast.setMessage("A senha escolhida é fraca.");
          break;
          default:
          toast.setMessage("Erro: " + error.code);
          break;
        }
      })
    }
  }
}
