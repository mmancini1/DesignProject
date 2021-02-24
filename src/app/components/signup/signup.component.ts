import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  

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
  conPass:String;

  constructor(private newService :CommonService,) { }

  ngOnInit(): void {
  }

  onSave = function(user) {   
    console.log(user.Validators);
    //  this.newService.signUp(user.value)  
    //  .subscribe(data =>  {  alert(data.data);  
    //    this.ngOnInit();    
    //  }   
    //  , error => this.errorMessage = error )  
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