import { Observable } from 'rxjs';
import { ProductServices } from 'src/app/shared/product.services';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
product$:Observable<Product[]>
  constructor(private productServices:ProductServices) { }

  ngOnInit() {
   this.product$= this.productServices.getAll()
  }

}
