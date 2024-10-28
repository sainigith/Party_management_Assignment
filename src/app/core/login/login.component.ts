import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.getAuthToken()) {
      this.router.navigate(['/list']); 
    }
  }

  get f() {
    return this.loginForm.controls;
  }
/**
 * Used Function Login Page.
 * @returns 
 */
  userLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.get('name')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        if (response.token) {
          this.router.navigate(['/list']);  
        }
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }
}
