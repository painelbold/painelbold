import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Loading, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { EspacoFisico } from '../../../models/espacoFisico';
import { EspacoFisicoProvider } from '../../../providers/espaco-fisico/espaco-fisico';

@IonicPage()
@Component({
  selector: 'page-register-espaco-fisico',
  templateUrl: 'register-espaco-fisico.html',
})
export class RegisterEspacoFisicoPage {
  edificioId: string;
  espacoFisicoForm: FormGroup;
  ef: EspacoFisico;
  minHora: any;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public efProvider: EspacoFisicoProvider,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toast: ToastController) {
      this.ef = new EspacoFisico();
      this.edificioId = this.navParams.data.edificioId;
      if(this.navParams.data.espacoFisico){
        this.ef = this.navParams.data.espacoFisico;
      }
      this.createForm();
  }

  createForm(){
    this.espacoFisicoForm = this.fb.group({
      name: [this.ef.name, Validators.required],
      description: [this.ef.description, Validators.required],
      startTime: [this.ef.startTime, Validators.required],
      endTime: [this.ef.endTime, Validators.required],
    })
  }

  saveEspacoFisico(){
    this.createLoading();

    this.ef = this.espacoFisicoForm.value;
    this.ef.edificioId = this.edificioId;

    this.efProvider.saveEspaco(this.ef)
    .then(() => {
      this.loading.dismiss();
      this.toast.create({
        message: "Espaço físico criado com sucesso!",
        duration: 2000,
        position: "bottom"
      });
      this.navCtrl.pop();
    })
    .catch((error : any) => {
      this.toast.create({
        message: "Erro ao salvar espaço físico.",
        duration: 2000,
        position: "bottom"
      });
      console.log("Erro ao salvar espaço físico." + error.code);
    });
  }

  horaInicialChange(){
    this.minHora = this.espacoFisicoForm.controls["startTime"].value;
  }

  createLoading(){
    this.loading = this.loadingCtrl.create({
      content: "Salvando espaço físico..."
    });
    this.loading.present();
  }

  removeEspacoFisico(){

  }

}
