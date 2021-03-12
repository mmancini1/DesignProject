import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {


  beers: any;
  item: any;
  breweryList: any=["All Breweries"];
  beerStyles: any = ["All Styles"];

  constructor(private newService: CommonService,
              private router: Router,
              ) { }



  ngOnInit(): void {
    this.getBeer();
  }

  getBeer = function() {    
    this.newService.getBeer()  
    .subscribe(data =>  {  
      this.beers=data.result;
      console.log(this.beers);
      for(let i=0;i<this.beers.length;i++){
        if(!this.breweryList.includes(this.beers[i].brewery)){
          this.breweryList.push(this.beers[i].brewery);
        }
        if(!this.beerStyles.includes(this.beers[i].style)){
          this.beerStyles.push(this.beers[i].style);
        }
      }
      let x = this.beers.sort((a, b) => (a.brewery > b.brewery) ? 1 : -1);
    }   
    , error => this.errorMessage = error )  
  }


  //expand or collapse card
  collapsed = -1;
  collapse(i) {
    if (this.collapsed === i) {
      this.collapsed = -1;
    } else {
      this.collapsed = i;
    }
  }

}

export interface Beer {
    name: String,
    price: number,
    abv: String,
    ibu: String,
    rating: String,
    description: String,
    brewery: String,
    date: String
    style: String,
}