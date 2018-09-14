import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListPedidosPage } from '../../list-pedidos/list-pedidos';
import { RegisterCondominioPage } from '../../register-condominio/register-condominio';
import { RegisterEdificioPage } from '../../register-edificio/register-edificio';
import { ListCondominiosPage } from '../list-condominios/list-condominios';
import { ListEdificiosPage } from './../../admin/list-edificios/list-edificios';
import { ListEspacoFisicoPage } from './../../admin/list-espaco-fisico/list-espaco-fisico';
import { ListMoradoresPage } from './../../admin/list-moradores/list-moradores';

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,) {
  }

  cadastraSindico(event){
    this.navCtrl.push(ListMoradoresPage);
  }

  cadastraCondominio(event){
    this.navCtrl.push(RegisterCondominioPage);
  }

  cadastraEdificio(event){
    this.navCtrl.push(RegisterEdificioPage);
  }

  listarCondominios(){
    this.navCtrl.push(ListCondominiosPage);
  }

  listarEdificios(){
    this.navCtrl.push(ListEdificiosPage);
  }

  cadastraEspaco(){
    this.navCtrl.push(ListEspacoFisicoPage);
  }

  viewPedidos(){
    this.navCtrl.push(ListPedidosPage)
  }

}
