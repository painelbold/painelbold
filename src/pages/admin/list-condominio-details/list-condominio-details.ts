import { CondominioProvider } from './../../../providers/condominio/condominio';
import { NgForm } from '@angular/forms';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastController: ToastController,
    private cProvider: CondominioProvider) {
      this.condominio = navParams.get("item");
  }
  
  
  editarCondominio(form: NgForm){
    if(form.valid){
      this.cProvider.saveCondominio(this.condominio)
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

}
