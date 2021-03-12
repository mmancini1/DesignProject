import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';  
import { Router } from '@angular/router';
import { UserDetailsService } from '../../service/user-details/user-details.service';

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
              private formBuilder: FormBuilder,
              private userDetails: UserDetailsService) { }

  ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            // pass: ['', [Validators.required, Validators.minLength(6)]]
            pass: ['', [Validators.required, Validators.minLength(3)]]
        });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
            // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    this.newService.login(this.registerForm.value)
      .subscribe(data => {  
          if(data){
            this.userDetails.populateUser(data);
            this.route.navigate(['/home']);
          }else{
            //throw invalid credentials
            //f.email.errors.required
          }
      }); 
  }



}
