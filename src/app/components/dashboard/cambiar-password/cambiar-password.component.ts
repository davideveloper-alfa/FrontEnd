import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  // variables
  cambiarPassword: FormGroup;
  loading = false;

  // inyeccion de dependencias en el constructor
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this. cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevoPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['']}, {validator : this.checkPassword});
   }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls.nuevoPassword.value;
    const confirmPass = group.controls.confirmarPassword.value;
    return pass === confirmPass ? null : { notSame: true};
  }

  guardarPassword(): void{
    console.log(this.cambiarPassword);

    // creamos objeto any
    const changePassword: any = {
      PasswordAnterior: this.cambiarPassword.value.passwordAnterior,
      NuevaPassword: this.cambiarPassword.value.nuevoPassword
    };
    console.log(changePassword);
    this.loading = true;
    // utilizamo el servicio
    this.usuarioService.changePassword(changePassword).subscribe(data => {
      this.toastr.success(data.message);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message, 'Error');
    });
  }

}
