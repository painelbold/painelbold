import { UploadFilePage } from './../../upload-file/upload-file';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../../providers/auth/auth-service';
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
  user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private authService: AuthService,) {
    this.user = this.navParams.get("user");
  }

  cadastraSindico(event){
    this.navCtrl.push(ListMoradoresPage);
  }

  cadastraCondominio(event){
    this.navCtrl.push(RegisterCondominioPage);
  }

  cadastraEdificio(event){
    this.navCtrl.push(RegisterEdificioPage, {userUid: this.authService.getLoggedUser()});
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

  uploadDoc(){
    this.navCtrl.push(UploadFilePage);
  }

}
