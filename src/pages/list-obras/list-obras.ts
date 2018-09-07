import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Obra } from '../../models/obra';

/**
 * Generated class for the ListObrasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-obras',
  templateUrl: 'list-obras.html',
})
export class ListObrasPage {
  obras: Array<Obra>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obras = new Array<Obra>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListObrasPage');
  }

  itemTapped(event, obra: Obra){

  }

}
