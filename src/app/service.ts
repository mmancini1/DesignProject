import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
    
    //log in to db
    login(user) {
        return this.http.post('http://localhost:8080/api/login/', user).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }

    //get beer data
    getBeer() {
        return this.http.get('http://localhost:8080/api/getBeer/').pipe(
            map((data: any) => {
                return data;
            }), catchError(error => {
                return throwError('Something went wrong!');
            })
        )
    }

    GetUser() {
        return this.http.get('http://localhost:8080/api/getUser/').pipe(
            map((data: any) => {
                return data;
            }), catchError(error => {
                return throwError('Something went wrong!');
            })
        )
    }


        //create user in db
    saveUser(user) {
        return this.http.post('http://localhost:8080/api/saveUser/', user).
        pipe(
            map((data: any) => {
              return data;
            }), catchError( error => {
              return throwError( 'Something went wrong!' );
            })
         )
    }


    deleteUser(id){   
        return this.http.post('http://localhost:8080/api/deleteUser/',{'id': id}).
        pipe(
            map((data: any) => {
            return data;
            }), catchError( error => {
            return throwError( 'Something went wrong!' );
            })
        )                 
    }  
  
}  