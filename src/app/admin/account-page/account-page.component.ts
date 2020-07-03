import { Email } from './../../shared/interfaces';
import { emailServices } from './../../shared/email.services';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private emailservice: emailServices) { }
  email: Email[] = []

  ngOnInit() {
    this.emailservice.getAll().subscribe(email => {
      this.email = email;
    })
    
  }

}
