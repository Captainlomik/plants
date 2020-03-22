import { AlertService } from './../shared/services/alert.service';
import { Product } from './../../shared/interfaces';
import { ProductServices } from 'src/app/shared/product.services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  pSub: Subscription;
  dSub: Subscription;
  search = '';

  constructor(private productServices: ProductServices, private alert:AlertService) { }


  ngOnInit() {
    this.productServices.getAll().subscribe(products => {
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.productServices.remove(id).subscribe(() => {
      this.ngOnInit();
      this.alert.danger('Продукт был удален');
    })
  }
}
