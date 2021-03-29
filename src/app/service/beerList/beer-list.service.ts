import { Injectable } from '@angular/core';
import { CommonService } from '../../service';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class BeerListService {

  beers: any=[];
  beerList: any=[];
  allBeers: any=[];

  constructor(private newService: CommonService,) { 
    this.getBeer();
  }

  getBeer(): Observable<AllBeer[]> {
    this.allBeers = this.newService.getBeer();
    return this.allBeers;
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