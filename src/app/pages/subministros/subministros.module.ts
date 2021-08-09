import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubministrosPageRoutingModule } from './subministros-routing.module';

import { SubministrosPage } from './subministros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubministrosPageRoutingModule
  ],
  declarations: [SubministrosPage]
})
export class SubministrosPageModule {}
