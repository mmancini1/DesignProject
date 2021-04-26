import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';  
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetailsService } from '../../service/user-details/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: string;
  email: string;
  prevEmail: string;
  addr: string;
  city: string;
  state: string;
  zip: string;
  editEnabled: boolean=false;
  user: Observable<string[]>;
  previousUser: Observable<string[]>;
  editForm: FormGroup;

  constructor(private newService: CommonService,
              private route: Router,
              private formBuilder: FormBuilder,
              private userDetails: UserDetailsService,) { }

  ngOnInit(): void {

    this.userDetails.getUserDetails({'email': sessionStorage.getItem('email')}).subscribe(res => {
      this.previousUser=res;
      this.editForm = new FormGroup({
        name: new FormControl({value: res.name, disabled: true}),
        email: new FormControl({value: res.email, disabled: true}),
        addr: new FormControl({value: res.addr, disabled: true}),
        city: new FormControl({value: res.city, disabled: true}),
        state: new FormControl({value: res.state, disabled: true}),
        zip: new FormControl({value: res.zip, disabled: true}),
        prevEmail: new FormControl({value: res.email}),
      });
    })
  }

  get f() { return this.editForm.controls; }

  edit(){
    if(this.editForm.disabled){
      this.editForm.enable();
      this.editEnabled=true;
    }else{
      this.editForm.disable();
    }
  }

  cancel(){
    this.editEnabled=false;
    this.editForm.disable();
  }

  onSave(){
    if(this.editForm.dirty){
      console.log(this.editForm.value);
      this.newService.updateUser(this.editForm.value).subscribe(data =>{
      });
      this.editEnabled=false;
      this.editForm.disable();
    }
  }

}
