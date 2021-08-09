import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactosTotalesPage } from './contactos-totales.page';

const routes: Routes = [
  {
    path: '',
    component: ContactosTotalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactosTotalesPageRoutingModule {}
