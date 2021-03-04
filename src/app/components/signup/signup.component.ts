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
  conPass:String;

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