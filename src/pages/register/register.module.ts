import { BrMaskerModule } from 'brmasker-ionic-3';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(RegisterPage),
  ],
})

export class RegisterPageModule {}
