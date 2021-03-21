import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: String;

  constructor(private route: Router,) { }

  ngOnInit(): void {
  }

  onSubmit(email){
    alert('Check your email for reset instructions.');
    this.route.navigate(['/login']);
  }

}
