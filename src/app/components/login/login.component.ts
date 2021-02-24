import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  pass: String;


  constructor(private newService :CommonService,) { }

  ngOnInit(): void {
  }

  onSubmit = function(user) {   
    console.log(user.value); 
  //    this.newService.login(user.value)  
  //    .subscribe(data => {  
  //      if(data){
  //        if(data){
  //          console.log('yea boy');
  //        }else{
  //          console.log('nah');
  //        }
  //        //need to redirect to /home
  //      }else{

  //      }
  //    }, error => this.errorMessage = error )  
  //  }
  }
}
