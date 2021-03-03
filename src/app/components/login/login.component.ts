import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  email: String;
  pass: String;
  submitted = false;

  constructor(private newService: CommonService,
              private route: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            pass: ['', [Validators.required, Validators.minLength(6)]]
        });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){  
    
    this.submitted = true;
    console.log(Validators.email);
            // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    this.newService.login(this.registerForm.value)
      .subscribe(data => {  
        console.log(data);
        if(data){
          if(data){
            this.route.navigate(['/home']);
          }else{
            //throw invalid credentials
          }
        }
      }); 
  }



}
