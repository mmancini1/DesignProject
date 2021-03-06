import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) { }

    //create user in db
    signUp(user) {
        return this.http.post('http://localhost:8080/api/SignUp/', user).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }

    //update user in db
    updateUser(user) {
        return this.http.post('http://localhost:8080/api/UpdateUser/', user).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }
    
    //log in user
    login(user) {
        return this.http.post('http://localhost:8080/api/login/', user).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'login error' );
            })
         )
    }

    //get beer data - retrieves entire db of beer
    getBrew() {
        return this.http.get('http://localhost:8080/api/getBreweries/').pipe(
            map((data: any) => {
                return data;
            }), catchError(error => {
                return throwError('get beer error');
            })
        )
    }

    //gets notifications
    getNotifications(user) {
        return this.http.post('http://localhost:8080/api/getNotifications/', user).pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'error' );
            })
         )
    }

    //add notification
    addNotification(info) {
        return this.http.post('http://localhost:8080/api/addNotification/', info).pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'error' );
            })
         )
    }

    //deletes notification
    deleteNotification(info) {
        return this.http.post('http://localhost:8080/api/deleteNotification/', info).pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'error' );
            })
         )
    }
  
}  