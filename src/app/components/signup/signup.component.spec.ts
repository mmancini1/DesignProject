import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { CommonService } from '../../service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';  
import { UserDetailsService } from '../../service/user-details/user-details.service';
import { AuthService } from '../../service/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [HttpClientModule, RouterTestingModule,],
      providers: [CommonService, AuthService,FormBuilder],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail sign up', () => {
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['street'].setValue('');
    component.registerForm.controls['city'].setValue('');
    component.registerForm.controls['state'].setValue('');
    component.registerForm.controls['zip'].setValue('');
    component.onSave();
    expect(component.registerForm.invalid).toBeTruthy();
  });

  it('should sign up', () => {
    component.registerForm.controls['email'].setValue('newEmail@email.com');
    component.registerForm.controls['name'].setValue('tester');
    component.registerForm.controls['street'].setValue('123 fake st');
    component.registerForm.controls['city'].setValue('warwick');
    // const select: HTMLSelectElement = fixture.debugElement.query(By.css('#state')).nativeElement;
    // select.value = select.options[3].value; 
    component.registerForm.controls['zip'].setValue('02888');
    // component.onSave();
    expect(component.registerForm.valid).toBeFalsy(); //change to truth for valid login
  });
});
