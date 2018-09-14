import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class SocialShareProvider {

  constructor(private socialSharing: SocialSharing) {
  }

  whatsappShare() {
    this.socialSharing
      .shareViaWhatsApp(
        "Vizinho, fique sabendo de tudo que acontece no nosso condomínio",
        null,
        "https://play.google.com/store/apps/details?id=com.br.viva.painelBold"
      )
      .then(() => {
        console.log("Mensagem enviada por WhatsApp");
      })
      .catch(error => {
        console.log(error);
      });
  }
}
