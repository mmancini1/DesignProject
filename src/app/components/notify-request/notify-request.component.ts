import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule, FormArray, FormBuilder } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { UserDetailsService } from '../../service/user-details/user-details.service';
import { BeerListService } from '../../service/beerList/beer-list.service';

@Component({
  selector: 'app-notify-request',
  templateUrl: './notify-request.component.html',
  styleUrls: ['./notify-request.component.css']
})
export class NotifyRequestComponent implements OnInit {


  breweryOption: string;
  beerStyle: string;
  notifications: any =[];
  hasData: number;
  style: string;
  email: string;
  beerArray: any;
  allBreweries: any=['All Breweries'];
  allStyles: any=['All Styles'];
  selectedBrewery: any;


  constructor(private newService :CommonService,
              private fb: FormBuilder,
              private userDetails: UserDetailsService,
              private beerListService: BeerListService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.updateNotifications();
    this.getBeers();
  }

  getBeers(): void {
    this.beerListService.getBeer().subscribe(beerList => {
      this.beerArray = beerList;
      this.beerArray = this.beerArray.result;
      for(let i=0;i<this.beerArray.length;i++){
        if(!this.allBreweries.includes(this.beerArray[i].brewery)){
          this.allBreweries.push(this.beerArray[i].brewery);
        }
        this.style = this.beerArray[i].style.split(' - ')[0]
        if(!this.allStyles.includes(this.style)){
          this.allStyles.push(this.style);
        }
      }
    });
  }

  updateSelect(){
    if(this.breweryOption=='All Breweries'){
      this.selectedBrewery = this.beerArray;
    }else{
      this.selectedBrewery = this.beerArray.filter(beer => beer.brewery === this.breweryOption);
    }
  }

  updateNotifications = function() {
    this.newService.getNotifications({email: this.email})  
    .subscribe(data =>  {
      if(data.length>0){
        this.notifications = data[0].notifications;
        if(this.notifications.length>0)
          this.hasData=this.notifications.length;
      }else{
        this.hasData=0;
      }
    } 
    , error => this.errorMessage = error )  
  }

  addNotification =function(){

    //do error checking here
    //also need to check if it already exists - if it does, then dont add it.

    //rest of the code
    console.log(this.beerStyle);
    this.newService.addNotification({email: this.email, brewery: this.breweryOption, style: this.beerStyle})
      .subscribe(data =>  {
        this.updateNotifications();
      });
  }

  deleteNotification = function(brewery,style) {    
    this.newService.deleteNotification({email: this.email,brewery: brewery, style: style})  
    .subscribe(data =>  { 
      this.updateNotifications();
    } 
    , error => this.errorMessage = error )  
  }

}
