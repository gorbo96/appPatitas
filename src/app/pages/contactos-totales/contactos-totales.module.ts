import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosTotalesPageRoutingModule } from './contactos-totales-routing.module';

import { ContactosTotalesPage } from './contactos-totales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactosTotalesPageRoutingModule
  ],
  declarations: [ContactosTotalesPage]
})
export class ContactosTotalesPageModule {}
