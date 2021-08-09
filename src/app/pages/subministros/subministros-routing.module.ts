import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubministrosPage } from './subministros.page';

const routes: Routes = [
  {
    path: '',
    component: SubministrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubministrosPageRoutingModule {}
