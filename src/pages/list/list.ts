import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListDetailsPage } from '../../pages/list-details/list-details'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  comunicados: string[];
  messages: string[];
  dates: string[];
  items: Array<{title: string, note: string, icon: string, date: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'football', 'paper-plane', 'build'];
    this.comunicados = ['Comunicado do Síndico', 'Comunicado da Administração'];
    this.messages = [ 'Proprietário do carro XXX-1111, favor comparecer a vaga estacionada.', 
    'Prezados, já encontra-se disponível o boleto para pagamento da taxa condominal.',
    'Prezados, na próxima segunda-feira haverá manutenção da piscina.' ];
    this.dates = ['10/04/2018', '11/04/2018', '03/04/2018'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: this.comunicados[Math.floor(Math.random() * this.comunicados.length)],
        note: this.messages[Math.floor(Math.random() * this.messages.length)],
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        date: this.dates[Math.floor(Math.random() * this.dates.length)],
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListDetailsPage, {
      item: item
    });
  }
}

