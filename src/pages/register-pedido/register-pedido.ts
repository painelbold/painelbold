import { PedidoProvider } from './../../providers/pedido/pedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pedido } from '../../models/pedido';
import { Usuario } from '../../models/usuario';
import { ListPage } from '../list/list';

/**
 * Generated class for the RegisterPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-pedido',
  templateUrl: 'register-pedido.html',
})
export class RegisterPedidoPage {
  pedidoForm: FormGroup;
  category: Array<string>;
  loading: Loading;
  pedido: Pedido;
  user: Usuario;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private pedidoProvider: PedidoProvider) {
      this.user = this.navParams.data.user;
      this.createForm();
  }

  ionViewDidLoad() {
    this.category = ['Água', 'Comida', 'Gás', 'Remédio'];
  }

  createForm(){
    this.pedidoForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  createToast(msg: string){
    this.toastCtrl.create({
      duration: 2000,
      message: msg,
      position: "bottom"
    }).present();
  }

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  savePedido(){
    this.createLoading("Salvando pedido...");

    this.pedido = this.pedidoForm.value;
    this.pedido.userId = this.user.key;
    this.pedido.edificioId = this.user.edificioId;

    this.pedidoProvider.savePedido(this.pedido)
    .then(() => {
      this.loading.dismiss();
      this.createToast("Pedido salvo com sucesso!");
      this.navCtrl.setRoot(ListPage);
    })
    .catch((error: any) => {
      this.loading.dismiss();
      this.createToast("Erro ao salvar pedido.");
      console.log("Erro ao salvar pedido: " + error.code);
    })
  }
}
