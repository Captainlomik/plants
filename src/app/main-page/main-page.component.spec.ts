import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AlertService } from 'src/app/admin/shared/services/alert.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { emailServices } from './../shared/email.services';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';



describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let emailService: emailServices;
  let spy: jasmine.Spy;
  let mockEmail;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,
  ],

      declarations: [MainPageComponent],
      schemas: [ NO_ERRORS_SCHEMA],
      providers: [emailServices, AlertService],

    
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emailService = fixture.debugElement.injector.get(emailServices);
    mockEmail={email:'text@mail.ru'};
    spy = spyOn(emailService, 'add').and.returnValue(of(mockEmail))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call emailService', () => {
    component.submit();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should have email', ()=>{

    expect(component.emailForm.contains('email')).toBeTruthy();
  })

  it ('it should validate email value', ()=>
  {
  const control = component.emailForm.get('email');
  control.setValue('');
  expect(control.valid).toBeFalsy();
  })
  

});



