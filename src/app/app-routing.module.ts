import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'bienvenido',
    loadChildren: () => import('./pages/bienvenido/bienvenido.module').then( m => m.BienvenidoPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'formulario-ingreso',
    loadChildren: () => import('./pages/formulario-ingreso/formulario-ingreso.module').then( m => m.FormularioIngresoPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'egreso',
    loadChildren: () => import('./pages/egreso/egreso.module').then( m => m.EgresoPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'gestion-admin',
    loadChildren: () => import('./pages/gestion-admin/gestion-admin.module').then( m => m.GestionAdminPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./pages/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule), canActivate: [AuthGuard] 
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule), canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
