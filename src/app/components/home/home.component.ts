import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'Beer App';

  constructor(private newService: CommonService,
              private router: Router,
  ) {}  


  changeRoute(route){
    this.router.navigate([{outlets: {subRoute: route}}]);
  };


   ngOnInit() {
      this.router.navigate([{outlets: {subRoute: 'beerlist'}}]);
  }
}