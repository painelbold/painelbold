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
    this.getCondominios();
  }

  getCondominios(){
    this.createLoading("Carregando condomínios");

    let condSubscribe = this.cProvider.getAllCondominios()
    .subscribe((c: any) => {
      this.loading.dismiss();
      this.condominios = c;
      condSubscribe.unsubscribe();
    });
  }

  ionViewDidEnter(){
    if(this.edificioId != null && this.condominioId != null){
      this.loadEspacosFisicos();
    }
  }

  condChange(){
    this.getEdificios();
  }

  getEdificios(){
    let edSubscribe = this.eProvider.getAllEdificiosCond(this.condominioId)
    .subscribe((e: any) => {
      this.edificios = e;
      edSubscribe.unsubscribe();
    });
  }

  edfChange(){
    this.loadEspacosFisicos();
  }

  private loadEspacosFisicos() {
    this.createLoading("Carregando espaços físicos...");
    this.espacosFisicos = new Array<EspacoFisico>();
    let efSubscribe = this.efProvider.getAllEspacosEdificio(this.edificioId)
      .subscribe((ef: any) => {
        this.espacosFisicos = ef;
        this.loading.dismiss();
        efSubscribe.unsubscribe();
      });
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
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
      edificioId: this.edificioId,});
  }

}
