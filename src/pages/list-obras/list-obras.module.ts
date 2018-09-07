import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListObrasPage } from './list-obras';

@NgModule({
  declarations: [
    ListObrasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListObrasPage),
  ],
})
export class ListObrasPageModule {}
