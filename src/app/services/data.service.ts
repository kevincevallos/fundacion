import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlApi = 'https://api-gedi.herokuapp.com/server';
  private datosUsuarios=[];
  constructor(private http: HttpClient) { }

  async getUsuarios() {
    //return new Promise(resolve => {

      await this.http.get(this.urlApi+'/leerUsuarios').subscribe(x => {
        //console.log('Imprimiendo Data!!');
        //console.log(x);
        this.datosUsuarios.push(x);
      }, err => {
        console.log(err);
      });
      return this.datosUsuarios
      //resolve = this.datosUsuarios;
    //});
  }

}
