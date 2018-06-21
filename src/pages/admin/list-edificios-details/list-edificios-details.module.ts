import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEdificiosDetailsPage } from './list-edificios-details';

@NgModule({
  declarations: [
    ListEdificiosDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEdificiosDetailsPage),
  ],
})
export class ListEdificiosDetailsPageModule {}
