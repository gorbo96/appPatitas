import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListacentrosPage } from './listacentros.page';

const routes: Routes = [
  {
    path: '',
    component: ListacentrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListacentrosPageRoutingModule {}
