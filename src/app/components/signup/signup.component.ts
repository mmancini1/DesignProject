import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // vars
  registerForm: FormGroup;
  submitted: boolean = false;
  validLogin = true;
  name: String;
  email: String;
  street: String;
  city: String;
  state: String;
  zip: String;
  pass: String;
  conPass: String;
  states: any=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",	"HI",	"ID",	"IL",	"IN",	"IA",	"KS",	"KY",	"LA",	"ME",	"MD",	"MA",	"MI",	"MN",	"MS",	"MO",	"MT",	"NE",	"NV",	"NH",	"NJ",	"NM",	"NY",	"NC",	"ND",	"OH",	"OK",	"OR",	"PA",	"RI",	"SC",	"SD",	"TN",	"TX",	"UT",	"VT",	"VA",	"WA",	"WV",	"WI",	"WY",];

  constructor(private newService :CommonService,
              private route: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    // register form and validators
    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required,]], 
        conpass: ['', [Validators.required]],
        pass: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  // submit form
  onSave = function() {
    this.submitted = true;
    // if invalid form display errors and dont allow login
    if (this.registerForm.invalid) {
        this.validLogin = false;
        return;
    }
    // attempt to signup
    this.newService.signUp(this.registerForm.value)
      .subscribe(data => {
        if(data.login==true){
          this.authService.signUp().subscribe(redirectUrl => {
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