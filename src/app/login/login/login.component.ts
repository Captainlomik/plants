import { AuthService } from './../../admin/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PathLocationStrategy } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  closeResult = '';
  regForm: FormGroup
  submitted=false;
  loginForm:FormGroup;
  
  constructor(private modalService: NgbModal, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.regForm = new FormGroup(
      {
        name:new FormControl('', Validators.required),
        surname:new FormControl('', Validators.required),
        phone:new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    )

    this.loginForm=new FormGroup(
      {
        email:new FormControl('', [Validators.required, Validators.email]),
        password:new FormControl('', Validators.required)
      }
    )
  }

  submit() {
    console.log(this.regForm);
      this.submitted = true;
  
      this.authService.login(this.regForm.value).subscribe(() => {
       
      })
    
  }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
