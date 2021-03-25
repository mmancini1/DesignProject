import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  name: String;
  email: String;
  addr: String;
  city: String;
  state: String;
  zip: String;
  pass: String;
  conPass: String;
  states: any=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",	"HI",	"ID",	"IL",	"IN",	"IA",	"KS",	"KY",	"LA",	"ME",	"MD",	"MA",	"MI",	"MN",	"MS",	"MO",	"MT",	"NE",	"NV",	"NH",	"NJ",	"NM",	"NY",	"NC",	"ND",	"OH",	"OK",	"OR",	"PA",	"RI",	"SC",	"SD",	"TN",	"TX",	"UT",	"VT",	"VA",	"WA",	"WV",	"WI",	"WY",];

  constructor(private newService :CommonService,
              private route: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required]],
        addr: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        //need to validate this
        zip: ['', [Validators.required,Validators.pattern('/[0-9]{5}/')]],
        conpass: ['', [Validators.required]],
        pass: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSave = function() {  
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    } 
    console.log(this.registerForm.value);
    //if field in user.value fails dont send
     this.newService.signUp(this.registerForm.value)  
     .subscribe(data =>  {  alert(data.data);

     }   
     , error => this.errorMessage = error )  
    this.route.navigate(['/notify']);
   }
}