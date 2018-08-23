import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEspacoFisicoPage } from './list-espaco-fisico';

@NgModule({
  declarations: [
    ListEspacoFisicoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEspacoFisicoPage),
  ],
})
export class ListEspacoFisicoPageModule {}
