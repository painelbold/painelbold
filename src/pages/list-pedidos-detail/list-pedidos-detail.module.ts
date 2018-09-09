import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPedidosDetailPage } from './list-pedidos-detail';

@NgModule({
  declarations: [
    ListPedidosDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPedidosDetailPage),
  ],
})
export class ListPedidosDetailPageModule {}
