import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {
  tituloCuestionario: string;
  descripcionCuestionario: string;

  // datosCuestionario: FormGroup;

  listPreguntas: Pregunta[] = [];
  loading = false;

  constructor(private toastr: ToastrService,
              private router: Router,
              private cuestionarioService: CuestionarioService)
  {
  }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  // este metodo recibe un objeto pregunta cada que se crea una pregunta
  // y la guarda en el objeto lista para mostrar la cantidad de preguntas
  // por cuestionario
  guardarPregunta(pregunta: Pregunta): void {
    this.listPreguntas.push(pregunta);
  }

  // eliminar una pregunta de la lista de preguntas creadas
  // antes de finalizar el cuestionario
  eliminarPregunta(index: number): void {
    this.listPreguntas.splice(index, 1);
  }

  guardarCuestionario(): void {
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    };

    // para carga de loading
    this.loading = true;

    console.log(cuestionario);

    // Enviamos el cuestionario al backend
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data => {
      this.toastr.success('El cuestionario ha sido guardado con exito', 'Cuestionario Registrado');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, error => {
      this.toastr.error('Opps...Ocurrio un error!', 'Error');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    });
  }

}
