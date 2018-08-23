import { RegisterEspacoFisicoPageModule } from './../pages/admin/register-espaco-fisico/register-espaco-fisico.module';
import { ReversePipe } from './../pipes/reverse/reverse';
import { ListMoradoresDetailsPage } from './../pages/admin/list-moradores-details/list-moradores-details';
import { ListEdificiosDetailsPage } from './../pages/admin/list-edificios-details/list-edificios-details';
import { ListEdificiosPage } from './../pages/admin/list-edificios/list-edificios';
import { ListCondominiosPage } from './../pages/admin/list-condominios/list-condominios';
import { ListCondominioDetailsPage } from './../pages/admin/list-condominio-details/list-condominio-details';
import { RegisterEdificioPage } from './../pages/register-edificio/register-edificio';
import { RegisterCondominioPage } from './../pages/register-condominio/register-condominio';
import { AnnouncementPage } from './../pages/announcement/announcement';
import { CalendarPage } from './../pages/calendar/calendar';
import { MyAccountPage } from './../pages/my-account/my-account';
import { SharePage } from './../pages/share/share';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login'
import { RegisterPage } from '../pages/register/register';
import { ListDetailsPage } from '../pages/list-details/list-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from '../providers/auth/auth-service';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AnnouncementProvider } from '../providers/announcement/announcement';
import { CondominioProvider } from '../providers/condominio/condominio';
import { EdificioProvider } from '../providers/edificio/edificio';
import { UserDataProvider } from '../providers/user-data/user-data';
import { AdminDashboardPage } from '../pages/admin/admin-dashboard/admin-dashboard';
import { ListMoradoresPage } from '../pages/admin/list-moradores/list-moradores';
import { AgendamentoProvider } from '../providers/agendamento/agendamento';
import { RegisterEspacoFisicoPage } from '../pages/admin/register-espaco-fisico/register-espaco-fisico';
import { EspacoFisicoProvider } from '../providers/espaco-fisico/espaco-fisico';

export const firebaseConfig = {
  apiKey: "AIzaSyDxLEmSXjV9XSR_oGUqMOLIbSvNgiFTtp4",
  authDomain: "painelbold.firebaseapp.com",
  databaseURL: "https://painelbold.firebaseio.com",
  projectId: "painelbold",
  storageBucket: "painelbold.appspot.com",
  messagingSenderId: "636170343298"
};

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    RegisterPage,
    ListDetailsPage,
    SharePage,
    MyAccountPage,
    CalendarPage,
    ResetPasswordPage,
    AnnouncementPage,
    AdminDashboardPage,
    RegisterCondominioPage,
    RegisterEdificioPage,
    ListCondominiosPage,
    ListCondominioDetailsPage,
    ListEdificiosPage,
    ListEdificiosDetailsPage,
    ListMoradoresPage,
    ListMoradoresDetailsPage,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RegisterEspacoFisicoPageModule
  ],
  exports: [
    ReversePipe
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    RegisterPage,
    ListDetailsPage,
    SharePage,
    MyAccountPage,
    CalendarPage,
    ResetPasswordPage,
    AnnouncementPage,
    AdminDashboardPage,
    RegisterCondominioPage,
    RegisterEdificioPage,
    ListCondominiosPage,
    ListCondominioDetailsPage,
    ListEdificiosPage,
    ListEdificiosDetailsPage,
    ListMoradoresPage,
    ListMoradoresDetailsPage,
    RegisterEspacoFisicoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AnnouncementProvider,
    CondominioProvider,
    EdificioProvider,
    UserDataProvider,
    AgendamentoProvider,
    EspacoFisicoProvider
  ],
})
export class AppModule {}
