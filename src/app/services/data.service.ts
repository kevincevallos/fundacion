import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlApi = 'https://api-gedi.herokuapp.com/server';
  private datosUsuarios = [];
  constructor(private http: HttpClient) { }

  async getUsuarios() {
    await this.http.get(this.urlApi + '/leerUsuarios').subscribe(x => {
      for (const key in x) {
        const element = x[key];
        this.datosUsuarios.push(element);
      }
    }, err => {
      console.log(err);
    });
    return this.datosUsuarios
  }

}
