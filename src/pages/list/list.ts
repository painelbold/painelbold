import { AuthService } from './../../providers/auth/auth-service';
import { AgendamentoProvider } from './../../providers/agendamento/agendamento';
import { Agendamento } from './../../models/agendamento';
import { Observable } from 'rxjs/Observable';
import { AnnouncementProvider } from './../../providers/announcement/announcement';
import { Usuario } from './../../models/usuario';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AnnouncementPage } from './../announcement/announcement';
import { CalendarPage } from './../calendar/calendar';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { ListDetailsPage } from '../list-details/list-details'
import { messaging } from 'firebase';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  comunicados: Observable<any>;
  usuario: Usuario = new Usuario();
  agendamento: Observable<any>;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private aProvider: AnnouncementProvider,
    private agProvider: AgendamentoProvider,
    private loadingCtrl: LoadingController,
    private authService: AuthService) {
  }

  ionViewDidEnter(){
    this.createLoading("Carregando comunicados...");
    const subscribe = this.udProvider.getUserData(this.authService.getLoggedUser().uid)
    .subscribe((u: any) => {
      this.loading.dismiss();
      this.usuario = u;
      this.comunicados = this.aProvider.getAllByEdificio(this.usuario.edificioId);
      this.agendamento = this.agProvider.getAgendamentoUsuario(this.usuario);

      subscribe.unsubscribe();
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListDetailsPage, {
      item: item
    });
  }

  showDates(event){
    this.navCtrl.push(CalendarPage, {
      user: this.usuario
    });
  }

  newAnnouncement(){
    this.navCtrl.push(AnnouncementPage, {
      edificioId: this.usuario.edificioId
    });
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg,
    });
    this.loading.present();
  }
}
