import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Location} from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFireAuth, private afService: AuthService, private location: Location, private router: Router) { }
  user;

  ngOnInit() {
    this.af.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['']);
      } else {


      }
    });
  }

  login() {
    this.afService.loginWithGoogle();
  }

  onSignIn(f: NgForm) {
    this.afService.signInUser(f.value.email, f.value.password);
  }


}
