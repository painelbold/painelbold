import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCondominiosPage } from './list-condominios';

@NgModule({
  declarations: [
    ListCondominiosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCondominiosPage),
  ],
})
export class ListCondominiosPageModule {}
