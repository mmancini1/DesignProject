import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../service/auth-guard.service';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit{
  title = 'BEERIFICATION';

  constructor(private router: Router,
              private authService: AuthService,) {}  

   ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}