import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerListComponent } from './beer-list.component';
import { By } from '@angular/platform-browser';
import { Component, OnInit, DebugElement } from '@angular/core';
import { CommonService } from '../../service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing'
import { BeerListService } from '../../service/beerList/beer-list.service';
import { formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('BeerListComponent', () => {
  let component: BeerListComponent;
  let fixture: ComponentFixture<BeerListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
  // check each dropdown name and functionality
  it('should check the brewery dropdowns', () => {
    de = fixture.debugElement.query(By.css('#leftBTN'));
    el = de.nativeElement;
    expect(el.textContent).toContain('Brewery');

  });

  it('should check the style dropdowns', () => {
    de = fixture.debugElement.query(By.css('#midBTN'));
    el = de.nativeElement;
    expect(el.textContent).toContain('Style');
  });

  it('should check the rating dropdowns', () => {
    de = fixture.debugElement.query(By.css('#rightBTN'));
    el = de.nativeElement;
    expect(el.textContent).toContain('Rating');
  });
  
});
