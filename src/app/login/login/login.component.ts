import { AuthService } from './../../admin/shared/services/auth.service';
import { AlertService } from './../../admin/shared/services/alert.service';
import { User } from './../../shared/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthUserService } from 'src/app/shared/authUser.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  closeResult = '';
  regForm: FormGroup
  loginForm: FormGroup;
  submitted: boolean = false;
  message: string;

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    public authUserService: AuthUserService, private router: Router,
    private alert: AlertService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста введите данные';
      }
      else if (params['authFailed']) {
        this.message = 'Сессия истекла введите данный заново'
      }
    })



    this.regForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    )

    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      }
    )
  }



  submit() {
    console.log(this.regForm);
    this.submitted = true;
    const regUser: User = {
      name: this.regForm.value.name,
      surname: this.regForm.value.surname,
      phone: this.regForm.value.phone,
      email: this.regForm.value.email,
      password: this.regForm.value.password,
    }
    this.auth.registration(regUser).subscribe(() => {
      console.log('yes')
      this.modalService.dismissAll();
    })

  }


  submitLog() {
    this.submitted = true;
    const logUser: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.auth.login(logUser).subscribe(() => {
      this.loginForm.reset();
      this.submitted = false;
      this.router.navigate(['personalArea'])
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

}
