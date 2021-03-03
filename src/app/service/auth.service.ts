import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthService {

  constructor() { }

  isAuthenticated() {
    // get the auth token from localStorage
    let token = localStorage.getItem('access_token');

    // check if token is set, then...
    if (token) {
        return true;
    }

    return false;
}

}


