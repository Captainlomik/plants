import { cartServices } from './../shared/cart.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
product=[];
cartData;

  constructor(private cartService:cartServices) { }

  ngOnInit() {
    /*this.cartService.getAll().subscribe(product=>
      {
        this.product=product;
      });
  }*/

this.cartData=localStorage.getItem('cart') || [];

  }
}
