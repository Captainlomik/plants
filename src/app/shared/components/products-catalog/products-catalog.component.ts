import { orderServices } from './../../order.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, Order } from './../../interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/admin/shared/services/alert.service';
import { ProductServices } from '../../product.services';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {
  @Input() product: Product;
  closeResult = '';
  buyForm: FormGroup;
  alertService: any;
  flagFalse: boolean;
  finalProduct: boolean = false;
  orde$: any;
  orderIdcart=[];
  price:number=0;

  constructor(private modalService: NgbModal,
    private orderService: orderServices,
    private alert: AlertService,
    private productServices: ProductServices, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.endProduct();

    this.buyForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        count: new FormControl('', [Validators.required, Validators.max(this.product.count), Validators.min(1)])
      })

   
  }

  submit() {
    this.price=this.product.price*this.buyForm.value.count;
    this.orderIdcart.push(this.product.id)
    const order: Order = {
      name: this.buyForm.value.name,
      surname: this.buyForm.value.surname,
      phone: this.buyForm.value.phone,
      email: this.buyForm.value.email,
      count: this.buyForm.value.count,
      productId: this.orderIdcart,
      productTitle: this.product.title,
      status: 'Новый заказ',
      stat: false,
      price:this.price,
    }
    this.orderService.add(order).subscribe(() => { 
      this.countProduct()
      this.buyForm.reset();
      this.alert.success('Заказ успешно оформлен. Ожидайте звонка')
      this.modalService.dismissAll();
    })
    
  }

 

  countProduct() {
    this.productServices.update({
      id: this.product.id,
      title: this.product.title,
      text: this.product.text,
      price: this.product.price,
      count: this.product.count - this.buyForm.value.count,
      img: this.product.img
    }).subscribe(() => {
    });
  }

  endProduct() {
    if (this.product.count == 0)
      this.finalProduct = true;
  }

  open(content) {
    console.log(this.product.title)
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


}
