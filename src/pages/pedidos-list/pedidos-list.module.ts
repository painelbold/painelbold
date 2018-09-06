import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosListPage } from './pedidos-list';

@NgModule({
  declarations: [
    PedidosListPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosListPage),
  ],
})
export class PedidosListPageModule {}
