import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCondominioDetailsPage } from './list-condominio-details';

@NgModule({
  declarations: [
    ListCondominioDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCondominioDetailsPage),
  ],
})
export class ListCondominioDetailsPageModule {}
