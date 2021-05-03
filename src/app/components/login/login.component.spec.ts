import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CommonService } from '../../service';
import { FormBuilder } from '@angular/forms';
import { UserDetailsService } from '../../service/user-details/user-details.service';
import { AuthGuardService } from '../../service/auth-guard.service';
import { AuthService } from '../../service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientModule, RouterTestingModule,],
      providers: [CommonService, AuthService,FormBuilder],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get invalid login', () => {
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['email'].setValue('');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.registerForm.invalid).toBeTruthy();

  });

  it('should get login', () => {
    component.registerForm.controls['email'].setValue('footballmaniac0788@yahoo.com');
    component.registerForm.controls['email'].setValue('test');
    component.onSubmit()
    fixture.detectChanges();
    expect(component.registerForm).toBeTruthy();
  });

  it('should check forgot login', () => {
    de = fixture.debugElement.query(By.css('#forgotPass'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Forgot Password?");
  });

  it('should check signup', () => {
    de = fixture.debugElement.query(By.css('#signup'));
    el = de.nativeElement;
    expect(el.textContent).toContain("Sign Up");
  });

});
