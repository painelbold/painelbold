import { LoadingController, Loading } from 'ionic-angular';

export default class Utils{
  loading: Loading;
  loadingCtrl: LoadingController;

  createLoading(msg: string){
    this.loading = this.loadingCtrl.create({
      content: msg,
    });
    this.loading.present();
  }
}
