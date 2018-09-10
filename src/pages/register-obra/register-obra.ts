import { ListPage } from './../list/list';
import { Usuario } from './../../models/usuario';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Loading, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { ObraProvider } from './../../providers/obra/obra';
import { Obra } from '../../models/obra';

@IonicPage()
@Component({
  selector: 'page-register-obra',
  templateUrl: 'register-obra.html',
})
export class RegisterObraPage {
  obraForm: FormGroup;
  loading: Loading;
  obra: Obra;
  user: Usuario;
  minHora: any;
  minDate: any;
  maxDate: any;
  minEndDate: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private obraProvider: ObraProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
      this.user = this.navParams.data.user;
      this.createForm();
  }

  ionViewDidLoad() {
    this.configLimitesDatas();
  }

  createForm(){
    this.obraForm = this.formBuilder.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    })
  }

  createToast(msg: string){
    this.toastCtrl.create({
      duration: 2000,
      message: msg,
      position: "bottom"
    }).present();
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  registerObra(){
    this.createLoading("Salvando obra...");

    this.obra = this.obraForm.value;
    this.obra.userCreatedId = this.user.key;
    this.obra.edificioId = this.user.edificioId;
    this.obra.unit = this.user.unit;

    this.obraProvider.saveObra(this.obra)
    .then(() => {
      this.loading.dismiss();
      this.createToast("Obra cadastrada com sucesso!");
      this.navCtrl.setRoot(ListPage);
    })
    .catch((error: any) => {
      this.loading.dismiss();
      this.createToast("Erro ao salvar obra.");
      console.log("Erro ao salvar obra: " + error.code);
    })
  }

  horaInicialChange(){
    this.minHora = this.obraForm.controls["startTime"].value;
    if(this.minHora > this.obraForm.controls["endTime"].value){
      this.obraForm.patchValue({
        endTime: ''
      });
    }
  }

  dtInicioChange() {
    this.minEndDate = this.obraForm.controls["startDate"].value;
    if(this.minEndDate > this.obraForm.controls["endDate"].value){
      this.obraForm.patchValue({
        endDate: ''
      });
    }
  }

  configLimitesDatas(){
    let today = new Date();

    this.minDate = today.toISOString();
    this.maxDate = new Date(today.getFullYear() + 1, 11, 31).toISOString();
  }
}
