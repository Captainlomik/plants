import { Order } from './../../shared/interfaces';
import { orderServices } from './../../shared/order.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orders: Order[] = []
search:string;
  constructor(private orderService: orderServices) { }

  ngOnInit() {
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    })
  }

}
