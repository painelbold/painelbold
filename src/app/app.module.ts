import { PedidosListPageModule } from './../pages/pedidos-list/pedidos-list.module';
import { RegisterPedidosPageModule } from './../pages/register-pedidos/register-pedidos.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePicker } from '@ionic-native/date-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AboutPage } from '../pages/about/about';
import { AdminDashboardPage } from '../pages/admin/admin-dashboard/admin-dashboard';
import { ListEspacoFisicoPage } from '../pages/admin/list-espaco-fisico/list-espaco-fisico';
import { ListEspacoFisicoPageModule } from '../pages/admin/list-espaco-fisico/list-espaco-fisico.module';
import { ListMoradoresPage } from '../pages/admin/list-moradores/list-moradores';
import { RegisterEspacoFisicoPage } from '../pages/admin/register-espaco-fisico/register-espaco-fisico';
import { AgendamentoEspacoFisicoPageModule } from '../pages/agendamento-espaco-fisico/agendamento-espaco-fisico.module';
import { ListDetailsPage } from '../pages/list-details/list-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PrivacyPage } from '../pages/privacy/privacy';
import { PrivacyPageModule } from '../pages/privacy/privacy.module';
import { RegisterPage } from '../pages/register/register';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { TermsOfServicePageModule } from '../pages/terms-of-service/terms-of-service.module';
import { AgendamentoEspacoFisicoProvider } from '../providers/agendamento-espaco-fisico/agendamento-espaco-fisico';
import { AgendamentoProvider } from '../providers/agendamento/agendamento';
import { AnnouncementProvider } from '../providers/announcement/announcement';
import { AuthService } from '../providers/auth/auth-service';
import { CondominioProvider } from '../providers/condominio/condominio';
import { DocumentoProvider } from '../providers/documento/documento';
import { EdificioProvider } from '../providers/edificio/edificio';
import { EspacoFisicoProvider } from '../providers/espaco-fisico/espaco-fisico';
import { UserDataProvider } from '../providers/user-data/user-data';
import { AboutPageModule } from './../pages/about/about.module';
import { ListCondominioDetailsPage } from './../pages/admin/list-condominio-details/list-condominio-details';
import { ListCondominiosPage } from './../pages/admin/list-condominios/list-condominios';
import { ListEdificiosDetailsPage } from './../pages/admin/list-edificios-details/list-edificios-details';
import { ListEdificiosPage } from './../pages/admin/list-edificios/list-edificios';
import { ListMoradoresDetailsPage } from './../pages/admin/list-moradores-details/list-moradores-details';
import { RegisterEspacoFisicoPageModule } from './../pages/admin/register-espaco-fisico/register-espaco-fisico.module';
import { AgendamentoEspacoFisicoPage } from './../pages/agendamento-espaco-fisico/agendamento-espaco-fisico';
import { AnnouncementPage } from './../pages/announcement/announcement';
import { CalendarPage } from './../pages/calendar/calendar';
import { MyAccountPage } from './../pages/my-account/my-account';
import { RegisterCondominioPage } from './../pages/register-condominio/register-condominio';
import { RegisterEdificioPage } from './../pages/register-edificio/register-edificio';
import { SharePage } from './../pages/share/share';
import { UploadFilePageModule } from './../pages/upload-file/upload-file.module';
import { ReversePipe } from './../pipes/reverse/reverse';
import { MyApp } from './app.component';
import { AboutBoldPageModule } from '../pages/about-bold/about-bold.module';
import { FileChooser } from '@ionic-native/file-chooser';

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
    AngularFireStorageModule,
    RegisterEspacoFisicoPageModule,
    ListEspacoFisicoPageModule,
    AboutPageModule,
    TermsOfServicePageModule,
    PrivacyPageModule,
    AgendamentoEspacoFisicoPageModule,
    UploadFilePageModule,
    AboutBoldPageModule,
    RegisterPedidosPageModule,
    PedidosListPageModule,
    AgendamentoEspacoFisicoPageModule,
    PrivacyPageModule,
    TermsOfServicePageModule,
    AboutPageModule,
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
    RegisterEspacoFisicoPage,
    ListEspacoFisicoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    SocialSharing,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AnnouncementProvider,
    CondominioProvider,
    EdificioProvider,
    UserDataProvider,
    AgendamentoProvider,
    EspacoFisicoProvider,
    AgendamentoEspacoFisicoProvider,
    DocumentoProvider
  ],
})
export class AppModule {}
