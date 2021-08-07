import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosMascotaPageRoutingModule } from './datos-mascota-routing.module';

import { DatosMascotaPage } from './datos-mascota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosMascotaPageRoutingModule
  ],
  declarations: [DatosMascotaPage]
})
export class DatosMascotaPageModule {}
