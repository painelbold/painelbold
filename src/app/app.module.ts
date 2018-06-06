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
import { RegisterBuildingsPage } from '../pages/register-buildings/register-buildings';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from '../providers/auth/auth-service';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AnnouncementProvider } from '../providers/announcement/announcement';
import { CondominioProvider } from '../providers/condominio/condominio';
import { EdificioProvider } from '../providers/edificio/edificio';
import { UserDataProvider } from '../providers/user-data/user-data';

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
    RegisterBuildingsPage,
    CalendarPage,
    ResetPasswordPage,
    AnnouncementPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
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
    RegisterBuildingsPage,
    CalendarPage,
    ResetPasswordPage,
    AnnouncementPage
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
    UserDataProvider
  ]
})
export class AppModule {}
