import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
@Injectable()
export class AuthService {

  constructor() { }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    sessionStorage.setItem('login', 'true');
    return of(true).pipe(
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
      sessionStorage.clear();
      this.isLoggedIn = false;
  }
}


