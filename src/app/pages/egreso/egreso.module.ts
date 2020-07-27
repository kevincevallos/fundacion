import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresoPageRoutingModule } from './egreso-routing.module';

import { EgresoPage } from './egreso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EgresoPageRoutingModule
  ],
  declarations: [EgresoPage]
})
export class EgresoPageModule {}
