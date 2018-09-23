import 'firebase/firestore';

import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuth } from 'angularfire2/auth';
import { Nav, Platform, MenuController } from 'ionic-angular';

import { AboutBoldPage } from '../pages/about-bold/about-bold';
import { RegisterEspacoFisicoPage } from '../pages/admin/register-espaco-fisico/register-espaco-fisico';
import { AgendamentoEspacoFisicoPage } from '../pages/agendamento-espaco-fisico/agendamento-espaco-fisico';
import { LoginPage } from '../pages/login/login';
import { MyPedidosPage } from '../pages/my-pedidos/my-pedidos';
import { PrivacyPage } from '../pages/privacy/privacy';
import { RegisterObraPage } from '../pages/register-obra/register-obra';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { Usuario } from './../models/usuario';
import { AboutPage } from './../pages/about/about';
import { AdminDashboardPage } from './../pages/admin/admin-dashboard/admin-dashboard';
import { ListObrasPage } from './../pages/list-obras/list-obras';
import { ListPage } from './../pages/list/list';
import { MyAccountPage } from './../pages/my-account/my-account';
import { SharePage } from './../pages/share/share';
import { UploadFilePage } from './../pages/upload-file/upload-file';
import { AuthService } from './../providers/auth/auth-service';
import { SocialShareProvider } from './../providers/social-share/social-share';
import { UserDataProvider, UserType } from './../providers/user-data/user-data';
import { ListAgendamentoEspacoFisicoPage } from '../pages/list-agendamento-espaco-fisico/list-agendamento-espaco-fisico';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  loggedUser: Usuario;
  userType: string;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private menu: MenuController,
    private udProvider: UserDataProvider,
    private socialProvider: SocialShareProvider) {
    this.initializeApp();
    this.verificaUserLogado(afAuth);
  }

  private verificaUserLogado(afAuth: AngularFireAuth) {
    this.loggedUser = new Usuario();
    this.loggedUser.fullName = "";
    this.userType = "";
    let authObserver = afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.menu.enable(true,'sideMenu');
        let userObserver = this.udProvider.getUserData(user.uid)
          .subscribe((user: any) => {
            this.loggedUser = user;
            if (this.loggedUser.userType == UserType.Administrador) {
              this.adminLogged();
            }
            else if (this.loggedUser.userType == UserType.Sindico) {
              this.sindicoLogged();
            }
            else {
              this.userLogged();
            }
            userObserver.unsubscribe();
          });
      }
      else {
        this.menu.enable(false,'sideMenu');
        this.rootPage = LoginPage;
      }
    });
  }

  private userLogged() {
    this.userType = 'Condômino';
    this.pages = [
      { title: 'Comunicados', component: ListPage },
      { title: 'Minha Conta', component: MyAccountPage },
      { title: 'Agendamento de Espaço', component: AgendamentoEspacoFisicoPage },
      { title: 'Cadastrar Obra', component: RegisterObraPage },
      { title: 'Pedidos <sup>BETA</sup>', component: MyPedidosPage },
      { title: 'Indicar via WhatsApp', component: SharePage },
      { title: 'Sobre o Painel Bold', component: AboutPage },
      { title: 'Sobre a Bold Telecom', component: AboutBoldPage },
      { title: 'Política de Privacidade', component: PrivacyPage },
      { title: 'Termos de Uso', component: TermsOfServicePage }
    ];
    this.rootPage = ListPage;
  }

  private sindicoLogged(){
    this.userType = 'Síndico';
    this.pages = [
      { title: 'Comunicados', component: ListPage },
      { title: 'Minha Conta', component: MyAccountPage },
      { title: 'Gerenciar Espaços Físicos', component: RegisterEspacoFisicoPage },
      { title: 'Gerenciar Arquivos', component: UploadFilePage },
      { title: 'Visualizar Obras', component: ListObrasPage },
      { title: 'Listar Agendamentos de Espaços', component: ListAgendamentoEspacoFisicoPage },
      { title: 'Indicar via WhatsApp', component: SharePage },
      { title: 'Sobre o Painel Bold', component: AboutPage },
      { title: 'Sobre a Bold Telecom', component: AboutBoldPage },
      { title: 'Política de Privacidade', component: PrivacyPage },
      { title: 'Termos de Uso', component: TermsOfServicePage }
    ];
    this.rootPage = ListPage;
  }

  private adminLogged() {
    this.userType = 'Administrador';
    this.pages = [
      { title: 'Comunicados', component: ListPage },
      { title: 'Minha Conta', component: MyAccountPage },
      { title: 'Indicar', component: SharePage },
      { title: 'Painel do Administrador', component: AdminDashboardPage },
    ];
    this.rootPage = AdminDashboardPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.authService.signOut()
    .then(()=>{
      this.nav.setRoot(LoginPage);
    }).catch((error)=>{
      console.error(error);
    });
  }

  openPage(page) {
    if(page.title === "Indicar"){
      this.socialProvider.whatsappShare();
    }
    else{
      this.nav.setRoot(page.component,{
      user: this.loggedUser
    });
  }
  }
}
