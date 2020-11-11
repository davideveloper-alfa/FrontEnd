import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/login';
  }

  // las peticiones HTTP nos devuelven un observable
  login(usuario: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario );
  }

  setLocalStorage(data): void{
    localStorage.setItem('token', data);
  }

  // getUserName(): string{
  //   return localStorage.getItem('userName');
  // }

  removeLocalStorage(): void{
    localStorage.removeItem('token');
  }

  getTokenDecode(): any {
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(localStorage.getItem('token'));
    return decodeToken;
  }

}
