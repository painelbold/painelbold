import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPedidoPage } from './register-pedido';

@NgModule({
  declarations: [
    RegisterPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPedidoPage),
  ],
})
export class RegisterPedidoPageModule {}
