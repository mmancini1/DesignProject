import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';


@Injectable()
export class AuthService {

  constructor() { }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  //log into acct bring user to new releases
  login(): Observable<string> {
    sessionStorage.setItem('login', 'true');
    this.isLoggedIn=true;
    return of('/home//newReleases');
  }

  //after sign up bring user to notifications page
  signUp(): Observable<string> {
    sessionStorage.setItem('login', 'true');
    this.isLoggedIn=true;
    return of('/home/notify');
  }

  //logs user out
  logout(): void {
      sessionStorage.clear();
      this.isLoggedIn = false;
  }
}


