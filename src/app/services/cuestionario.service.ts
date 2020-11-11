import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  myAppUrl: string;
  myApiUrl: string;

  // variables para pasar info a otro component
  tituloCuestionario: string;
  descripcionCuestionario: string;

  // en el constructor inyectamos httpclient para poder hacer peticiones a backend
  constructor(private http: HttpClient) {
    // la siguiente linea busca la url de nuestor backend
    this.myAppUrl = environment.endpoint;
    // la siguiente linea el api o servicio que vamos a consumir
    this.myApiUrl = '/api/Cuestionario/';
   }

   // este es el servicio que estara consumiendo la api del backend y guardando
   // los cuestionario creados, todo servicio que consumen backend devuelve un observable
   guardarCuestionario(cuestionario: Cuestionario): Observable<any> {
     return this.http.post(this.myAppUrl + this.myApiUrl, cuestionario);
   }

   // con este metodo llamamos al servicio del backend para obtener los cuestionarios por usuario logeado
   getListCuestionariosByUser(): Observable<any> {
     return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarioByUser');
   }

   deleteCuestionario(idCuestionario: number): Observable<any> {
     return this.http.delete(this.myAppUrl + this.myApiUrl + idCuestionario);
   }

   // Servicio para poder llamar al endpoint Cuestionario
   getCuestionario(idCuestionario: number): Observable<any> {
     return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario);
   }

   // obtener todos los cuestionarios publicos cuando da clic en preguntas en
   // pantalla principal
  getListCuestionarios(): Observable<any> {
    return  this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarios');
  }
}
