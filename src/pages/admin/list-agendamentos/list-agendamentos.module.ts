import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAgendamentosPage } from './list-agendamentos';

@NgModule({
  declarations: [
    ListAgendamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListAgendamentosPage),
  ],
})
export class ListAgendamentosPageModule {}
