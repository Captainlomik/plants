import { orderServices } from './../shared/order.services';
import { Product, Order } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { ProductServices } from 'src/app/shared/product.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Pipe } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../admin/shared/services/alert.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$:Observable<Product>;
  closeResult = '';
  buyForm: FormGroup;
  product: any;
  Product:[]=[]
  
  constructor(private route:ActivatedRoute,
     private productServices:ProductServices,
      private modalService: NgbModal, 
      private orderService: orderServices,
      private alert: AlertService) { }

  ngOnInit() {
    this.product$= this.route.params
    .pipe(switchMap((params:Params)=>{
     return this.productServices.getById(params['id']);
    }))


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

getprod()
{
let prod=this.productServices.getById['id'];
console.log('prod')
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
