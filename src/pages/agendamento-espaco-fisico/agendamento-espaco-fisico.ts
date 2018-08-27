import { AgendamentoEspacoFisico } from './../../models/agendamentoEspacoFisico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EspacoFisico } from '../../models/espacoFisico';
import { EspacoFisicoProvider } from '../../providers/espaco-fisico/espaco-fisico';

@IonicPage()
@Component({
  selector: 'page-agendamento-espaco-fisico',
  templateUrl: 'agendamento-espaco-fisico.html',
})
export class AgendamentoEspacoFisicoPage {
  minHora: any;
  agendamentoForm: FormGroup;
  agendamento: AgendamentoEspacoFisico;
  espacosFisicos: Array<EspacoFisico>;
  edificioId: any;
  espacoId: string;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private efProvider: EspacoFisicoProvider,
    private formBuilder: FormBuilder) {
      this.edificioId = this.navParams.data.user.edificioId;
      this.espacosFisicos = new Array<EspacoFisico>();
      this.createForm();
  }

  ionViewDidLoad() {
    this.createLoading();

    let subscribe = this.efProvider.getAllEspacosEdificio(this.edificioId)
    .subscribe((ef: any) => {
      this.espacosFisicos = ef;
      this.loading.dismiss();
      subscribe.unsubscribe();
    });
  }

  horaInicialChange(){
    this.minHora = this.agendamentoForm.controls["startTime"].value;
  }

  createLoading(){
    this.loading = this.loadingCtrl.create({
      content: "Carregando espaços físicos..."
    });
    this.loading.present();
  }

  createForm(){
    this.agendamentoForm = this.formBuilder.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    })
  }

}
