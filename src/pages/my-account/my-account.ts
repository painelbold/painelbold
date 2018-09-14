import { AuthService } from "./../../providers/auth/auth-service";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { Usuario } from "./../../models/usuario";
import { UserDataProvider } from "./../../providers/user-data/user-data";

@IonicPage()
@Component({
  selector: "page-my-account",
  templateUrl: "my-account.html"
})
export class MyAccountPage {
  usuario: Usuario;
  myAccountForm: FormGroup;
  passwordForm: FormGroup;
  password: any;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private udProvider: UserDataProvider,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {
    this.usuario = this.navParams.data.user;
    this.createAccountForm();
    this.createPasswordForm();
  }

  createAccountForm() {
    this.myAccountForm = this.formBuilder.group({
      fullName: [this.usuario.fullName, Validators.required],
      cpf: [this.usuario.cpf, Validators.required],
      phone: [this.usuario.phone]
    });
  }

  editarConta() {
    this.createLoading("Alterando dados pessoais...");
    this.udProvider
      .saveUserData(this.myAccountForm.value, this.usuario.key)
      .then(() => {
        this.loading.dismiss();
        this.createToast("Dados pessoais atualizados com sucesso.");
      })
      .catch(error => {
        this.loading.dismiss();
        this.createToast("Erro na atualização dos dados pessoais.");
        console.log("Erro na atualização dos dados pessoais:" + error);
      });
  }

  createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      new: ["", Validators.required],
      old: ["", Validators.required],
      confirm: ["", Validators.required]
    });

    this.password = this.passwordForm.value;
  }

  changePassword() {
    if (this.validatePassword()) {
      this.createLoading("Alterando senha...");
      this.authService
        .changePassword(this.password)
        .then(() => {
          this.loading.dismiss();
          this.createPasswordForm();
          this.createToast("Senha alterada com sucesso.");
        })
        .catch((error: any) => {
          this.loading.dismiss();
          switch (error.code) {
            case "auth/wrong-password":
              this.createToast("A senha digitada está incorreta.");
              break;
            default:
              this.createToast("Erro na alteração da senha.");
              break;
          }
        });
    }
  }

  validatePassword() {
    this.password = this.passwordForm.value;

    if (this.password.old == this.password.new) {
      this.createToast("Escolha uma senha diferente.");
      return false;
    }
    if (this.password.new != this.password.confirm) {
      this.createToast("As senhas digitadas não conferem.");
      return false;
    }
    return true;
  }

  createToast(msg: string) {
    this.toastController
      .create({
        duration: 2000,
        message: msg,
        position: "bottom"
      })
      .present();
  }

  createLoading(msg: string) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }
}
