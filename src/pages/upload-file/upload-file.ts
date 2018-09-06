import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UploadFilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-file',
  templateUrl: 'upload-file.html',
})
export class UploadFilePage {


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fileChooser: FileChooser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadFilePage');
  }

  uploadFile(){
    this.fileChooser.open()
    .then(uri => console.log(uri))
    .catch(e => console.log(e));
  }

}
