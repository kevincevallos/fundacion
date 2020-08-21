import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioIngresoPage } from '../pages/formulario-ingreso/formulario-ingreso.page';
import { FormularioIngresoPageModule } from '../pages/formulario-ingreso/formulario-ingreso.module';
import { BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:8080/NJRest/rest';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(this.url + '/usuario_recurso/obtener_usuarios');
  }
  getUsuariosPasivos() {
    return this.http.get(this.url + '/usuario_recurso/obtener_usuarios');
  }
  getNacionalidades() {
    return this.http.get(this.url + '/usuario_recurso/obtener_nacionalidades');
  }
  getParentescos() {
    return this.http.get(this.url + '/usuario_recurso/obtener_parentescos');
  }
  registrarUsuario(user: Array<[]>) {
    return this.http.post(this.url + '/usuario_recurso/registrar_usuario', user);
  }
  editarUsuario(user) {
    return this.http.put(this.url + '/usuario_recurso/editar_usuario', user);
  }
  getCiudades() {
    return this.http.get(this.url + '/usuario_recurso/obtener_ciudades');
  }
  getPaises() {
    return this.http.get(this.url + '/usuario_recurso/obtener_paises');
  }
  getLugaresIngreso() {
    return this.http.get(this.url + '/usuario_recurso/obtener_lugaringreso');
  }
  iniciarSesion(usuario) {
    console.log('usuarioLogin_: ', usuario);
    return this.http.post(this.url + '/autenticacion/login', usuario);
  }

  getUsuarioActual() {
    let user_string = localStorage.getItem("usuarioLogueado");
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
  recuperarContrasena(nombrePerfil, contrasena) {

  }
  activarUsuario(identificacion) {
    console.log('ACTIVANDO ID: ', identificacion);
  }
}
