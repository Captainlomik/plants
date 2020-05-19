import { ProductServices } from './../../product.services';
import { Router } from '@angular/router';

import { orderServices } from './../../order.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, Order } from './../../interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/admin/shared/services/alert.service';


@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {
  @Input() product: Product;
  closeResult = '';
  buyForm: FormGroup;
  alertService: any;
  countProduct:number;
  maxCount=false;
  countMax:number;

  constructor(private modalService: NgbModal,
    private orderService: orderServices,
    private alert: AlertService,
    private productservices: ProductServices) { }

  ngOnInit() {
    this.buyForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        count: new FormControl('', Validators.required)
      }
    )

  }

  submit() {
    
    const order: Order = {
      name: this.buyForm.value.name,
      surname: this.buyForm.value.surname,
      phone: this.buyForm.value.phone,
      email: this.buyForm.value.email,
      count: this.buyForm.value.count,
      productId: this.product.id,
      productTitle: this.product.title,
      status: 'newOrder'
    }
  
    this.orderService.add(order).subscribe(() => {
      this.buyForm.reset();
      this.alert.success('Заказ успешно оформлен. Ожидайте звонка')
      this.modalService.dismissAll();
    })
  }


  open(content) {
this.getCountProduct(this.product)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
getCountProduct(prod:Product)
{
 if(this.countMax<prod.count)
 {
 this.maxCount=true;
 }
 else
 this.maxCount=false;
 console.log("MaxCount"+this.maxCount)
 console.log(this.countMax);
}

}
