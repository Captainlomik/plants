import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaComponent } from './personal-area.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PersonalAreaComponent', () => {
  let component: PersonalAreaComponent;
  let fixture: ComponentFixture<PersonalAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,
        RouterTestingModule ],
      declarations: [ PersonalAreaComponent ],
      schemas:[NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
