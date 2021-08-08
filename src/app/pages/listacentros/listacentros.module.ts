import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListacentrosPageRoutingModule } from './listacentros-routing.module';

import { ListacentrosPage } from './listacentros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListacentrosPageRoutingModule
  ],
  declarations: [ListacentrosPage]
})
export class ListacentrosPageModule {}
