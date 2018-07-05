import { AgendamentoProvider } from './../../providers/agendamento/agendamento';
import { Agendamento } from './../../models/agendamento';
import { Observable } from 'rxjs/Observable';
import { AnnouncementProvider } from './../../providers/announcement/announcement';
import { Usuario } from './../../models/usuario';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AnnouncementPage } from './../announcement/announcement';
import { CalendarPage } from './../calendar/calendar';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListDetailsPage } from '../list-details/list-details'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  comunicados: Observable<any>;
  usuario: Usuario = new Usuario();
  agendamento: Observable<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private udProvider: UserDataProvider,
    private aProvider: AnnouncementProvider,
    private agProvider: AgendamentoProvider) {
  }

  ionViewDidEnter(){
    const subscribe = this.udProvider.getUserData()
    .subscribe((u: any) => {
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
}

