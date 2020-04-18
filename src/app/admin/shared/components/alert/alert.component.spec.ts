import { AlertService } from 'src/app/admin/shared/services/alert.service';
import { AlertComponent } from './alert.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('alertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers:[ AlertService],
      schemas: [ NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
