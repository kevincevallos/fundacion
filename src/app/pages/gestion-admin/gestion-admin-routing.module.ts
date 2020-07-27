import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionAdminPage } from './gestion-admin.page';

const routes: Routes = [
  {
    path: '',
    component: GestionAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionAdminPageRoutingModule {}
