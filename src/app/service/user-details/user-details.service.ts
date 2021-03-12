import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  user: string;
  email: string;
  constructor() { }

  populateUser(info){
    this.user=info.name;
    this.email=info.email;
    sessionStorage.setItem('email', this.email);
    sessionStorage.setItem('user', this.user);
  }
}
