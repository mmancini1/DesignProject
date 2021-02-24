import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {

  constructor(private newService :CommonService,) { }

  ngOnInit(): void {
    this.onSave();
  }

    onSave = function() {    
     this.newService.getBeer()  
     .subscribe(data =>  {  
       console.log(data);
     }   
     , error => this.errorMessage = error )  
   }

}
