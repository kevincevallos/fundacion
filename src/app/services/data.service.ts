import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //private urlApi = 'https://api-gedi.herokuapp.com/server';
  private url = 'http://localhost:8080/NJRest/rest/prueba';
  private datosUsuarios = [];
  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(this.url + '/obtener_usuarios');
    /* .subscribe(x => {
      console.log('datos_: ', x);
      for (const key in x) {
        const element = x[key];
        this.datosUsuarios.push(element);
      }
    }, err => {
      console.log(err);
    }); */
    //this.datosUsuarios
  }

}
