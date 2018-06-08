import { Observable } from 'rxjs/Observable';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { EdificioProvider } from './../../providers/edificio/edificio';
import { NgForm } from '@angular/forms';
import { Edificio } from './../../models/edificio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, List } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Condominio } from '../../models/condominio';

@IonicPage()
@Component({
  selector: 'page-register-edificio',
  templateUrl: 'register-edificio.html',
})
export class RegisterEdificioPage {
  edificio: Edificio;
  condominios: Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private edificioProvider: EdificioProvider,
              private condProvider: CondominioProvider,
              private toastController: ToastController,
              private db: AngularFireDatabase) {
    this.edificio = new Edificio();
    this.condominios = this.condProvider.getAllCondominios();
  }

  registerEdificio(form: NgForm){
    if(form.valid){
      this.edificioProvider.saveEdificio(this.edificio)
      .then((result: any) => {
        this.toastController.create({message: "Edifício criado com sucesso", duration: 2000, position: "bottom"}).present();
        this.navCtrl.pop();
      })
      .catch((error)=>{
        this.toastController.create({message: "Erro na criação do edifício", duration: 2000, position: "bottom"}).present();
        console.log("Erro na criação do condomínio: ", error);
      });
    }
  }

}
