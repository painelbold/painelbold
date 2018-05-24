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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
