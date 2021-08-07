import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosMascotaPage } from './datos-mascota.page';

const routes: Routes = [
  {
    path: '',
    component: DatosMascotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DatosMascotaPageRoutingModule {}
