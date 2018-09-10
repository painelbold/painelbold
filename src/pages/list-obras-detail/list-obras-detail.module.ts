import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListObrasDetailPage } from './list-obras-detail';

@NgModule({
  declarations: [
    ListObrasDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ListObrasDetailPage),
  ],
})
export class ListObrasDetailPageModule {}
