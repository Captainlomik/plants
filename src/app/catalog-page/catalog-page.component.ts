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
  flag: boolean = true;
  type: number = 0;
  products$: Observable<Product[]>;
  productEl: Product[] = []

  constructor(private productServices: ProductServices) { }

  ngOnInit() {
    this.fetchProduct(this.flag, this.type)
  }

  fetchProduct(flag: boolean, type: number) {
    this.productServices.getAll().subscribe(product => {
      console.log(product);
      this.productEl = this.sort1(product, flag, type);
    })

  }

  sort1(product, flag: boolean, type: number) {
    product.sort(function (a, b) {
      if (flag === true && type === 1) {
        return a.price - b.price;
      }
      else if (flag === false && type === 1)
        return b.price - a.price;
      else if (flag === true && type === 2)
        return a.count - b.count
      else  (flag === false && type === 2)
        return b.count - a.count;
    });
    return product;
  }

}
