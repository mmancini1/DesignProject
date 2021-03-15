import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BeerListService } from '../../service/beerList/beer-list.service';
import { AuthGuardService } from '../../service/auth-guard.service';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit{
  title = 'Beer App';

  constructor(private newService: CommonService,
              private router: Router,
              private beerListService: BeerListService,
              private authService: AuthService,) {}  

   ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}