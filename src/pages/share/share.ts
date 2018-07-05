import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }

  whatsappShare(){
    this.socialSharing.shareViaWhatsApp("Vizinho, fique sabendo de tudo que acontece no nosso condomínio",null,"https://play.google.com/store/apps/details?id=com.br.viva.painelBold")
    .then(()=>{
      console.log("Mensagem enviada por WhatsApp");
    }).catch((error) => {
      console.log(error);
    });
  }

  emailShare(){
    this.presentPrompt();
    // this.socialSharing
    // .shareViaEmail("Experimente nosso aplicativo","Teste",["teste@teste.com"])
    // .then(()=>{
    //   console.log("Mensagem enviada por email");
    // }).catch((error) => {
    //   console.log(error);
    // });
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
