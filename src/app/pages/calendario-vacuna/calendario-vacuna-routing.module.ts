import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioVacunaPage } from './calendario-vacuna.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioVacunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioVacunaPageRoutingModule {}
