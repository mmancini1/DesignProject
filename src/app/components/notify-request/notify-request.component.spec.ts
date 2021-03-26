import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotifyRequestComponent } from './notify-request.component';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, FormBuilder} from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { StarRatingComponent } from 'ng-starrating';
import { RouterTestingModule } from '@angular/router/testing'
import { BeerListService } from '../../service/beerList/beer-list.service';
import { formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';

describe('NotifyRequestComponent', () => {
  let component: NotifyRequestComponent;
  let fixture: ComponentFixture<NotifyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyRequestComponent ],
        imports: [FormsModule, HttpClientModule, RouterTestingModule],
        providers: [CommonService, AuthService, FormBuilder ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
