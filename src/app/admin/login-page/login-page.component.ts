import { Admin } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  adminForm: FormGroup;
  submitted: boolean = false;
  message: string;


  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста введите данные';
      }
      else if (params['authFailed']) {
        this.message = 'Сессия истекла введите данный заново'
      }
    })

    this.adminForm = new FormGroup(
      {
        "email": new FormControl("", [Validators.required, Validators.email]),
        "password": new FormControl("", [Validators.required, Validators.minLength(6)]),
      })
  }

  submit() {
    console.log(this.adminForm);
    this.submitted = true;

    const admin: Admin =
    {
      email: this.adminForm.value.email,
      password: this.adminForm.value.password
    }

    this.authService.login(admin).subscribe(() => {
      this.adminForm.reset(),
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false;
    })
  }
}
