import { AuthService } from './../../admin/shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthUserService } from './../../shared/authUser.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {

  constructor(private authUser:AuthUserService, private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }
  
  logout(event)
  {
  event.preventDefault();
  this.auth.logout();
  this.router.navigate(['loginUser']);
  }
}
