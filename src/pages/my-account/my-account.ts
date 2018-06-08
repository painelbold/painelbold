import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { Usuario } from './../../models/usuario';
import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  usuario: Usuario;
  myAccountForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private udProvider: UserDataProvider,
              private formBuilder: FormBuilder) {
    
    this.usuario = new Usuario();
    this.createForm();

    const subscribe = udProvider.getUserData()
                .subscribe((u: any) => {
                  this.usuario = u;
                  this.createForm();

                  subscribe.unsubscribe();
                });
  }

  createForm(){
    this.myAccountForm = this.formBuilder.group({
      key: [this.usuario.key],
      fullName: [this.usuario.fullName, Validators.required],
      cpf: [this.usuario.cpf, Validators.required],
      phone: [this.usuario.phone],
    })
  }



  editarConta(){
    this.navCtrl.setRoot(ListPage);
  }

}
