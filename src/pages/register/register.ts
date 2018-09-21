import { EdificioProvider } from "./../../providers/edificio/edificio";
import { CondominioProvider } from "./../../providers/condominio/condominio";
import { UserDataProvider } from "./../../providers/user-data/user-data";
import { ListPage } from "./../list/list";
import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  MenuController
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../providers/auth/auth-service";
import { Usuario } from "../../models/usuario";
import { Observable } from "rxjs/Observable";
import { UserType } from "../../providers/user-data/user-data";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  registerCredentials = { email: "", password: "", confirmPassword: "" };
  usuario: Usuario = new Usuario();
  condominios: Observable<any>;
  edificios: Observable<any>;
  condominioId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastController: ToastController,
    private authService: AuthService,
    private userProvider: UserDataProvider,
    private condProvider: CondominioProvider,
    private edfProvider: EdificioProvider,
    private menu: MenuController
  ) {
    this.condominios = this.condProvider.getAllCondominios();
  }

  ionViewDidEnter() {
    this.menu.enable(false, "sideMenu");
  }

  goBack(event) {
    this.navCtrl.pop();
  }

  condChange() {
    this.edificios = this.edfProvider.getAllEdificiosCond(this.condominioId);
  }

  onRegister(form: NgForm) {
    if (form.valid) {
      if (
        this.registerCredentials.password ==
        this.registerCredentials.confirmPassword
      ) {
        this.authService
          .createUser(this.registerCredentials)
          .then((result: any) => {
            this.usuario.email = this.registerCredentials.email;
            this.usuario.userType = UserType.Condomino;
            this.usuario.assinante = false;

            this.userProvider
              .saveUserData(this.usuario, result.user.uid)
              .catch((error: any) => {
                this.createToast("Erro na criação do usuário.");
                console.log(error);
              });

            this.createToast("Usuário criado com sucesso.");
            this.menu.enable(true, 'sideMenu');
            this.navCtrl.setRoot(ListPage);
          })
          .catch((error: any) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                this.createToast("O e-mail inserido já está em uso.");
                break;
              case "auth/invalid-email":
                this.createToast("O e-mail inserido é inválido.");
                break;
              case "auth/operation-not-allowed":
                this.createToast("A operação não é permitida.");
                break;
              case "auth/weak-password":
                this.createToast("A senha escolhida é fraca.");
                break;
              default:
                console.log("Erro ao registrar usuário: " + error.code);
                break;
            }
          });
      } else {
        this.createToast("As senhas digitadas são diferentes.");
      }
    }
  }

  createToast(msg: string) {
    this.toastController
      .create({
        message: msg,
        duration: 2000,
        position: "bottom"
      })
      .present();
  }
}
