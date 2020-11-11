import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from '../../../../../../models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  nuevaPregunta: FormGroup;
  pregunta: Pregunta;
  rtaCorrecta = 0;
  @Output() enviarPregunta = new EventEmitter<Pregunta>(); // esta linea me permite crear un emitter del hijo al padre

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([])
    });
   }

  ngOnInit(): void {
    this.agregarRespuestasPorDefecto();
  }

  // devuelve FormArray de respuestas
  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  // Agregar respuesta al array
  agregarRespuesta(): void {
    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }));
  }

  // es apra agregar 2 respuestas minimo por pregunta
  agregarRespuestasPorDefecto(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index: number): void {
    if (this.getRespuestas.length === 2)
    {
      this.toastr.error('Como minimo la pregunta debe contener 2 respuestas', 'Error!');
    }
    else{
      this.getRespuestas.removeAt(index);
    }
  }

  // este metodo es para atrapar el index de la respuesta establecida
  // como correcta para la pregunta creada
  setRespuestaValida(index: number): void {
    this.rtaCorrecta = index;
  }

  agregarPregunta(): void {

    // obtenemos el titulo de la preunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo').value;

    // obtener el array de respuestas para la pregunta
    const arrayRespuestas = this.nuevaPregunta.get('respuestas').value;

    console.log(arrayRespuestas);

    // creamos un array de respuestas
    // utilizamos este array para almacenar las respuestas enviadas por el usuario
    // para relacionarlas a la pregunta
    const arrayRta: Respuesta[] = [];

    // recorremos las preguntas que estas siendo ingresadas por el usuario
    // para posteriormente enviarlas el arrayRta que ira hacia el backend
    arrayRespuestas.forEach((element, index) => {
      // aqui obtenemos cada pregunta ingresada con su value true/false para saber cual
      // sera la respuesta correcta
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);

      // validacion para obtener cual es la respuesta correcta a traves del index de la respuesta seleccionada
      if (index === this.rtaCorrecta){
        respuesta.esCorrecta = true;
      }

      // aqui ingresamos cada objeto al arrayRta que ira despues hacia el backend
      arrayRta.push(respuesta);
    });

    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);

    console.log(pregunta);

    // aqui le aviso al componente Padre que hay una nueva pregunta y
    // le paso el objeto del component hijo al padre
    this.enviarPregunta.emit(pregunta);

    // aqui reseteo los formularios cuando ya guarde una pregunta con su respuestas
    this.reset();
  }

  reset(): void {
    this.rtaCorrecta = 0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestasPorDefecto();
  }

}
