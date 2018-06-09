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
  comunicados: string[];
  messages: string[];
  dates: string[];
  images: string[];
  items: Array<{title: string, note: string, date: string, image: string}>;
  usuario: Usuario;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private udProvider: UserDataProvider) {
  
      const subscribe = udProvider.getUserData()
      .subscribe((u: any) => {
        this.usuario = u;

        subscribe.unsubscribe();
      });  

    this.images = [ 'assets/imgs/avatar1.jpg', 'assets/imgs/avatar2.jpg']

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: this.comunicados[Math.floor(Math.random() * this.comunicados.length)],
        note: this.messages[Math.floor(Math.random() * this.messages.length)],
        date: this.dates[Math.floor(Math.random() * this.dates.length)],
        image: this.images[Math.floor(Math.random() * this.images.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(ListDetailsPage, {
      item: item
    });
  }

  showDates(event){
    this.navCtrl.push(CalendarPage);
  }

  newAnnouncement(){
    this.navCtrl.push(AnnouncementPage, {
      edificioId: this.usuario.edificioId
    });
  }
}

