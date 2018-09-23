import { UserDataProvider } from "./../../providers/user-data/user-data";
import { Usuario } from "./../../models/usuario";
import { AgendamentoEspacoFisico } from "./../../models/agendamentoEspacoFisico";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Loading, LoadingController } from "ionic-angular";
import { EspacoFisico } from '../../models/espacoFisico';

@IonicPage()
@Component({
  selector: "page-list-agendamento-espaco-fisico-detail",
  templateUrl: "list-agendamento-espaco-fisico-detail.html"
})
export class ListAgendamentoEspacoFisicoDetailPage {
  agendamento: AgendamentoEspacoFisico;
  espacoFisico: EspacoFisico;
  user: Usuario;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private loadingCtrl: LoadingController
  ) {
    this.user = new Usuario();
    this.agendamento = this.navParams.data.agendamento;
    this.espacoFisico = this.navParams.data.espaco;
    this.getUser();
  }

  ionViewDidLoad() {}

  getUser() {
    this.createLoading("Carregando dados do usuário...")

    let udSubscribe = this.udProvider.getUserData(this.agendamento.userKey)
    .subscribe((u: any) => {
      this.user = u;
      this.loading.dismiss();
      udSubscribe.unsubscribe();
    });
  }

  createLoading(msg: string) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }
}
