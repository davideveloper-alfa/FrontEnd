import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

// clases
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables
  login: FormGroup;
  loading = false;

  // Inyeccion de dependencias para conectar los datos de entrada
  // de usuario y contraseña por el usuario
  constructor(private fb: FormBuilder, private toastr: ToastrService,
              private router: Router,
              private loginService: LoginService) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  log(): void{
    // console.log(this.login);

    // Con esta constante atrapamos los valores de entrada por medio}
    // del formulario
    const usuario: Usuario = {
      userName: this.login.value.usuario,
      password: this.login.value.password
    };

    this.loading = true;
    this.loginService.login(usuario).subscribe(data => {
      console.log('dentro del serivicio login data: ', data);
      this.loading = false;
      this.loginService.setLocalStorage(data.token);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message, 'Error');
      this.login.reset();
    });

    // setTimeout(() => {
    //   if (usuario.userName === 'dzambrano' && usuario.password === 'david123')
    // {
    //   this.login.reset();
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.toastr.error('Usuario o contraseña incorrecto', 'Error');
    //   this.login.reset();
    // }
    //   this.loading = false;
    // }, 3000);


  }

}
