import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EgresoPage } from './egreso.page';

const routes: Routes = [
  {
    path: '',
    component: EgresoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresoPageRoutingModule {}
