import { AnnouncementProvider } from './../../providers/announcement/announcement';
import { Announcement } from './../../models/announcement';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage {
  announcement: any;
  title: string;
  announcementForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private announcementProvider: AnnouncementProvider ) {
      this.announcement = this.navParams.data.announcement || {};

      this.setupPageTitle();
  }

  private setupPageTitle(){
    this.createForm();
    this.title = this.navParams.data.announcement ? "Editar comunicado" : "Novo Comunicado";
  }

  createForm(){
    this.announcementForm = this.formBuilder.group({
      key: [this.announcement.key],
      title: [this.announcement.title, Validators.required],
      message: [this.announcement.message, Validators.required],
      
    })
  }

  onSave(){
    if(this.announcementForm.valid){
      this.announcementProvider.save(this.announcementForm.value)
      .then(()=>{
        this.toastController.create({message: "Comunicado salvo com sucesso!", duration: 1500, position: "bottom"}).present();
        this.navCtrl.pop();
      })
      .catch((error) => {
        this.toastController.create({message: "Erro ao salvar o comunicado.", duration: 1500, position: "bottom"}).present();
        console.log("Erro ao salvar o comunicado: " + error);
      })
    }
  }

}
