import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EdificioProvider } from './../../../providers/edificio/edificio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Edificio } from '../../../models/edificio';

@IonicPage()
@Component({
  selector: 'page-list-edificios-details',
  templateUrl: 'list-edificios-details.html',
})
export class ListEdificiosDetailsPage {
  edificio: Edificio;
  edificioForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private eProvider: EdificioProvider) {
    this.edificio = navParams.get("item");
    
    this.createForm();
  }

  createForm(){
    this.edificioForm = this.formBuilder.group({
      nome: [this.edificio.nome, Validators.required],
      bloco: [this.edificio.bloco, Validators.required],
    })
  }

  editarEdificio(){
    this.eProvider.saveEdificio(this.edificioForm.value)
    .then(()=>{
      this.toastController.create({message: "Edifício alterado com sucesso.", duration: 2000, position: "bottom"}).present();
      this.navCtrl.pop();
    })
    .catch((error)=>{
      this.toastController.create({message: "Erro ao alterar dados do edifício.", duration: 2000, position: "bottom"}).present();
      console.log("Erro ao alterar dados do edifício:" + error);
    })
  }

}
