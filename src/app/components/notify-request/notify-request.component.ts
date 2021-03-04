import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule, FormArray, FormBuilder } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { UserDetailsService } from '../../service/user-details/user-details.service';

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
  beerStyle: string;
  beerStyles: any = [];
  notifications: any =[];

  constructor(private newService :CommonService,
              private fb: FormBuilder,
              private userDetails: UserDetailsService) { }

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
    this.newService.notify({email: this.userDetails.email})  
    .subscribe(data =>  {  
      this.notifications = data[0].notifications;
    } 
    , error => this.errorMessage = error )  
  }

  addNotification =function(){

    //do error checking here


    //also need to check if it already exists - if it does, then dont add it.


    //rest of the code
    this.newService.addNotification({email: this.userDetails.email,brewery: this.breweryOption,style: this.beerStyle})
      .subscribe(data =>  {  
        this.updateNotifications();
      });
  }

    deleteNotification = function(brewery,style) {    
    this.newService.deleteNotification({email: this.userDetails.email,brewery: brewery, style: style})  
    .subscribe(data =>  { 
      this.updateNotifications();
    } 
    , error => this.errorMessage = error )  
  }

}
