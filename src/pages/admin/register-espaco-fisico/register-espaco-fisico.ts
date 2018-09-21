import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { EspacoFisico } from "../../../models/espacoFisico";
import { Usuario } from "../../../models/usuario";
import { EspacoFisicoProvider } from "../../../providers/espaco-fisico/espaco-fisico";
import { AdminDashboardPage } from "../admin-dashboard/admin-dashboard";
import { UserType } from '../../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: "page-register-espaco-fisico",
  templateUrl: "register-espaco-fisico.html"
})
export class RegisterEspacoFisicoPage {
  edificioId: string;
  espacoFisicoForm: FormGroup;
  ef: EspacoFisico;
  minHora: any;
  loading: Loading;
  user: Usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public efProvider: EspacoFisicoProvider,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.ef = new EspacoFisico();
    this.user = this.navParams.data.user;

    if (this.user) {
      this.edificioId = this.user.edificioId;
    } else {
      this.edificioId = this.navParams.data.edificioId;
    }

    if (this.navParams.data.espacoFisico) {
      this.ef = this.navParams.data.espacoFisico;
    }
    this.createForm();
  }

  createForm() {
    if (this.ef === new EspacoFisico()) {
      this.espacoFisicoForm = this.fb.group({
        name: ["", Validators.required],
        description: ["", Validators.required],
        startTime: ["", Validators.required],
        endTime: ["", Validators.required]
      });
    } else {
      this.espacoFisicoForm = this.fb.group({
        name: [this.ef.name, Validators.required],
        description: [this.ef.description, Validators.required],
        startTime: [this.ef.startTime, Validators.required],
        endTime: [this.ef.endTime, Validators.required]
      });
    }
  }

  saveEspacoFisico() {
    this.createLoading("Salvando espaço físico...");

    this.ef = this.espacoFisicoForm.value;
    this.ef.edificioId = this.edificioId;

    this.efProvider
      .saveEspaco(this.ef)
      .then(() => {
        this.loading.dismiss();
        this.createToast("Espaço físico criado com sucesso!");
        if (this.user.userType == UserType.Sindico) {
          this.navCtrl.pop();
        } else if (this.user.userType == UserType.Administrador) {
          this.navCtrl.setRoot(AdminDashboardPage);
        }
      })
      .catch((error: any) => {
        this.loading.dismiss();
        this.createToast("Erro ao salvar espaço físico.");
        console.log("Erro ao salvar espaço físico." + error.code);
      });
  }

  horaInicialChange() {
    this.minHora = this.espacoFisicoForm.controls["startTime"].value;
  }

  createLoading(msg: string) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  removeEspacoFisico() {
    let alert = this.alertCtrl.create({
      title: "Confirmar Exclusão",
      message: "Tem certeza que deseja excluir o espaço físico?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Confirmar",
          handler: () => {
            this.createLoading("Removendo espaço físico...");
            this.efProvider
              .removerEspaco(this.ef)
              .then(() => {
                this.loading.dismiss();
                this.createToast("Espaço físico removido com sucesso.");
                this.navCtrl.pop();
              })
              .catch((error: any) => {
                this.loading.dismiss();
                this.createToast("Erro na remoção do espaço físico.");
                console.log("Erro na remoção do espaço físico: " + error.code);
              });
          }
        }
      ]
    });
    alert.present();
  }

  createToast(msg: string) {
    this.toastCtrl
      .create({
        duration: 2000,
        message: msg,
        position: "bottom"
      })
      .present();
  }
}
