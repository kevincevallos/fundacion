import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioIngresoPageRoutingModule } from './formulario-ingreso-routing.module';

import { FormularioIngresoPage } from './formulario-ingreso.page';

import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioIngresoPageRoutingModule,
    MatTooltipModule
  ],
  declarations: [FormularioIngresoPage]
})
export class FormularioIngresoPageModule {}
