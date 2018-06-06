import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCondominioPage } from './register-condominio';

@NgModule({
  declarations: [
    RegisterCondominioPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCondominioPage),
  ],
})
export class RegisterCondominioPageModule {}
