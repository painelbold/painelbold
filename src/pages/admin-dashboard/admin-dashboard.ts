import { AuthService } from './../../providers/auth/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterEdificioPage } from './../register-edificio/register-edificio';
import { RegisterCondominioPage } from './../register-condominio/register-condominio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth: AngularFireAuth, 
              private authService: AuthService) {
  } 

  cadastraSindico(event){
  }

  cadastraAdmin(event){
  }

  cadastraCondominio(event){
    this.navCtrl.push(RegisterCondominioPage, {userUid: this.authService.getLoggedUser()});
  }

  cadastraEdificio(event){
    this.navCtrl.push(RegisterEdificioPage, {userUid: this.authService.getLoggedUser()});
  }

}
