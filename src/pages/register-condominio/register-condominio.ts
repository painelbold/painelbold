import { AuthService } from './../../providers/auth/auth-service';
import { Address } from './../../models/address';
import { Condominio } from './../../models/condominio';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register-condominio',
  templateUrl: 'register-condominio.html',
})
export class RegisterCondominioPage {
  condominio: Condominio = new Condominio();
  address: Address = new Address();
  userCreatedUid

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private condProvider: CondominioProvider,
              private toastController: ToastController,
              private auth: AuthService) {
    this.userCreatedUid = navParams.get("userUid");
  }

  register(form: NgForm){
    if(form.valid){
      this.condominio.endereco = this.address;
      this.condominio.dateCreated = new Date();
      this.condominio.userCreatedId = this.auth.getLoggedUser();

      this.condProvider.saveCondominio(this.condominio)
      .then((result: any) => {
        this.toastController.create({message: "Condomínio criado com sucesso", duration: 2000, position: "bottom"}).present();
        this.navCtrl.pop();
      })
      .catch((error)=>{
        this.toastController.create({message: "Erro na criação do condomínio", duration: 2000, position: "bottom"}).present();
        console.log("Erro na criação do condomínio: ", error);
      });
    }
  }

}
