import { TestBed } from '@angular/core/testing';
import { BeerListService } from './beer-list.service';
import { Injectable } from '@angular/core';
import { CommonService } from '../../service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

describe('BeerListService', () => {
  let service: BeerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule,HttpClientModule ],
      providers: [ CommonService, ],
    });
    service = TestBed.inject(BeerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
