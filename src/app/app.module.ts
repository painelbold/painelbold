import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePicker } from '@ionic-native/date-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AboutBoldPageModule } from '../pages/about-bold/about-bold.module';
import { AdminDashboardPageModule } from '../pages/admin/admin-dashboard/admin-dashboard.module';
import { ListCondominioDetailsPageModule } from '../pages/admin/list-condominio-details/list-condominio-details.module';
import { ListCondominiosPageModule } from '../pages/admin/list-condominios/list-condominios.module';
import { ListEdificiosDetailsPageModule } from '../pages/admin/list-edificios-details/list-edificios-details.module';
import { ListEdificiosPageModule } from '../pages/admin/list-edificios/list-edificios.module';
import { ListEspacoFisicoPageModule } from '../pages/admin/list-espaco-fisico/list-espaco-fisico.module';
import { ListMoradoresDetailsPageModule } from '../pages/admin/list-moradores-details/list-moradores-details.module';
import { ListMoradoresPageModule } from '../pages/admin/list-moradores/list-moradores.module';
import { AgendamentoEspacoFisicoPageModule } from '../pages/agendamento-espaco-fisico/agendamento-espaco-fisico.module';
import { AnnouncementPageModule } from '../pages/announcement/announcement.module';
import { CalendarPageModule } from '../pages/calendar/calendar.module';
import {
  ListAgendamentoEspacoFisicoPageModule,
} from '../pages/list-agendamento-espaco-fisico/list-agendamento-espaco-fisico.module';
import { ListObrasDetailPageModule } from '../pages/list-obras-detail/list-obras-detail.module';
import { ListObrasPageModule } from '../pages/list-obras/list-obras.module';
import { ListPedidosDetailPageModule } from '../pages/list-pedidos-detail/list-pedidos-detail.module';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MyAccountPageModule } from '../pages/my-account/my-account.module';
import { MyPedidosListPageModule } from '../pages/my-pedidos-list/my-pedidos-list.module';
import { MyPedidosPageModule } from '../pages/my-pedidos/my-pedidos.module';
import { PrivacyPageModule } from '../pages/privacy/privacy.module';
import { RegisterCondominioPageModule } from '../pages/register-condominio/register-condominio.module';
import { RegisterEdificioPageModule } from '../pages/register-edificio/register-edificio.module';
import { RegisterObraPageModule } from '../pages/register-obra/register-obra.module';
import { RegisterPedidoPageModule } from '../pages/register-pedido/register-pedido.module';
import { RegisterPage } from '../pages/register/register';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';
import { SharePageModule } from '../pages/share/share.module';
import { TermsOfServicePageModule } from '../pages/terms-of-service/terms-of-service.module';
import { AgendamentoEspacoFisicoProvider } from '../providers/agendamento-espaco-fisico/agendamento-espaco-fisico';
import { AgendamentoProvider } from '../providers/agendamento/agendamento';
import { AnnouncementProvider } from '../providers/announcement/announcement';
import { AuthService } from '../providers/auth/auth-service';
import { CondominioProvider } from '../providers/condominio/condominio';
import { DocumentoProvider } from '../providers/documento/documento';
import { EdificioProvider } from '../providers/edificio/edificio';
import { EspacoFisicoProvider } from '../providers/espaco-fisico/espaco-fisico';
import { ObraProvider } from '../providers/obra/obra';
import { PedidoProvider } from '../providers/pedido/pedido';
import { SocialShareProvider } from '../providers/social-share/social-share';
import { UploadDataProvider } from '../providers/upload-data/upload-data';
import { UserDataProvider } from '../providers/user-data/user-data';
import { AboutPageModule } from './../pages/about/about.module';
import { RegisterEspacoFisicoPageModule } from './../pages/admin/register-espaco-fisico/register-espaco-fisico.module';
import { ListDetailsPage } from './../pages/list-details/list-details';
import { ListPedidosPageModule } from './../pages/list-pedidos/list-pedidos.module';
import { UploadFilePageModule } from './../pages/upload-file/upload-file.module';
import { ReversePipe } from './../pipes/reverse/reverse';
import { MyApp } from './app.component';
import { ListAgendamentoEspacoFisicoDetailPageModule } from '../pages/list-agendamento-espaco-fisico-detail/list-agendamento-espaco-fisico-detail.module';

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
    ListDetailsPage,
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
    RegisterPedidoPageModule,
    ListPedidosDetailPageModule,
    AgendamentoEspacoFisicoPageModule,
    PrivacyPageModule,
    TermsOfServicePageModule,
    AboutPageModule,
    RegisterObraPageModule,
    ListObrasPageModule,
    ListPedidosPageModule,
    MyPedidosPageModule,
    MyPedidosListPageModule,
    ListObrasDetailPageModule,
    ListAgendamentoEspacoFisicoPageModule,
    ListAgendamentoEspacoFisicoDetailPageModule
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
    ListDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    SocialSharing,
    FileChooser,
    FilePath,
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
    ObraProvider,
    PedidoProvider,
    UploadDataProvider,
    SocialShareProvider
  ],
})
export class AppModule {}
