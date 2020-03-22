import { Observable } from 'rxjs';
import { ProductServices } from 'src/app/shared/product.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Pipe } from '@angular/core';
import { Product } from '../shared/interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product$:Observable<Product>;
  constructor(private route:ActivatedRoute, private productServices:ProductServices) { }

  ngOnInit() {
    this.product$= this.route.params
    .pipe(switchMap((params:Params)=>{
      return this.productServices.getById(params['id']);
    }))
  }

}
