import { Product } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { ProductServices } from 'src/app/shared/product.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  search = '';
  flag = true;
  products$: Observable<Product[]>;
  productEl: Product[] = []
  
  constructor(private productServices: ProductServices) { }

  ngOnInit() {
    this.fetchProduct(this.flag)
  }

  fetchProduct(flag: boolean) {
   this.productServices.getAll().subscribe(product => {
     this.productEl = this.sort1(product, flag);
      })
     
  }

  sort1(product, flag: boolean) {
    product.sort(function (a, b) {
      if (flag === true) {
        return a.price - b.price;
      }
      else if (flag === false)
        return b.price - a.price;
    });
    return product;
  }

}
