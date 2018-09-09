import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPedidosPage } from './my-pedidos';

@NgModule({
  declarations: [
    MyPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPedidosPage),
  ],
})
export class MyPedidosPageModule {}
