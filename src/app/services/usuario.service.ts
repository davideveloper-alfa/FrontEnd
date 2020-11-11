import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  myAppUrl: string;
  myApiUrl: string;

  // inyeccion de dependecia con httpClient en el constructor para poder permitir hacer los request hacia afuera
  // del front end
  constructor(private http: HttpClient) {
    // aqui indicamos hacia donde va a apuntar nuestros servicios del frontend al backend
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Usuario';
   }

  // definimos el metodo que va a conectar al api backend
  // el observable nos permite hacer peticiones hacia los diferente servicios
  saveUser(usuario: Usuario): Observable<any>{
    // http://localhost:64169 post
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }

  // metodo para poder consumir el api y cambiar la contraseña
  changePassword(changePassword): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/CambiarPassword', changePassword);
  }

}
