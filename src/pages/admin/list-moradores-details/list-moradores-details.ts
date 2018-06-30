import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-moradores-details',
  templateUrl: 'list-moradores-details.html',
})
export class ListMoradoresDetailsPage {
  selectedItem:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }

}
