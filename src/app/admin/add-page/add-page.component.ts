
import { AlertService } from './../shared/services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';
import { ProductServices } from 'src/app/shared/product.services';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  addForm: FormGroup;

  constructor(
    private productServices: ProductServices,
    private alertService: AlertService,
   ) { }

  ngOnInit() {
    this.addForm = new FormGroup(
      {
        title: new FormControl('', Validators.required),
        text: new FormControl(''),
        price: new FormControl('', Validators.required),
        count: new FormControl('', Validators.required),
        img: new FormControl('')
      }
    )
  }



  submit() {//передача формы с данными по продукту в БД
    const product: Product = {
      title: this.addForm.value.title,
      text: this.addForm.value.text,
      price: this.addForm.value.price,
      count: this.addForm.value.count,
      img: this.addForm.value.img
    }

    this.productServices.create(product).subscribe(() => { //подписка на сервис-оповещение
      this.addForm.reset();
      this.alertService.success('Новый продукт создан');
    })
  }
}
