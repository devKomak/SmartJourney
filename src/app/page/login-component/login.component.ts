import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Location} from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFireAuth, private afService: AuthService, private location: Location) { }
  user;

  ngOnInit() {
    this.af.authState.subscribe(auth => {
      if (auth) {
        this.location.back();
      } else {


      }
    });
  }

  login() {
    this.afService.loginWithGoogle();


  }


}
