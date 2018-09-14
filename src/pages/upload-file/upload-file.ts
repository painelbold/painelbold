import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Usuario } from '../../models/usuario';
import { UploadDataProvider } from '../../providers/upload-data/upload-data';

@IonicPage()
@Component({
  selector: 'page-upload-file',
  templateUrl: 'upload-file.html',
})
export class UploadFilePage {
  user: Usuario;
  fileInfo: { fileEntry: string, fileExt: string, filename: string }
  selectedFile: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private udProvider: UploadDataProvider,
    private toastCtrl: ToastController) {
      this.user = this.navParams.data.user;
      this.fileInfo = { fileEntry: '', fileExt: '', filename: ''}
      this.selectedFile = "Selecionar arquivo"
  }

  doUpload(){
    switch(this.fileInfo.fileExt){
      case "pdf":
      this.saveFile("application/pdf");
      break;
      case "docx":
      this.saveFile("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      break;
      case "doc":
      this.saveFile("application/msword");
      break;
      case "xlsx":
      this.saveFile("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      break;
      case "txt":
      this.saveFile("text/plain")
      default:
      this.createToast("Tipo de arquivo inválido.");
      break;
     }
  }

  uploadFile(){
    this.fileChooser.open()
    .then((uri) => {
     this.filePath.resolveNativePath(uri)
     .then((fileentry) => {
       this.fileInfo.fileEntry = fileentry;
       this.fileInfo.filename = this.udProvider.getFileName(fileentry);
       this.fileInfo.fileExt = this.udProvider.getFileExt(fileentry);
       this.selectedFile = this.fileInfo.filename;
      })
      .catch((error: any) => {
        this.createToast("Erro ao obter informações do arquivo.");
      });
    })
    .catch((error: any) => {
      this.createToast("Erro ao abrir arquivo.");
    });
  }


  private saveFile(fileType: string) {
    let file;

    this.udProvider.makeFileIntoBlob(this.fileInfo.fileEntry, this.fileInfo.fileExt, fileType).then((fileblob) => {
      file = {
        blob: fileblob,
        type: fileType,
        fileExt: this.fileInfo.fileExt,
        filename: this.fileInfo.filename
      };

      this.udProvider.addAssignmentFile(this.user.edificioId, file);
    })
    .then(() => {
      this.createToast("Arquivo enviado com sucesso!");
    })
    .catch((error) => {
      this.createToast("Erro no envio do arquivo.");
    });
  }

  createToast(msg: string){
    this.toastCtrl.create({
      duration: 2000,
      message: msg,
      position: "bottom"
    }).present();
  }


}
