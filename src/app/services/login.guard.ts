import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getAuthToken();
    if (token) {
      // User is already logged in, redirect to dashboard or some other page
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;  // Allow access to login route
    }
  }
}
