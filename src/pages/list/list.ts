import { AnnouncementPage } from './../announcement/announcement';
import { CalendarPage } from './../calendar/calendar';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListDetailsPage } from '../list-details/list-details'
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  comunicados: string[];
  messages: string[];
  dates: string[];
  images: string[];
  items: Array<{title: string, note: string, date: string, image: string}>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public datePicker: DatePicker) {
    this.selectedItem = navParams.get('item');

    this.comunicados = ['Comunicado do Síndico', 'Comunicado da Administração'];
    this.messages = [ 'Proprietário do carro XXX-1111, favor comparecer a vaga estacionada.', 
    'Prezados, já encontra-se disponível o boleto para pagamento da taxa condominal.',
    'Prezados, na próxima segunda-feira haverá manutenção da piscina.' ];
    this.dates = ['10/04/2018', '11/04/2018', '03/04/2018'];
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
    this.navCtrl.push(AnnouncementPage);
  }
}

