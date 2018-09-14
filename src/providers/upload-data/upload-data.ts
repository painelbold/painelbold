import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class UploadDataProvider {
  firebaseRef: any;
  PATH = 'files/'

  constructor() {
    this.firebaseRef = firebase.database().ref();
  }

  makeFileIntoBlob(_imagePath, name, type) {
    return new Promise((resolve, reject) => {
      window['resolveLocalFileSystemURL'](_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: type });
            imgBlob.name = name;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
           alert('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  getFileName(fileString){
     let file
     file = fileString.replace(/^.*[\\\/]/, '')
     return file;
  }

  getFileExt(fileString: string){
    let file = fileString.substr(fileString.lastIndexOf('.') + 1);
     return file;
  }
  getRequestFiles(edificioId: string): any {
     return this.firebaseRef.child(this.PATH);
  }

  addAssignmentFile(edificioId: string, file:any): any{
    return this.firebaseRef.child(this.PATH)
  //Saves the file to storage
            .put(file.blob,{contentType:file.type}).then((savedFile) => {
  //Gets the file url and saves it in the database
                 this.firebaseRef.child(this.PATH).push({
                 file: savedFile.downloadURL,
                 name: file.filename,
                 ext: file.fileext,
                 type: file.type
            });
        })

    }
  }
