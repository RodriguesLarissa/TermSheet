import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    const success = this.authService.login(username ?? '', password ?? '');

    if (success) {
      this.router.navigate(['/deals']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
