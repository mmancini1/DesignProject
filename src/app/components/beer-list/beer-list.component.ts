import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';
import { BeerListService } from '../../service/beerList/beer-list.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {


  beers: any;
  beerList: any;
  item: any;
  beerRating: any = ['All Ratings','1+ Star','2+ Star','3+ Star','3.5+ Star','4+ Star','4.5+ Star'];
  style: string;

  constructor(private newService: CommonService,
              private router: Router,
              public beerListService: BeerListService) { }


  ngOnInit(): void {
  }


  sortByBrew(type){

    if(type=='All Breweries'){
      this.beerListService.beers=this.beerListService.beerList;
    }else{
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.brewery==type));
    }
    this.beerListService.beers = this.beerListService.beers.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  sortByStyle(type){
    if(type=='All Styles'){
      this.beerListService.beers=this.beerListService.beerList;
    }else
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.style.includes(type)));

    this.beerListService.beers = this.beerListService.beers.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

    sortByRating(type){
    if(type=='All Ratings'){
      this.beerListService.beers=this.beerListService.beerList;
    }else if(type=='1+ Star'){
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.rating>=1));
    }else if(type=='2+ Star'){
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.rating>=2));
    }else if(type=='3+ Star'){
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.rating>=3));
    }else if(type=='3.5+ Star'){
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.rating>=3.5));
    }else if(type=='4+ Star'){
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.rating>=4));
    }else if(type=='4.5+ Star'){
      this.beerListService.beers=this.beerListService.beerList.filter((b)=>(b.rating>=4.5));
    }
    this.beerListService.beers = this.beerListService.beers.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
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