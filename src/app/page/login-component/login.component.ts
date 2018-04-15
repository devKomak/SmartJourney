import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afService: AuthService, private location:Location) { }

  ngOnInit() {
  }

  login(){
    this.afService.loginWithGoogle();
 
    this.location.back();
  

  }


}
