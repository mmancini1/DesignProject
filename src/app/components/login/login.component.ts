import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';  
import { Router } from '@angular/router';
import { UserDetailsService } from '../../service/user-details/user-details.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  email: string;
  pass: string;
  submitted: boolean = false;
  validLogin: boolean = true;

  constructor(private newService: CommonService,
              private route: Router,
              private formBuilder: FormBuilder,
              private userDetails: UserDetailsService,
              private authService: AuthService) { }

  ngOnInit() {
    // set up form and set validators
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        pass: ['', [Validators.required]]
    });
  }

  get f() { return this.registerForm.controls; }

  // form submitted
  onSubmit(){
    this.submitted = true;
    // if invalid form display errors and dont allow login
    if (this.registerForm.invalid) {
        this.validLogin = false;
        return;
    }
    // attempt login
    this.newService.login(this.registerForm.value).subscribe(data => {
        if(data.login==true){
          this.authService.login().subscribe(redirectUrl => {
            if (this.authService.isLoggedIn) {
              sessionStorage.setItem('email',this.registerForm.value.email);
              this.route.navigate([redirectUrl]);
            }
          });
        }else{
          this.validLogin = false;
        }
    });
  }

}
