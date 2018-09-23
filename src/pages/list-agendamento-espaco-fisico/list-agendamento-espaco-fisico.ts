import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Usuario } from '../../models/usuario';
import { AgendamentoEspacoFisicoProvider } from '../../providers/agendamento-espaco-fisico/agendamento-espaco-fisico';
import { EspacoFisicoProvider } from '../../providers/espaco-fisico/espaco-fisico';
import {
  ListAgendamentoEspacoFisicoDetailPage,
} from '../list-agendamento-espaco-fisico-detail/list-agendamento-espaco-fisico-detail';
import { AgendamentoEspacoFisico } from './../../models/agendamentoEspacoFisico';
import { EspacoFisico } from './../../models/espacoFisico';

@IonicPage()
@Component({
  selector: "page-list-agendamento-espaco-fisico",
  templateUrl: "list-agendamento-espaco-fisico.html"
})
export class ListAgendamentoEspacoFisicoPage {
  espacosFisicos: Array<EspacoFisico>;
  agendamentosEf: Array<AgendamentoEspacoFisico>;
  espacoFisicoKey: EspacoFisico;
  edificioKey: string;
  loading: Loading;
  user: Usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private efProvider: EspacoFisicoProvider,
    private aefProvider: AgendamentoEspacoFisicoProvider
  ) {
    this.user = this.navParams.data.user;
    this.espacosFisicos = new Array<EspacoFisico>();
    this.agendamentosEf = new Array<AgendamentoEspacoFisico>();
    this.edificioKey = this.user.edificioId;
  }

  ionViewDidLoad() {
    this.loadEspacosFisicos(this.edificioKey);
  }

  espacoFisicoChange() {
    this.createLoading("Carregando agendamentos...");

    this.getAgendamentosEspacoFisico();
  }

  // private getAllAgendamentos() {
  //   let aefSubscribe = this.aefProvider
  //     .getAllAgendamentos(this.edificioKey)
  //     .subscribe((aef: any) => {
  //       this.agendamentosEf = aef;
  //       this.loading.dismiss();
  //       aefSubscribe.unsubscribe();
  //     });
  // }

  private getAgendamentosEspacoFisico(){
    let aefSubscribe =  this.aefProvider
        .getAgendamentosEspacoFisico(this.edificioKey, this.espacoFisicoKey.key)
        .subscribe((aef: any) => {
          this.agendamentosEf = aef;
          this.loading.dismiss();
          aefSubscribe.unsubscribe();
        });
  }

  createLoading(msg: string) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  loadEspacosFisicos(edificioKey: string){
    this.createLoading("Carregando espaços físicos...");
    let efSubscribe = this.efProvider.getAllEspacosEdificio(edificioKey)
    .subscribe((ef: any) => {
      this.espacosFisicos = ef.sort((a,b) =>
        a.dateCreated <= b.dateCreated ? -1 : 1
      );
      this.loading.dismiss();
      efSubscribe.unsubscribe();
    });
  }

  openDetails(aef: AgendamentoEspacoFisico){
    this.navCtrl.push(ListAgendamentoEspacoFisicoDetailPage,{
      agendamento: aef,
      espaco: this.espacoFisicoKey
    })
  }
}
