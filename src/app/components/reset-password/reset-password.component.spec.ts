import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
        imports: [ RouterTestingModule],
        providers: [FormBuilder ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail to reset password', () => {
    component.forgotForm.controls['email'].setValue('');
    expect(component.forgotForm.invalid).toBeTruthy();
  });

  it('should reset password', () => {
    component.forgotForm.controls['email'].setValue('test@test.com');
    expect(component.forgotForm.valid).toBeTruthy();
  });


});
