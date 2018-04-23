import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Observable } from '@firebase/util';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  state;
  constructor(private af: AngularFireAuth, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.state = false;
    this.af.authState.subscribe(auth => {
      if (auth) {
        this.state = true;
        console.log(this.state);
      } else {
        this.state = false;
        console.log(this.state);
      }
    });
  }

  signIn() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.auth.logout();
  }

}
