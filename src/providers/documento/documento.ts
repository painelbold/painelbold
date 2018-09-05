import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class DocumentoProvider {
  private PATH = 'documentos/';

  constructor(private db: AngularFireDatabase,
  private storage: AngularFireStorage) {

  }

  getDocumentosEdificio(condominioKey: string, edificioKey: string){
    return this.db.list(this.PATH + condominioKey + '/' + edificioKey)
    .snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    }));
  }

  uploadDocumentosEdificio(information){
    let fileName = `${new Date().getTime()}.pdf`;

    return this.storage.ref(`this.PATH${fileName}`).putString(information);
  }

  saveInfoUploadDocumento(info){
    let toSave = {
      timeCreated: info.timeCreated,
      url: info.downloadURLs[0],
      fullPath: info.fullPath,
      contentType: info.contentType
    }

    return this.db.list(this.PATH).push(toSave);
  }

  deleteFile(){

  }


}
