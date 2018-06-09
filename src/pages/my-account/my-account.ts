import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { Usuario } from './../../models/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  usuario: Usuario;
  myAccountForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private udProvider: UserDataProvider,
              private formBuilder: FormBuilder,
              private toastController: ToastController) {
    
    this.usuario = new Usuario();
    this.createForm();

    const subscribe = udProvider.getUserData()
                .subscribe((u: any) => {
                  this.usuario = u;
                  this.createForm();

                  subscribe.unsubscribe();
                });
  }

  createForm(){
    this.myAccountForm = this.formBuilder.group({
      fullName: [this.usuario.fullName, Validators.required],
      cpf: [this.usuario.cpf, Validators.required],
      phone: [this.usuario.phone],
    })
  }


  editarConta(){
    this.udProvider.saveUserData(this.myAccountForm.value, this.usuario.key)
    .then(()=>{
      this.toastController.create({message: "Dados pessoais atualizados com sucesso.", duration: 2000, position: "bottom"}).present();
    })
    .catch((error)=>{
      this.toastController.create({message: "Erro na atualização dos dados pessoais.", duration: 2000, position: "bottom"}).present();
      console.log("Erro na atualização dos dados pessoais:" + error);
    })
  }

}
