import { ProductsCatalogComponent } from './../shared/components/products-catalog/products-catalog.component';
import { Observable } from 'rxjs';
import { ProductServices } from 'src/app/shared/product.services';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  search= '';
products$:Observable<Product[]>;

  constructor(private productServices:ProductServices) { }

  ngOnInit() {
   this.products$= this.productServices.getAll();
  }

}
