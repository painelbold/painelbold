import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMoradoresDetailsPage } from './list-moradores-details';

@NgModule({
  declarations: [
    ListMoradoresDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMoradoresDetailsPage),
  ],
})
export class ListMoradoresDetailsPageModule {}
