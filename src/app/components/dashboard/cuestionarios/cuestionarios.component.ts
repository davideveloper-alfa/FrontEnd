import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  userName: string;
  listCuestionarios: Cuestionario [] = [];
  loading = false;

  constructor(private loginService: LoginService,
              private cuestionarioService: CuestionarioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    // cuando el componente se inicializa obtenemos los cambios
    this.getUserName();
    this.getCuestionarios();
  }

  // este metodo va a obtener el token decodificado a partir de otra funcion
  // y se hace el set atraves de la propiedad del claim "sub"
  getUserName(): void{
    console.log(this.loginService.getTokenDecode());
    this.userName = this.loginService.getTokenDecode().sub;
  }

  // aqui obtenemos los cuestionarios por usuario logeado
  getCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionariosByUser().subscribe(data => {
      this.listCuestionarios = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss... ocurrio un error', 'Error');
    });
  }

  eliminarCuestionario(idCuestionario: number): void{
    if (confirm('Esta seguro que desea eliminar el cuestinario')){
          this.loading = true;
          this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data => {
          this.loading = false;
          this.toastr.success('El cuestionario fue eliminado con exito!', 'Registro eliminado');
          this.getCuestionarios();
        }, error => {
          this.loading = false;
          this.toastr.error('Opss... ocurrio un error', 'Error');
        });
    }
  }

}
