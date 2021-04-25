import { TestBed } from '@angular/core/testing';
import { UserDetailsService } from './user-details.service';
import { Injectable } from '@angular/core';
import { CommonService } from '../../service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

describe('UserDetailsService', () => {
  let service: UserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule,HttpClientModule ],
      providers: [ CommonService, ],
    });
    service = TestBed.inject(UserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
