import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionAdminPageRoutingModule } from './gestion-admin-routing.module';

import { GestionAdminPage } from './gestion-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionAdminPageRoutingModule
  ],
  declarations: [GestionAdminPage]
})
export class GestionAdminPageModule {}
