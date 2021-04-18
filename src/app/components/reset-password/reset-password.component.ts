import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';  

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  email: String;
  submitted: boolean = false;

  constructor(private route: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
            this.forgotForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
  }
  get f() { return this.forgotForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.forgotForm.invalid) {
        return;
    }
    //send email
    alert('Check your email for reset instructions.');
    this.route.navigate(['/login']);
  }

}
