import { AlertService } from './../shared/services/alert.service';
import { Order } from './../../shared/interfaces';
import { orderServices } from './../../shared/order.services';
import { Component, OnInit } from '@angular/core';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  orders: Order[] = []
  search: string;
  borderColor: boolean = true;
  flag: boolean = true;

  constructor(private orderService: orderServices,
    private alert: AlertService) { }

  ngOnInit() {
    /*this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    })*/
    this.sortOrder(this.flag)
  }

  sortOrder(flag: boolean) {
    this.orderService.getAll().subscribe(order => {
      this.orders = this.sortStatus(order, flag);
    })
  }

  sortStatus(order, flag: boolean) {
    order.sort(function (a, b) {
      if (flag == true)
        return a.stat - b.stat;
      else
        return b.stat - a.stat;
    })
    return order;
  }

  delete(id: string) {
    this.orderService.del(id).subscribe(() => {
      this.ngOnInit();
      this.alert.danger("Заказ завершен и удален")
    })
  }

  accept(order: Order) {
    order.stat = !order.stat;
    this.orderService.change({
      id: order.id,
      name: order.name,
      surname: order.surname,
      email: order.email,
      phone: order.phone,
      count: order.count,
      productId: order.productId,
      productTitle: order.productTitle,
      status: "В разработке",
      stat: true,
    }).subscribe(() => {
      this.ngOnInit();
      this.alert.success('Статус заказа изменен')
    })

  }

}
