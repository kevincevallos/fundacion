import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private servicio: DataService, private router: Router) { }
  canActivate() {
    if (this.servicio.getUsuarioActual()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}