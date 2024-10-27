import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://ap.greatfuturetechno.com/login/';
  private logoutUrl = 'https://ap.greatfuturetechno.com/logout/';
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<any>(this.loginUrl, formData).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true);
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
    return this.http.post(this.logoutUrl, {});
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
