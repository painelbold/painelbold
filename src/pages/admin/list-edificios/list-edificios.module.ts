import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEdificiosPage } from './list-edificios';

@NgModule({
  declarations: [
    ListEdificiosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEdificiosPage),
  ],
})
export class ListEdificiosPageModule {}
