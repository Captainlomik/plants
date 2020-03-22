import { AlertService } from './../shared/services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/interfaces';
import { ProductServices } from 'src/app/shared/product.services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

  editForm: FormGroup;
  prod: Product;
  submitted: false;

  uSub: Subscription;

  constructor(private route: ActivatedRoute, private productServices: ProductServices, private router: Router, private alert:AlertService) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.productServices.getById(params['id']);
      })).subscribe((product: Product) => {
        this.prod = product;
        this.editForm = new FormGroup(
          {
            title: new FormControl(product.title, Validators.required),
            text: new FormControl(product.text),
            price: new FormControl(product.price, Validators.required),
            count: new FormControl(product.count, Validators.required),
            img: new FormControl(product.img)
          }
        )
      })
  }
  ngOnDestroy() {
    if (this.uSub)
      this.uSub.unsubscribe();
  }
  submit() {
    this.uSub = this.productServices.update({
      id: this.prod.id,
      title: this.editForm.value.title,
      text: this.editForm.value.text,
      price: this.editForm.value.price,
      count: this.editForm.value.count,
      img: this.editForm.value.img
    }).subscribe(() => {
      this.submitted = false;
      this.alert.warning('Продукт изменен');
      this.router.navigate(['/admin', 'dashboard']);
      
    })
  }


}
