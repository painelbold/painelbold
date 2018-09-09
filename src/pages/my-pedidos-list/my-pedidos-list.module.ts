import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPedidosListPage } from './my-pedidos-list';

@NgModule({
  declarations: [
    MyPedidosListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPedidosListPage),
  ],
})
export class MyPedidosListPageModule {}
