import { UserDataProvider } from './../../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-moradores-details',
  templateUrl: 'list-moradores-details.html',
})
export class ListMoradoresDetailsPage {
  selectedItem:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private toastController: ToastController) {
    this.selectedItem = navParams.get('item');
  }

  tornarSindico(){
    this.udProvider.alterarSindico(this.selectedItem.key, true)
    .then((result: any) => {
      this.toastController.create({message: "O morador agora é síndico do edifício.", duration:2000, position:"bottom"}).present();
      this.navCtrl.pop();
    })
    .catch((error: any)=>{
      this.toastController.create({message: "Erro ao tornar o morador síndico.", duration:2000, position:"bottom"}).present();
      console.log("Erro ao tornar morador síndico: " + error);
    })
  }

  removerSindico(){
    this.udProvider.alterarSindico(this.selectedItem.key, false)
    .then((result: any) => {
      this.toastController.create({message: "O morador não é mais síndico do edifício.", duration:2000, position:"bottom"}).present();
      this.navCtrl.pop();
    })
    .catch((error: any)=>{
      this.toastController.create({message: "Erro ao remover o morador como síndico.", duration:2000, position:"bottom"}).present();
      console.log("Erro ao remover morador como síndico: " + error);
    })
  }
}
