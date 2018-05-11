import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterBuildingsPage } from './register-buildings';

@NgModule({
  declarations: [
    RegisterBuildingsPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterBuildingsPage),
  ],
})
export class RegisterBuildingsPageModule {}
