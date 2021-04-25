import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerListComponent } from './beer-list.component';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { StarRatingComponent } from 'ng-starrating';
import { RouterTestingModule } from '@angular/router/testing'
import { BeerListService } from '../../service/beerList/beer-list.service';
import { formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('BeerListComponent', () => {
  let component: BeerListComponent;
  let fixture: ComponentFixture<BeerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [BeerListComponent,],
        imports: [FormsModule, HttpClientModule, RouterTestingModule],
        providers: [CommonService, ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
