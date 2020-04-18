import { AlertService } from 'src/app/admin/shared/services/alert.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';



describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, 
    HttpClientModule ],
      declarations: [
          LoginComponent,],
          schemas:[NO_ERRORS_SCHEMA],
          providers:[AlertService]
        
    }).compileComponents();
  }));

});