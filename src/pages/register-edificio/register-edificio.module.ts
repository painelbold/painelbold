import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterEdificioPage } from './register-edificio';

@NgModule({
  declarations: [
    RegisterEdificioPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterEdificioPage),
  ],
})
export class RegisterEdificioPageModule {}
