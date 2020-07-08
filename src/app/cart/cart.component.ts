import { AlertService } from './../admin/shared/services/alert.service';
import { orderServices } from './../shared/order.services';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product, Order } from './../shared/interfaces';
import { ProductServices } from './../shared/product.services';
import { cartServices } from './../shared/cart.services';
import { Component, OnInit, Input } from '@angular/core';
import { element } from 'protractor';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() product: Product;
  products = [];
  cartData;
  counter: number;
  buyForm: FormGroup;
  id: string;
  orderEl;
  empty: boolean = false;
  price:number=0;


  constructor(private cartService: cartServices,
    private productService: ProductServices,
    private orderService: orderServices,
    private alert: AlertService) { }

  ngOnInit() {

    this.buyForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
      }
    )

    this.getProductsForCart();
  }

  getProductsForCart() {

    this.cartData = JSON.parse(localStorage.getItem('cart'));
    if (this.cartData.length == 0)
      this.empty = true;
    else {
      this.cartData.forEach(element => {
        this.productService.getById(element.Prod).subscribe(data => {
          data = {
            id: data.id,
            title: data.title,
            text: data.text,
            price: data.price,
            count: element.count,
            img: data.img,
          }
          this.products.push(data);
          //this.counter=this.products.length;
          this.price+=(data.price*element.count);
        })
      });
    }
  }



  delete(product: string) {
    this.cartData = this.cartData.filter(elem => elem.Prod !== product)
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.alert.danger('Товар удален из корзины')
    window.location.reload();
  }


  submit() {
    let cartData = JSON.parse(localStorage.getItem('cart'));

    const order: Order = {
      name: this.buyForm.value.name,
      surname: this.buyForm.value.surname,
      phone: this.buyForm.value.phone,
      email: this.buyForm.value.email,
      productId: cartData,
      status: 'newOrder',
      cart: true,
    }

    this.orderService.add(order).subscribe(() => {
      this.buyForm.reset();
      this.alert.success('Заказ успешно оформлен. Ожидайте звонка')
    })

  }

  
}
