import { cartServices } from './../shared/cart.services';

import { orderServices } from './../shared/order.services';
import { Product, Order } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { ProductServices } from 'src/app/shared/product.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../admin/shared/services/alert.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @Input() product: Product[] = [];
  product$: Observable<Product>;
  closeResult = '';
  buyForm: FormGroup;
  id: string;
 itemsArray=[];
  countProduct: any;


  constructor(private route: ActivatedRoute,
    private productServices: ProductServices,
    private modalService: NgbModal,
    private orderService: orderServices,
    private alert: AlertService,
    private cartservice: cartServices) {

    this.product$ = this.route.params
      .pipe(switchMap((params: Params) => {
        let product = this.productServices.getById(params['id']);
        return product;
      }))

  }


  ngOnInit() {
    this.buyForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        count: new FormControl('', [Validators.required])
      })
  }



  submit() {
    const order: Order = {
      name: this.buyForm.value.name,
      surname: this.buyForm.value.surname,
      phone: this.buyForm.value.phone,
      email: this.buyForm.value.email,
      count: this.buyForm.value.count,
      status: 'newOrder',
      cart:false,
    }

    this.orderService.add(order).subscribe(() => {
      this.buyForm.reset();
      this.alert.success('Заказ успешно оформлен. Ожидайте звонка')
      this.modalService.dismissAll();
    })

  }

  cart(product: Product, countProduct:number) {
   

    let cart = {
      'Prod': product.id,
      'Prodname':product.title,
      'count': countProduct
    }
  
    let itemsArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    localStorage.setItem('cart', JSON.stringify(itemsArray))
    const data = JSON.parse(localStorage.getItem('cart'))
    itemsArray.push(cart)
    localStorage.setItem('cart', JSON.stringify(itemsArray))
    this.alert.success('Заказ добавлен в корзину');
  }


  open(content1) {

    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
