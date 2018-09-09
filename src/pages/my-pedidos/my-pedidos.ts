import { MyPedidosListPage } from './../my-pedidos-list/my-pedidos-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { RegisterPedidoPage } from '../register-pedido/register-pedido';

@IonicPage()
@Component({
  selector: 'page-my-pedidos',
  templateUrl: 'my-pedidos.html',
})
export class MyPedidosPage {
  user: Usuario;
  addPedidoTab = RegisterPedidoPage;
  prevPedidosTab = MyPedidosListPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
      this.user = this.navParams.data.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPedidosPage');
  }

}
