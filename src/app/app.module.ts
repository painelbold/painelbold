import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePicker } from '@ionic-native/date-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AboutBoldPageModule } from '../pages/about-bold/about-bold.module';
import { ListEspacoFisicoPageModule } from '../pages/admin/list-espaco-fisico/list-espaco-fisico.module';
import { AgendamentoEspacoFisicoPageModule } from '../pages/agendamento-espaco-fisico/agendamento-espaco-fisico.module';
import { ListObrasPageModule } from '../pages/list-obras/list-obras.module';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PrivacyPageModule } from '../pages/privacy/privacy.module';
import { RegisterObraPageModule } from '../pages/register-obra/register-obra.module';
import { RegisterPage } from '../pages/register/register';
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
import { RegisterEspacoFisicoPageModule } from './../pages/admin/register-espaco-fisico/register-espaco-fisico.module';
import { PedidosListPageModule } from './../pages/pedidos-list/pedidos-list.module';
import { RegisterPedidosPageModule } from './../pages/register-pedidos/register-pedidos.module';
import { UploadFilePageModule } from './../pages/upload-file/upload-file.module';
import { ReversePipe } from './../pipes/reverse/reverse';
import { MyApp } from './app.component';
import { ListMoradoresDetailsPageModule } from '../pages/admin/list-moradores-details/list-moradores-details.module';
import { ListMoradoresPageModule } from '../pages/admin/list-moradores/list-moradores.module';
import { SharePageModule } from '../pages/share/share.module';
import { MyAccountPageModule } from '../pages/my-account/my-account.module';
import { CalendarPageModule } from '../pages/calendar/calendar.module';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';
import { AnnouncementPageModule } from '../pages/announcement/announcement.module';
import { AdminDashboardPageModule } from '../pages/admin/admin-dashboard/admin-dashboard.module';
import { RegisterCondominioPageModule } from '../pages/register-condominio/register-condominio.module';
import { RegisterEdificioPageModule } from '../pages/register-edificio/register-edificio.module';
import { ListCondominiosPageModule } from '../pages/admin/list-condominios/list-condominios.module';
import { ListCondominioDetailsPageModule } from '../pages/admin/list-condominio-details/list-condominio-details.module';
import { ListEdificiosPageModule } from '../pages/admin/list-edificios/list-edificios.module';
import { ListEdificiosDetailsPageModule } from '../pages/admin/list-edificios-details/list-edificios-details.module';
import { ObraProvider } from '../providers/obra/obra';

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
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    SharePageModule,
    MyAccountPageModule,
    CalendarPageModule,
    ResetPasswordPageModule,
    AnnouncementPageModule,
    AdminDashboardPageModule,
    RegisterCondominioPageModule,
    RegisterEdificioPageModule,
    ListCondominiosPageModule,
    ListCondominioDetailsPageModule,
    ListEdificiosPageModule,
    ListEdificiosDetailsPageModule,
    ListMoradoresPageModule,
    ListMoradoresDetailsPageModule,
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
    RegisterObraPageModule,
    ListObrasPageModule
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
    DocumentoProvider,
    ObraProvider
  ],
})
export class AppModule {}
