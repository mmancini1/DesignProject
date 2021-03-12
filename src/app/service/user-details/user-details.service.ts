import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  user: String;
  email: String;
  constructor() { }

  populateUser(info){
    this.user=info.user;
    this.email=info.email;
    console.log(this.email);
  }
}
