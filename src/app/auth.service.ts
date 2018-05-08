import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    userAuth: Observable<firebase.User>;
    userDetails: firebase.User = null;

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.userAuth = afAuth.authState;
  this.userAuth.subscribe(
          (user) => {
            if (user) {
              this.userDetails = user;
              console.log(this.userDetails);
            } else {
              this.userDetails = null;
            }
          }
        );
    }

    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(provider);
    }

    logout() {
        this.afAuth.auth.signOut();
        this.userAuth = null;
   }

}
