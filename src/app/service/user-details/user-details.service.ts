import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  user: string;
  email: string;
  constructor(private http: HttpClient) { }

  populateUser(info){
    this.user=info.name;
    this.email=info.email;
    sessionStorage.setItem('email', this.email);
    sessionStorage.setItem('user', this.user);
  }

    //gets user details
    getUserDetails(user) {
        return this.http.post('http://localhost:8080/api/getUserDetails/', user).pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'error' );
            })
        )
    }
}
