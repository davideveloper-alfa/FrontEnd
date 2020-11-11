import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  nombreParticiapante: string;
  idCuestionario: number;
  // la siguiente varibale se va a utilizar para ir guardando las diferentes respuestas
  // que el usuario ha puesto como correctas
  respuestas: number[] = [];
  cuestionario: Cuestionario;

  constructor() { }
}
