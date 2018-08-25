import 'firebase/firestore';

import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuth } from 'angularfire2/auth';
import { Nav, Platform } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { Usuario } from './../models/usuario';
import { AdminDashboardPage } from './../pages/admin/admin-dashboard/admin-dashboard';
import { ListPage } from './../pages/list/list';
import { MyAccountPage } from './../pages/my-account/my-account';
import { SharePage } from './../pages/share/share';
import { AuthService } from './../providers/auth/auth-service';
import { UserDataProvider } from './../providers/user-data/user-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  loggedUser: Usuario;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private udProvider: UserDataProvider) {
    this.initializeApp();
    this.loggedUser = new Usuario();
    this.loggedUser.fullName = "";

    const authObserver = afAuth.authState.subscribe(user => {
      if(user){
        this.udProvider.getUserData()
        .subscribe((u:any) =>{
          this.loggedUser = u;

          if(this.loggedUser.admin){
            this.pages = [
              { title: 'Comunicados', component: ListPage },
              { title: 'Minha Conta', component: MyAccountPage},
              { title: 'Indicar', component: SharePage},
              { title: 'Painel do Administrador', component: AdminDashboardPage},
            ];

            this.rootPage = AdminDashboardPage;

            authObserver.unsubscribe();
          }
          else{
            this.pages = [
              { title: 'Comunicados', component: ListPage },
              { title: 'Minha Conta', component: MyAccountPage},
              { title: 'Indicar', component: SharePage},
            ];

            this.rootPage = ListPage;

        authObserver.unsubscribe();

        }
      });
      }
      else{
        this.pages = [
          { title: 'Comunicados', component: ListPage },
          { title: 'Minha Conta', component: MyAccountPage},
          { title: 'Indicar', component: SharePage},
        ];

        this.rootPage = LoginPage;
      }
    });


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
    this.nav.setRoot(page.component);
  }
}
