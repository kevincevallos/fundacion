import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BienvenidoPage } from './bienvenido.page';

const routes: Routes = [
  {
    path: '',
    component: BienvenidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BienvenidoPageRoutingModule {}
