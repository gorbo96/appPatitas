import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearMascotasPageRoutingModule } from './crear-mascotas-routing.module';

import { CrearMascotasPage } from './crear-mascotas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearMascotasPageRoutingModule
  ],
  declarations: [CrearMascotasPage]
})
export class CrearMascotasPageModule {}
