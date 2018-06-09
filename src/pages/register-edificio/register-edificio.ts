import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CondominioProvider } from './../../providers/condominio/condominio';
import { EdificioProvider } from './../../providers/edificio/edificio';
import { Edificio } from './../../models/edificio';
import { IonicPage, NavController, NavParams, ToastController, List } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-register-edificio',
  templateUrl: 'register-edificio.html',
})
export class RegisterEdificioPage {
  edificio: Edificio;
  condominios: Observable<any>;
  edificioForm: FormGroup;
  condominioId: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private edificioProvider: EdificioProvider,
              private condProvider: CondominioProvider,
              private toastController: ToastController,
              private db: AngularFireDatabase,
              private formBuilder: FormBuilder,) {
    this.edificio = new Edificio();

    this.condominios = this.condProvider.getAllCondominios();

    this.createForm();
  }

  createForm(){
    this.edificioForm = this.formBuilder.group({
      nome: [this.edificio.nome, Validators.required],
      bloco: [this.edificio.bloco],
      condominioId: [this.condominioId]
    })
  }

  registerEdificio(form: NgForm){
    this.edificio = this.edificioForm.value;
    this.edificio.condominioId = this.condominioId;

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
