import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth/auth-service';
import { RegisterCondominioPage } from '../../register-condominio/register-condominio';
import { RegisterEdificioPage } from '../../register-edificio/register-edificio';
import { ListCondominiosPage } from '../list-condominios/list-condominios';

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
  }

  cadastraAdmin(event){
  }

  cadastraCondominio(event){
    this.navCtrl.push(RegisterCondominioPage, {userUid: ''});
  }

  cadastraEdificio(event){
    this.navCtrl.push(RegisterEdificioPage, {userUid: this.authService.getLoggedUser()});
  }

  listarCondominios(){
    this.navCtrl.push(ListCondominiosPage);
  }

}