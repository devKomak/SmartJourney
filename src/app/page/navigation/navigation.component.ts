import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Observable } from '@firebase/util';
import * as firebase from 'firebase/app'
import {AngularFireAuth} from 'angularfire2/auth'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  user;
  constructor(private router: Router,private auth: AuthService) { }

  ngOnInit() {
      this.user = this.auth.user;
  }

  signIn(){
    this.router.navigate(['login']);
    this.user = this.auth.user;
  }

  logOut(){
    this.auth.logout();
    this.user = this.auth.user;
  }

}
