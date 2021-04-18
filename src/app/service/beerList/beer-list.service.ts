import { Injectable } from '@angular/core';
import { CommonService } from '../../service';
import { formatDate } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
  
})
export class BeerListService {

  currentBeers: any=[];
  currentBreweries: any=[];
  currentStyles: any=[];


  constructor(private newService: CommonService,
              private http: HttpClient) { 
  }


  getAllBeer(): Observable<AllBeer[]> {
    let style;
    return this.http.get('http://localhost:8080/api/getCurrentBeer/').pipe(
        map((data: any) => {
            this.currentBeers = data;
            for(let i=0;i<this.currentBeers.length;i++){
              if(!this.currentBreweries.includes(this.currentBeers[i].brewery)){
                this.currentBreweries.push(this.currentBeers[i].brewery);
              }
              style = this.currentBeers[i].style.split(' - ')[0]
              if(!this.currentStyles.includes(style)){
                this.currentStyles.push(style);
              }
            }
            return data;
        }), catchError(error => {
            return throwError('get beer error');
        })
    )
    return this.currentBeers;
  }


  getBreweries(){
    return this.http.get('http://localhost:8080/api/getBreweries').pipe(
        map((data: any) => {
            return data;
        }), catchError(error => {
            return throwError('get beer error');
        })
    )
  }

  getStyles(){
    return this.http.get('http://localhost:8080/api/getStyles').pipe(
        map((data: any) => {
            return data;
        }), catchError(error => {
            return throwError('get beer error');
        })
    )
  }

    getBeers(ans){
      console.log(ans);
      return this.http.post('http://localhost:8080/api/getSelectedBeers',ans).pipe(
          map((data: any) => {
              return data;
          }), catchError(error => {
              return throwError('get beer error');
          })
      )
   }

}

export class AllBeer {
  constructor(
    name: string,
    price: number,
    abv: string,
    ibu: string,
    rating: string,
    description: string,
    brewery: string,
    date: string,
    img: string,
    previousDate: any,){}
}