import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from '../../../../models/cuestionario';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: ['./respuesta-cuestionario.component.css']
})
export class RespuestaCuestionarioComponent implements OnInit {

  cuestionario: Cuestionario;
  respuestaUsuario: number[] = []; // aqui van las respuestas del usuario

  constructor(private respuestasCuestionarioService: RespuestaCuestionarioService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.respuestasCuestionarioService.idCuestionario == null) {
      this.router.navigate(['/inicio']);
    }
    else{
      this.cuestionario = this.respuestasCuestionarioService.cuestionario;
      this.respuestaUsuario = this.respuestasCuestionarioService.respuestas;
    }
  }

}
