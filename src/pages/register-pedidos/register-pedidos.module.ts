import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPedidosPage } from './register-pedidos';

@NgModule({
  declarations: [
    RegisterPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPedidosPage),
  ],
})
export class RegisterPedidosPageModule {}
