import { Product } from './../../interfaces';
import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {
@Input() product: Product;

  constructor() { }
  
  ngOnInit() {
    
  }

}
