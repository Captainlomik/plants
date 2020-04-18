import { AlertService } from 'src/app/admin/shared/services/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageComponent } from './edit-page.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPageComponent ],
      imports: [FormsModule, 
        ReactiveFormsModule,
         RouterTestingModule,
          HttpClientModule],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[AlertService]
      
     
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
  });

});
