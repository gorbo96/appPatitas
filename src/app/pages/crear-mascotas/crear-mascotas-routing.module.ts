import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearMascotasPage } from './crear-mascotas.page';

const routes: Routes = [
  {
    path: '',
    component: CrearMascotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearMascotasPageRoutingModule {}
