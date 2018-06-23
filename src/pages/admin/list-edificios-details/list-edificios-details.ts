import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
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
    private toastController: ToastController,
    private eProvider: EdificioProvider) {
      this.edificio = navParams.get("item");
  }

  editarEdificio(form: NgForm){
    if(form.valid){
      this.eProvider.saveEdificio(this.edificio)
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

}
