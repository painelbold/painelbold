import { CondominioProvider } from './../../../providers/condominio/condominio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Condominio } from '../../../models/condominio';

@IonicPage()
@Component({
  selector: 'page-list-condominio-details',
  templateUrl: 'list-condominio-details.html',
})
export class ListCondominioDetailsPage {
  condominio: Condominio;
  condominioForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private cProvider: CondominioProvider) {
      this.condominio = navParams.get("item");

      this.createForm();
  }
  
  createForm(){
    this.condominioForm = this.formBuilder.group({
      nome: [this.condominio.nome, Validators.required],
      logradouro: [this.condominio.endereco.logradouro, Validators.required],
      complemento: [this.condominio.endereco.complemento],
      bairro: [this.condominio.endereco.bairro, Validators.required],
      cep: [this.condominio.endereco.cep, Validators.required],
    })
  }
  
  editarCondominio(){
    this.cProvider.saveCondominio(this.condominioForm.value)
    .then(()=>{
      this.toastController.create({message: "Condomínio alterado com sucesso.", duration: 2000, position: "bottom"}).present();
      this.navCtrl.pop();
    })
    .catch((error)=>{
      this.toastController.create({message: "Erro ao alterar dados do condomínio.", duration: 2000, position: "bottom"}).present();
      console.log("Erro ao alterar dados do condomínio:" + error);
    })
  }

}
