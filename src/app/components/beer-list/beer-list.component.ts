import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';
import { BeerListService } from '../../service/beerList/beer-list.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})


export class BeerListComponent implements OnInit {

  beerRating: any= {' All Ratings':0,'1+ Star':1,'2+ Star':2,'3+ Star':3,'3.5+ Star':3.5,'4+ Star':4,'4.5+ Star':4.5};
  currentBeer: any=[];
  currentBreweries: any=['All Breweries'];
  currentStyles: any=['All Styles'];
  allBeers: any;
  newReleases: any=[];
  newBeers: boolean=false;

  constructor(private newService: CommonService,
              private router: Router,
              private beerListService: BeerListService) { }


  ngOnInit(): void {
    this.getBeers();
  }

  getCurBeers(): void {
    let style: string;
    if(this.beerListService.currentBeers.length==0){
        this.beerListService.getAllBeer().subscribe(beerList => {
          this.currentBeer = beerList;
          this.allBeers = this.currentBeer;
          this.currentBreweries=this.beerListService.currentBreweries;
          this.currentStyles = this.beerListService.currentStyles;
        });
    }else{
          this.currentBeer = this.beerListService.currentBeers;
          this.currentBreweries=this.beerListService.currentBreweries;
          this.currentStyles = this.beerListService.currentStyles;
    }
        //this will get info for new releases
    let d=formatDate(new Date(), 'MM/dd/yy', 'en');
    let dt = new Date(d)
    dt.setDate(dt.getDate() - 1)
    let yesterday  = formatDate(dt,'MM/dd/yy', 'en');
    for(let item in this.currentBeer){
      let t = this.currentBeer[item].previousDate;
      if(t[t.length-2]!=yesterday &&t[t.length-2]!=d){
        this.newReleases.push(this.currentBeer[item]);
      }
    }
    if(this.router.url =='/home/newReleases'){
      if(this.newReleases.length==0){
        this.newBeers = true;
      }
      this.currentBeer='';
      this.currentBeer=this.newReleases;
    }
    this.currentBreweries=this.currentBreweries.sort((a, b) => (a > b) ? 1 : -1);
    this.currentStyles=this.currentStyles.sort((a, b) => (a > b) ? 1 : -1);
    this.currentBeer=this.currentBeer.sort((a,b) => (a.brewery>b.brewery) ? 1 : -1);
  }

  getBeers(): void {
    let style: string;
    this.beerListService.getAllBeer().subscribe(beerList => {
      this.currentBeer = beerList;
      let d=formatDate(new Date(), 'MM/dd/yy', 'en');
      this.currentBeer=this.currentBeer.filter(beer => beer.date === d);
      for(let i=0;i<this.currentBeer.length;i++){
        if(!this.currentBreweries.includes(this.currentBeer[i].brewery)){
          this.currentBreweries.push(this.currentBeer[i].brewery);
        }
        style = this.currentBeer[i].style.split(' - ')[0]
        if(!this.currentStyles.includes(style)){
          this.currentStyles.push(style);
        }
      }
      this.allBeers = this.currentBeer;
      this.currentBreweries=this.currentBreweries.sort((a, b) => (a > b) ? 1 : -1);
      this.currentStyles=this.currentStyles.sort((a, b) => (a > b) ? 1 : -1);
      this.currentBeer=this.currentBeer.sort((a,b) => (a.brewery>b.brewery) ? 1 : -1);

      
      //this will get info for new releases
      let dt = new Date(d)
      dt.setDate(dt.getDate() - 1)
      let yesterday  = formatDate(dt,'MM/dd/yy', 'en');
      for(let item in this.allBeers){
        let t = this.allBeers[item].previousDate;
        if(t[t.length-2]!=yesterday &&t[t.length-2]!=d){
          this.newReleases.push(this.allBeers[item]);
        }
      }
      if(this.router.url =='/home/newReleases'){
        if(this.newReleases.length==0){
          this.newBeers = true;
        }
        this.currentBeer='';
        this.currentBeer=this.newReleases;
        this.allBeers=this.currentBeer;
      }
    });
  }


  sortByBrew(type){
    console.log(type);
    if(type=='All Breweries'){
      this.currentBeer=this.allBeers;
    }else{
      this.currentBeer=this.allBeers.filter((b)=>(b.brewery==type));
    }
    this.currentBeer = this.currentBeer.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  sortByStyle(type){
    if(type=='All Styles'){
      this.currentBeer=this.allBeers;
    }else
      this.currentBeer=this.allBeers.filter((b)=>(b.style.includes(type)));

    this.currentBeer=this.currentBeer.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  sortByRating(type){
    if(type==0){
      this.currentBeer=this.allBeers;
    }else{
      this.currentBeer=this.allBeers.filter((b)=>(b.rating>=type));
    }
    this.currentBeer=this.currentBeer.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
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
