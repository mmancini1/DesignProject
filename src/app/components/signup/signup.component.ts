import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: String;
  email: String;
  addr: String;
  city: String;
  state: String;
  zip: String;
  pass: String;
  conPass: String;
  States: any=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",	"HI",	"ID",	"IL",	"IN",	"IA",	"KS",	"KY",	"LA",	"ME",	"MD",	"MA",	"MI",	"MN",	"MS",	"MO",	"MT",	"NE",	"NV",	"NH",	"NJ",	"NM",	"NY",	"NC",	"ND",	"OH",	"OK",	"OR",	"PA",	"RI",	"SC",	"SD",	"TN",	"TX",	"UT",	"VT",	"VA",	"WA",	"WV",	"WI",	"WY",];

  constructor(private newService :CommonService,
              private route: Router,) { }

  ngOnInit(): void {
  }

  onSave = function(user) {   
    console.log(user.value);
    //if field in user.value fails dont send
     this.newService.signUp(user.value)  
     .subscribe(data =>  {  alert(data.data);  

     }   
     , error => this.errorMessage = error )  
    this.route.navigate(['/notify']);
   }
}


export interface User {
  name: String;
  email: String;
  addr: String;
  city: String;
  state: String;
  zip: String;
  pass: String;
}