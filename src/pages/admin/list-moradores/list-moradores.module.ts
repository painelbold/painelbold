import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMoradoresPage } from './list-moradores';

@NgModule({
  declarations: [
    ListMoradoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMoradoresPage),
  ],
})
export class ListMoradoresPageModule {}
