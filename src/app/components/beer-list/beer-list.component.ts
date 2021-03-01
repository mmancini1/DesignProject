import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {


  beers: any;
  item: any;

  constructor(private newService :CommonService,) { }



  ngOnInit(): void {
    this.getBeer();
  }

    getBeer = function() {    
     this.newService.getBeer()  
     .subscribe(data =>  {  
       let list=data.result;
       this.beers=data.result;
       let x = this.beers.sort((a, b) => (a.brewery > b.brewery) ? 1 : -1);
       console.log(x);

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