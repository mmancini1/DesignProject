import { Injectable } from '@angular/core';
import { CommonService } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class BeerListService {

  beers: any=[];
  beerList: any=[];
  breweryList: any=["All Breweries"];
  beerStyles: any = ["All Styles"];

  constructor(private newService: CommonService) { 
    this.getBeer();
  }

  getBeer = function() {    
    this.newService.getBeer()  
    .subscribe(data =>  {  
      this.beers=data.result;
      this.beerList=this.beers;
      for(let i=0;i<this.beers.length;i++){
        if(!this.breweryList.includes(this.beers[i].brewery)){
          this.breweryList.push(this.beers[i].brewery);
        }
        this.style = this.beers[i].style.split(' - ')[0]
        if(!this.beerStyles.includes(this.style)){
          this.beerStyles.push(this.style);
        }
      }
      this.beers = this.beers.sort((a, b) => (a.brewery > b.brewery) ? 1 : -1);
      this.breweryList = this.breweryList.sort((a, b) => (a > b) ? 1 : -1);
      this.beerStyles = this.beerStyles.sort((a, b) => (a > b) ? 1 : -1);
    }
    , error => this.errorMessage = error )
    return true;
  }
}
