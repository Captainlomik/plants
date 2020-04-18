import { AlertService } from './../admin/shared/services/alert.service';
import { Email } from './../shared/interfaces';
import { emailServices } from './../shared/email.services';
import { FormGroup, FormControl, Validators, FormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductServices } from 'src/app/shared/product.services';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  product$: Observable<Product[]>

  constructor(private productServices: ProductServices, private emailService: emailServices, private alert: AlertService) { }

  emailForm: FormGroup;

  ngOnInit() {
    this.product$ = this.productServices.getAll();

    this.emailForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required])
      }
    )

  }

  submit() {
    const email: Email = {
      email: this.emailForm.value.email
    }
    this.emailService.add(email).subscribe(() => {
      this.emailForm.reset();
      console.log('add');
      this.alert.success('Вы подписались на рассылку');
    })
  }
}
