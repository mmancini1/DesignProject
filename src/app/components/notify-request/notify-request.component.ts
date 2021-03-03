import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule, FormArray, FormBuilder } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notify-request',
  templateUrl: './notify-request.component.html',
  styleUrls: ['./notify-request.component.css']
})
export class NotifyRequestComponent implements OnInit {

  beers: any;
  breweryList: any=["Any Brewery"];
  beerList: any =[];
  breweryOption: string;
  beerStyles: any = [];
  notifications: any =[];

  constructor(private newService :CommonService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getBeer();
    this.updateNotifications();
  }

  updateSelect(){
      this.beerList = this.beers.filter(beer => beer.brewery === this.breweryOption);

      console.log(this.beerList);
  }

  getBeer = function() {    
    this.newService.getBeer()  
    .subscribe(data =>  {  
      this.beers=data.result;
      for(let i=0;i<this.beers.length;i++){
        if(!this.breweryList.includes(this.beers[i].brewery)){
          this.breweryList.push(this.beers[i].brewery);
        }
        if(!this.beerStyles.includes(this.beers[i].style)){
          this.beerStyles.push(this.beers[i].style);
        }
      }
      //this doesnt work
      let x = this.beers.sort((a, b) => (a.brewery > b.brewery) ? 1 : -1);
    }   
    , error => this.errorMessage = error )  
  }


  updateNotifications = function() {    
    this.newService.notify({email: "test@yahoo.com"})  
    .subscribe(data =>  {  
      console.log(data);
      console.log(data[0].notifications);
      this.notifications = data[0].notifications;
    }   
    , error => this.errorMessage = error )  
  }



}
