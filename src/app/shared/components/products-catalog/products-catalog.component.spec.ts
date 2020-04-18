import { AlertService } from 'src/app/admin/shared/services/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCatalogComponent } from './products-catalog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Content } from '@angular/compiler/src/render3/r3_ast';

describe('ProductsCatalogComponent', () => {
  let component: ProductsCatalogComponent;
  let fixture: ComponentFixture<ProductsCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[ AlertService],
      declarations: [ ProductsCatalogComponent],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[RouterTestingModule, HttpClientModule],
     
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  
});
