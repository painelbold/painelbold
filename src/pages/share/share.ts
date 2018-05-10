import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }

  whatsappShare(){
    this.socialSharing.shareViaWhatsApp("Experimente o nosso aplicativo","assets/imgs/logo.png","http://www.google.com.br/")
    .then(()=>{
      console.log("Mensagem enviada por WhatsApp");
    }).catch((error) => {
      console.log(error);
    });
  }

  emailShare(){
    this.socialSharing
    .shareViaEmail("Experimente nosso aplicativo","Teste",["teste@teste.com"])
    .then(()=>{
      console.log("Mensagem enviada por email");
    }).catch((error) => {
      console.log(error);
    });
  }

}
