import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    userAuth: Observable<firebase.User>;
    userDetails: firebase.User = null;
    token: string;

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

    signUpUser(email: string, password: string) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          message => {
            firebase.auth().currentUser.getIdToken().then(token => this.token = token);
          }
        )
        .catch(
          error => console.log(error)
        );
    }

    signInUser(email: string, password: string) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(message => {
          firebase.auth().currentUser.getIdToken().then(token => this.token = token);
        })
        .catch(error => console.log(error));
    }

    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(provider);
    }

    logout() {
        this.afAuth.auth.signOut();
        this.userAuth = null;
   }

   getUid() {
     return firebase.auth().currentUser.uid;
   }

   getToken() {
    return firebase.auth().currentUser.getIdToken();

   }

}
