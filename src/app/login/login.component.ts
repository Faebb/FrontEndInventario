import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../interfaces/auth';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    const request: Auth = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    request.email = request.email.toLocaleLowerCase();

    this._authService.login(request).subscribe({
      next: (response: any) => {
        //guarda el token en el local storage
        localStorage.setItem('token', response.token);
        this._router.navigate(['/productos']);
      },
      error: (error) => {
        this.formLogin.patchValue({
          email: '',
          password: '',
        });
        console.error('Error al iniciar sesión:', error);
      },
    });
  }
}
