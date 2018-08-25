import { RegisterEspacoFisicoPage } from './../register-espaco-fisico/register-espaco-fisico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

import { EspacoFisico } from '../../../models/espacoFisico';
import { CondominioProvider } from '../../../providers/condominio/condominio';
import { EdificioProvider } from '../../../providers/edificio/edificio';
import { EspacoFisicoProvider } from '../../../providers/espaco-fisico/espaco-fisico';
import { Condominio } from './../../../models/condominio';
import { Edificio } from './../../../models/edificio';

@IonicPage()
@Component({
  selector: 'page-list-espaco-fisico',
  templateUrl: 'list-espaco-fisico.html',
})
export class ListEspacoFisicoPage {
  condominios: Array<Condominio>;
  edificios: Array<Edificio>;
  espacosFisicos: Array<EspacoFisico>;
  condominioId: any;
  edificioId: string;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cProvider: CondominioProvider,
    private eProvider: EdificioProvider,
    private efProvider: EspacoFisicoProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let condSubscribe = this.cProvider.getAllCondominios()
    .subscribe((c: any) => {
      this.condominios = c;
      condSubscribe.unsubscribe();
    })
  }

  condChange(){
    let edSubscribe = this.eProvider.getAllEdificiosCond(this.condominioId)
    .subscribe((e: any) => {
      this.edificios = e;
      edSubscribe.unsubscribe();
    });
  }

  edfChange(){
    this.createLoading();
    this.espacosFisicos = new Array<EspacoFisico>();

    let efSubscribe = this.efProvider.getAllEspacosEdificio(this.edificioId)
    .subscribe((ef: any) => {
      this.espacosFisicos = ef;
      this.loading.dismiss();
      efSubscribe.unsubscribe();
    });
  }

  createLoading(){
    this.loading = this.loadingCtrl.create({
      content: "Carregando espaços físicos..."
    });
    this.loading.present();
  }

  itemTapped(event, ef){
    this.navCtrl.push(RegisterEspacoFisicoPage, {
      espacoFisico: ef
    });
  }

  newEspacoFisico(){
    this.navCtrl.push(RegisterEspacoFisicoPage, {
      edificioId: this.edificioId});
  }

}
