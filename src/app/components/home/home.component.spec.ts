import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CommonService } from '../../service';
import { By } from '@angular/platform-browser';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Component, OnInit, DebugElement } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { RouterTestingModule } from '@angular/router/testing'
import { formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { BeerListService } from '../../service/beerList/beer-list.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [FormsModule, HttpClientModule, RouterTestingModule,MatMenuModule ],
      providers: [CommonService, AuthService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verify nav menu
  it('should check new release', () => {
    de = fixture.debugElement.query(By.css('#newReleases'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Today's Releases");
  });

  it('should check beer list', () => {
    de = fixture.debugElement.query(By.css('#beerList'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Current Selections");
  });

  it('should check notifications', () => {
    de = fixture.debugElement.query(By.css('#notify'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Notifications");
  });

  it('should check settings', () => {
    de = fixture.debugElement.query(By.css('#settings'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Settings");
  });

});
