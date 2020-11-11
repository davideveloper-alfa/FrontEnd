import { Respuesta } from './respuesta';

export class Pregunta{
    descripcion: string;
    listRespuesta: Respuesta[];
    hide?: boolean;

    constructor(descripcion: string, respuestas: Respuesta[]){
        this.descripcion = descripcion;
        this.listRespuesta = respuestas;
        this.hide = true;
    }
}
