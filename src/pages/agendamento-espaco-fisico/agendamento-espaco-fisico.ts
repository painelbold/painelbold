import { AgendamentoEspacoFisico } from './../../models/agendamentoEspacoFisico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EspacoFisico } from '../../models/espacoFisico';
import { EspacoFisicoProvider } from '../../providers/espaco-fisico/espaco-fisico';
import { AgendamentoEspacoFisicoProvider } from '../../providers/agendamento-espaco-fisico/agendamento-espaco-fisico';

@IonicPage()
@Component({
  selector: 'page-agendamento-espaco-fisico',
  templateUrl: 'agendamento-espaco-fisico.html',
})
export class AgendamentoEspacoFisicoPage {
  minHora: any;
  maxHora: any;
  minDate: any;
  maxDate: any;
  agendamentoForm: FormGroup;
  agendamento: AgendamentoEspacoFisico;
  espacosFisicos: Array<EspacoFisico>;
  edificioId: any;
  espacoId: string;
  loading: Loading;
  agendamentosList: Array<AgendamentoEspacoFisico>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private efProvider: EspacoFisicoProvider,
    private agendamentoEfProvider: AgendamentoEspacoFisicoProvider,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      this.edificioId = this.navParams.data.user.edificioId;
      this.espacosFisicos = new Array<EspacoFisico>();
      this.agendamentosList = new Array<AgendamentoEspacoFisico>();
      this.createForm();
      this.configLimitesDatas();
  }

  ionViewDidLoad() {
    this.carregaEspacosFisicos();
  }

  configLimitesDatas(){
    let today = new Date();

    this.minDate = today.toISOString();
    this.maxDate = new Date(today.getFullYear() + 1, 11, 31).toISOString();
  }

  private carregaEspacosFisicos() {
    this.createLoading("Carregando espaços físicos...");

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

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  createForm(){
    this.agendamentoForm = this.formBuilder.group({
      date: ['', Validators.required],
      espacoId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    })
  }

  agendaEspacoFisico(){

  }

  espacoFisicoChange(){
    this.atualizaLimitesHoras();
    this.carregaAgendamentos();
  }

  private atualizaLimitesHoras() {
    let ef = this.espacosFisicos.find(ef => ef.edificioId == this.edificioId);
    this.minHora = ef.startTime;
    this.maxHora = ef.endTime;
  }

  private carregaAgendamentos() {
    this.createLoading("Carregando agendamentos...");
    let espacoKey = this.agendamentoForm.controls["espacoId"].value;
    let subscribe = this.agendamentoEfProvider.getAgendamentosEspacoFisico(this.edificioId, espacoKey)
      .subscribe((agendamentos: any) => {
        this.loading.dismiss();
        this.agendamentosList = agendamentos;
        subscribe.unsubscribe();
      });
  }

  createToast(msg: string){
    this.toastCtrl.create({
      duration: 2000,
      message: msg,
      position: "bottom"
    }).present();
  }
}
