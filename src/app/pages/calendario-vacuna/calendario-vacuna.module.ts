import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioVacunaPageRoutingModule } from './calendario-vacuna-routing.module';

import { CalendarioVacunaPage } from './calendario-vacuna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioVacunaPageRoutingModule
  ],
  declarations: [CalendarioVacunaPage]
})
export class CalendarioVacunaPageModule {}
