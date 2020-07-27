import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioIngresoPage } from './formulario-ingreso.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioIngresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioIngresoPageRoutingModule {}
